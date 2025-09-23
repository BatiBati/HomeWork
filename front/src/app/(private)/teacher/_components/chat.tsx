"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/provider/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "../../../../../axios";

type MessageType = {
  _id: string;
  sender: { _id: string; firstName: string; lastName: string; role: string };
  receiver: { _id: string; firstName: string; lastName: string; role: string };
  content: string;
  createdAt: string;
};

type ParentType = {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
};

export const TeacherChat = () => {
  const { user } = useAuth(); // teacher info
  const [parents, setParents] = useState<ParentType[]>([]);
  const [selectedParent, setSelectedParent] = useState<ParentType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch parents
  const fetchParents = async () => {
    try {
      const res = await api.get<{ parents: ParentType[] }>("/message/parents", {
        params: { teacherId: user?._id },
      });
      // Remove duplicates
      const unique = Array.from(
        new Map(res.data.parents.map((p) => [p._id, p])).values()
      );
      setParents(unique);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch messages
  const fetchMessages = async (parentId: string) => {
    if (!user?._id || !parentId) return;
    try {
      const res = await api.get<{ messages: MessageType[] }>("/message", {
        params: { user1Id: user._id, user2Id: parentId },
      });
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Polling
  useEffect(() => {
    if (!selectedParent) return;
    fetchMessages(selectedParent._id);
    const interval = setInterval(() => fetchMessages(selectedParent._id), 5000);
    return () => clearInterval(interval);
  }, [selectedParent]);

  // Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message (no temp)
  const handleSend = async () => {
    if (!user || !newMessage.trim() || !selectedParent) return;

    try {
      setLoading(true);
      await api.post("/message/send", {
        senderId: user._id,
        receiverId: selectedParent._id,
        content: newMessage,
      });
      setNewMessage("");
      fetchMessages(selectedParent._id); // ✅ just refetch after sending
    } catch (err) {
      console.error("Error sending message", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParents();
  }, [user?._id]);

  if (!user)
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="flex gap-4 h-150">
      {/* Parent list */}
      <div className="w-[150px] border rounded p-2 overflow-y-hidden">
        <h2 className="font-bold mb-2">Parents</h2>
        {parents.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          parents.map((parent) => (
            <button
              key={parent._id}
              className={`w-full text-left p-2 rounded mb-1 ${
                selectedParent?._id === parent._id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedParent(parent)}
            >
              {parent.firstName} {parent.lastName}
            </button>
          ))
        )}
      </div>

      {/* Chat window */}
      <div className="flex-1 border rounded flex flex-col">
        {selectedParent ? (
          <>
            <div className="border-b p-2 font-semibold">
              Chat with {selectedParent.firstName} {selectedParent.lastName}
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto space-y-2 p-3">
              {messages.length === 0 ? (
                <p className="text-gray-400 text-sm text-center mt-4">
                  No messages yet.
                </p>
              ) : (
                messages.map((msg) => {
                  const isTeacher = msg.sender._id === user._id;
                  return (
                    <div
                      key={msg._id}
                      className={`flex w-full ${
                        isTeacher ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-3 rounded-lg max-w-[70%] break-words ${
                          isTeacher
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        <h1 className="font-semibold text-sm mb-1">
                          {isTeacher ? "You" : msg.sender.firstName}
                        </h1>
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-[10px] text-right mt-1 opacity-70">
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-2 border-t flex gap-2 items-center">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={loading}>
                Send
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a parent to start chatting
          </div>
        )}
      </div>
    </div>
  );
};
