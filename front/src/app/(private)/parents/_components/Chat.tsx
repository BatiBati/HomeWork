"use client";
import React, { useEffect, useState } from "react";
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
  const teacherId = user?.children?.[0]?.teacher;

  useEffect(() => {
    if (!user?._id || !teacherId) return;

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

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, [user?._id, teacherId]);

  // Send message
  const handleSend = async () => {
    if (!newMessage.trim() || !user?._id) return;
    try {
      setLoading(true);
      const res = await api.post("/message/send", {
        senderId: user._id,
        receiverId: teacherId,
        content: newMessage,
      });
      setMessages((prev) => [...prev, res.data.newMessage]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl h-full w-[400px] border p-4 flex flex-col">
      <div className="flex-1  flex-col overflow-y-auto space-y-2">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-2 rounded-lg max-w-[70%] felx flex-col ${
                msg.sender._id === user?._id
                  ? "bg-blue-200 self-end  "
                  : "bg-gray-200 self-start"
              }`}
            >
              <h1 className="font-bold text-xl">{msg.sender.firstName}:</h1>
              <p className="text-sm">{msg.content}</p>
              <p className="text-[10px] text-gray-500 text-right">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Input box */}
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
    </div>
  );
};
