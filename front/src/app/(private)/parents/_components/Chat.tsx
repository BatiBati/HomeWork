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
  const { user } = useAuth();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const teacherId = user?.children?.[0]?.teacher;

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

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [user?._id, teacherId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

    setNewMessage("");

    try {
      setLoading(true);
      const res = await api.post("/message/send", {
        senderId: user._id,
        receiverId: teacherId,
        content: tempMessage.content,
      });

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
    <div className="flex flex-col h-full w-full rounded-xl p-2 sm:p-4">
      {/* Messages area */}
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
                  className={`p-2 sm:p-3 rounded-lg break-words max-w-[75%] sm:max-w-[70%] md:max-w-[60%] ${
                    isParent
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                  }`}
                >
                  <h1 className="font-semibold text-sm sm:text-base mb-1">
                    {isParent ? "You" : msg.sender.firstName}
                  </h1>
                  <p className="text-sm sm:text-base">{msg.content}</p>
                  <p className="text-[10px] sm:text-xs text-right mt-1 opacity-70">
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

      {/* Input area */}
      <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button
          onClick={handleSend}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          Send
        </Button>
      </div>
    </div>
  );
};
