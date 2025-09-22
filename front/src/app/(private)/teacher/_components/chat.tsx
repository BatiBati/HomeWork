"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/provider/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "../../../../../axios";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

  if (!user) return <div>Loading...</div>;

  // Fetch list of parents who have messaged the teacher
  const fetchParents = async () => {
    try {
      const res = await api.get<{ parents: ParentType[] }>("/message/parents", {
        params: { teacherId: user._id },
      });
      setParents(res.data.parents);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchParents();
  }, [user._id]);

  // Fetch messages with selected parent
  const fetchMessages = async (parentId: string) => {
    try {
      const res = await api.get<{ messages: MessageType[] }>("/message", {
        params: { user1Id: user._id, user2Id: parentId },
      });
      setMessages(res.data.messages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedParent) fetchMessages(selectedParent._id);
  }, [selectedParent]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedParent) return;

    const tempMessage: MessageType = {
      _id: `temp-${Date.now()}`,
      sender: { ...user },
      receiver: selectedParent,
      content: newMessage,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");

    try {
      setLoading(true);
      const res = await api.post("/message/send", {
        senderId: user._id,
        receiverId: selectedParent._id,
        content: tempMessage.content,
      });

      setMessages((prev) =>
        prev.map((m) => (m._id === tempMessage._id ? res.data.newMessage : m))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      {/* Parent list */}
      <div className="w-[200px] border rounded p-2">
        <h2 className="font-bold mb-2">Parents</h2>
        {parents.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          parents.map((parent) => (
            <Dialog key={parent._id}>
              <DialogTrigger asChild>
                <button
                  className="w-full text-left p-2 hover:bg-gray-100 rounded"
                  onClick={() => setSelectedParent(parent)}
                >
                  {parent.firstName} {parent.lastName}
                </button>
              </DialogTrigger>
              <DialogContent className="w-[500px] h-[500px] flex flex-col">
                <DialogHeader>
                  <DialogTitle>
                    Chat with {selectedParent?.firstName}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex-1 flex flex-col overflow-y-auto space-y-2 p-2">
                  {messages.length === 0 && <p>No messages yet.</p>}
                  {messages.map((msg) => {
                    const isTeacher = msg.sender._id === user._id;
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
                          }`}
                        >
                          <h1 className="font-bold text-sm">
                            {msg.sender.firstName}:
                          </h1>
                          <p>{msg.content}</p>
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

                {/* Input */}
                <div className="flex gap-2 mt-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                  />
                  <Button onClick={handleSend} disabled={loading}>
                    Send
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ))
        )}
      </div>
    </div>
  );
};
