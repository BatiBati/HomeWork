"use client";
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useAuth } from "@/provider/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "../../../../../axios";

type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
};
type MessageType = {
  _id: string;
  sender: UserType;
  receiver: UserType;
  content: string;
  createdAt: string;
  pending?: boolean;
};

export const TeacherChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ---------------------------
  // Fetch messages
  // ---------------------------
  const fetchMessages = useCallback(async () => {
    if (!user) return;
    try {
      const res = await api.get<{ messages: MessageType[] }>("/message", {
        params: { teacherId: user._id },
      });
      setMessages(res.data.messages);
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  // ---------------------------
  // Get unique parents
  // ---------------------------
  const parents = useMemo(() => {
    const map = new Map<string, UserType>();
    messages.forEach((m) => {
      const parent = m.sender._id !== user?._id ? m.sender : m.receiver;
      if (parent.role === "parents") map.set(parent._id, parent);
    });
    return Array.from(map.values());
  }, [messages, user?._id]);

  // ---------------------------
  // Current messages for selected parent
  // ---------------------------
  const currentMessages = useMemo(() => {
    if (!selectedParentId) return [];
    return messages.filter(
      (m) =>
        (m.sender._id === user?._id && m.receiver._id === selectedParentId) ||
        (m.sender._id === selectedParentId && m.receiver._id === user?._id)
    );
  }, [messages, selectedParentId, user?._id]);

  // ---------------------------
  // Scroll to bottom
  // ---------------------------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  // ---------------------------
  // Send message
  // ---------------------------
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedParentId || !user) return;

    const tempMessage: MessageType = {
      _id: `temp-${Date.now()}`,
      sender: user,
      receiver: {
        _id: selectedParentId,
        firstName: "",
        lastName: "",
        role: "parents",
      },
      content: newMessage,
      createdAt: new Date().toISOString(),
      pending: true,
    };

    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");

    try {
      setLoading(true);
      const res = await api.post("/message/send", {
        senderId: user._id,
        receiverId: selectedParentId,
        content: tempMessage.content,
      });
      setMessages((prev) =>
        prev.map((m) => (m._id === tempMessage._id ? res.data.newMessage : m))
      );
    } catch (err) {
      console.error("Error sending message", err);
      setMessages((prev) => prev.filter((m) => m._id !== tempMessage._id));
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // Render
  // ---------------------------
  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex h-full w-full gap-4">
      {/* Parent list */}
      <div className="w-[150px] border p-2 flex flex-col gap-2">
        <h2 className="font-bold text-sm mb-2">Parents</h2>
        {parents.map((p) => (
          <button
            key={p._id}
            className={`p-2 rounded-lg text-left ${
              selectedParentId === p._id ? "bg-blue-200" : "bg-gray-100"
            }`}
            onClick={() => setSelectedParentId(p._id)}
          >
            {p.firstName} {p.lastName}
          </button>
        ))}
      </div>

      {/* Chat window */}
      <div className="flex-1 rounded-xl border p-4 flex flex-col">
        {selectedParentId ? (
          <>
            <div className="flex-1 flex flex-col overflow-y-auto space-y-2">
              {currentMessages.length === 0 && (
                <p className="text-gray-500 text-sm">No messages yet.</p>
              )}
              {currentMessages.map((msg) => {
                const isTeacher = msg.sender._id === user._id || msg.pending;
                return (
                  <div
                    key={msg._id}
                    className={`flex w-full ${
                      isTeacher ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg max-w-[70%] ${
                        isTeacher
                          ? "bg-green-200 text-right"
                          : "bg-gray-200 text-left"
                      } ${msg.pending ? "opacity-70 italic" : ""}`}
                    >
                      <h1 className="font-bold text-sm">
                        {msg.sender.firstName}:
                      </h1>
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-[10px] text-gray-500">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="mt-3 flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <Button onClick={handleSend} disabled={loading}>
                Send
              </Button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Select a parent to start chatting</p>
        )}
      </div>
    </div>
  );
};
