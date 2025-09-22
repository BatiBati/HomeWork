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

export const ParentChat = () => {
  const { user } = useAuth(); // parent info
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const teacherId = user?.children?.[0]?.teacher;

  // Fetch messages
  const fetchMessages = async () => {
    if (!user?._id || !teacherId) return;
    try {
      const res = await api.get<{ messages: MessageType[] }>("/message", {
        params: { user1Id: user._id, user2Id: teacherId },
      });
      setMessages(res.data.messages);
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  // Initial fetch + polling
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [user?._id, teacherId]);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = async () => {
    if (!newMessage.trim() || !user?._id || !teacherId) return;

    const tempMessage: MessageType = {
      _id: `temp-${Date.now()}`,
      sender: user,
      receiver: {
        _id: teacherId,
        firstName: "",
        lastName: "",
        role: "teacher",
      },
      content: newMessage,
      createdAt: new Date().toISOString(),
    };

    // Optimistic update
    setNewMessage("");

    try {
      setLoading(true);
      const res = await api.post("/message/send", {
        senderId: user._id,
        receiverId: teacherId,
        content: tempMessage.content,
      });

      // Replace temp message with server message
      setMessages((prev) =>
        prev.map((m) => (m._id === tempMessage._id ? res.data.newMessage : m))
      );
      fetchMessages();
    } catch (err) {
      console.error("Error sending message", err);
      setMessages((prev) => prev.filter((m) => m._id !== tempMessage._id));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl h-full w-[400px] border p-4 flex flex-col bg-white shadow-md">
      <div className="flex-1 flex flex-col overflow-y-auto space-y-2 px-2 py-1">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-sm text-center mt-4">
            No messages yet
          </p>
        ) : (
          messages.map((msg) => {
            const isParent = String(msg.sender._id) === String(user?._id);
            return (
              <div
                key={msg._id}
                className={`flex w-full ${
                  isParent ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[70%] break-words ${
                    isParent
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <h1 className="font-semibold text-sm mb-1">
                    {isParent ? "You" : msg.sender.firstName}
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

      {/* Input box */}
      <div className="mt-3 flex gap-2 items-center">
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
    </div>
  );
};
