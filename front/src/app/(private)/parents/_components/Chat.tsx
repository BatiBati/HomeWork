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
  pending?: boolean;
};

export const ParentChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!user) return <div>Loading chat...</div>; // wait for user

  const teacherId = user.children?.[0]?.teacher;
  if (!teacherId) return <div>No teacher assigned</div>;

  // Fetch messages
  const fetchMessages = async () => {
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
  }, [user._id, teacherId]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = async () => {
    if (!newMessage.trim()) return;

    // Create temp message aligned to right
    const tempMessage: MessageType = {
      _id: `temp-${Date.now()}`,
      sender: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      receiver: {
        _id: teacherId,
        firstName: "",
        lastName: "",
        role: "teacher",
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
        receiverId: teacherId,
        content: tempMessage.content,
      });

      // Replace temp message with server message
      setMessages((prev) =>
        prev.map((m) => (m._id === tempMessage._id ? res.data.newMessage : m))
      );
    } catch (err) {
      console.error("Error sending message", err);
      // Remove the temp message if sending failed
      setMessages((prev) => prev.filter((m) => m._id !== tempMessage._id));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl h-full w-[400px] border p-4 flex flex-col">
      <div className="flex-1 flex flex-col overflow-y-auto space-y-2">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm">No messages yet.</p>
        )}
        {messages.map((msg) => {
          // Simplified condition - just check if sender is current user
          const isParent = msg.sender._id === user._id;
          return (
            <div
              key={msg._id}
              className={`flex w-full ${
                isParent ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg max-w-[70%] ${
                  isParent ? "bg-blue-200 text-right" : "bg-gray-200 text-left"
                } ${msg.pending ? "opacity-70 italic" : ""}`}
              >
                <h1 className="font-bold text-sm">{msg.sender.firstName}:</h1>
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
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />
        <Button onClick={handleSend} disabled={loading}>
          Send
        </Button>
      </div>
    </div>
  );
};
