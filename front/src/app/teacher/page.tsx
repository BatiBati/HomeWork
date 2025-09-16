"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function TeacherDashboard() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<{
    name: string;
    status: string;
    assignment: string;
  } | null>(null);

  const assignments = [
    {
      title: "Math Worksheet Chapter 5",
      subject: "Mathematics",
      due: "1/15/2024",
      completion: 72,
      completed: "18/25",
      students: [
        { name: "Alice", status: "✅ Submitted" },
        { name: "Bob", status: "❌ Not Submitted" },
        { name: "Charlie", status: "✅ Submitted" },

        { name: "Alice", status: "✅ Submitted" },
        { name: "Bob", status: "❌ Not Submitted" },
        { name: "Charlie", status: "✅ Submitted" },
        { name: "Alice", status: "✅ Submitted" },
        { name: "Bob", status: "❌ Not Submitted" },
        { name: "Charlie", status: "✅ Submitted" },
        { name: "Alice", status: "✅ Submitted" },
        { name: "Bob", status: "❌ Not Submitted" },
        { name: "Charlie", status: "✅ Submitted" },
      ],
    },
    {
      title: "Science Lab Report",
      subject: "Science",
      due: "1/18/2024",
      completion: 48,
      completed: "12/25",
      students: [
        { name: "Alice", status: "✅ Submitted" },
        { name: "Bob", status: "❌ Not Submitted" },
        { name: "Charlie", status: "✅ Submitted" },

        { name: "Alice", status: "✅ Submitted" },
        { name: "Bob", status: "❌ Not Submitted" },
        { name: "Charlie", status: "✅ Submitted" },
        { name: "Alice", status: "✅ Submitted" },
        { name: "Bob", status: "❌ Not Submitted" },
        { name: "Charlie", status: "✅ Submitted" },
        { name: "Alice", status: "✅ Submitted" },
        { name: "Bob", status: "❌ Not Submitted" },
        { name: "Charlie", status: "✅ Submitted" },
      ],
    },
    {
      title: "History Essay: Civil War",
      subject: "History",
      due: "1/20/2024",
      completion: 32,
      completed: "8/25",
      students: [
        { name: "Alice", status: "✅ Submitted" },
        { name: "Bob", status: "❌ Not Submitted" },
        { name: "Charlie", status: "✅ Submitted" },
        { name: "Alice", status: "✅ Submitted" },
        { name: "Bob", status: "❌ Not Submitted" },
        { name: "Charlie", status: "✅ Submitted" },
        { name: "Alice", status: "✅ Submitted" },
        { name: "Bob", status: "❌ Not Submitted" },
        { name: "Charlie", status: "✅ Submitted" },
        { name: "Alice", status: "✅ Submitted" },
        { name: "Bob", status: "❌ Not Submitted" },
        { name: "Charlie", status: "✅ Submitted" },
      ],
    },
  ];

  return (
    <div className="min-h-screen  p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🍎 Teaching Hub{" "}
          <span className="text-gray-500 text-lg">Teacher Dashboard</span>
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-gray-600">Welcome, Ms. Johnson! 🌞</p>
          <Button variant="outline">Sign Out</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-blue-100">
          <CardContent className="p-4 text-center">
            <p className="text-gray-700 font-semibold">👥 Total Students</p>
            <p className="text-3xl font-bold">25</p>
            <p className="text-gray-500">Amazing learners! ✨</p>
          </CardContent>
        </Card>
        <Card className="bg-green-100">
          <CardContent className="p-4 text-center">
            <p className="text-gray-700 font-semibold">📚 Active Assignments</p>
            <p className="text-3xl font-bold">3</p>
            <p className="text-gray-500">Learning adventures! 🚀</p>
          </CardContent>
        </Card>
        <Card className="bg-pink-100">
          <CardContent className="p-4 text-center">
            <p className="text-gray-700 font-semibold">📊 Completion Rate</p>
            <p className="text-3xl font-bold">76%</p>
            <p className="text-gray-500">Great progress! 👏</p>
          </CardContent>
        </Card>
      </div>

      {/* Assignments */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📝 Class Assignments ✨</h2>
        <Button className="bg-green-500 hover:bg-green-600">
          + New Assignment
        </Button>
      </div>

      <div className="space-y-4">
        {assignments.map((a, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{a.title}</h3>
                  <p className="text-gray-600">
                    📚 Subject: {a.subject} • 📅 Due: {a.due}
                  </p>
                  <Progress value={a.completion} className="h-3 my-3" />
                  <p className="text-gray-500">
                    {a.completion}% completion rate
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-green-600 text-sm">
                    {a.completed} completed
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setOpenIndex(openIndex === idx ? null : idx)
                      }
                    >
                      {openIndex === idx ? "Hide Details" : "View Details"}
                    </Button>
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>

              {/* Student List (Collapsible) */}
              {openIndex === idx && (
                <div className="mt-4 border-t pt-3 space-y-2 max-h-[300px] overflow-y-auto">
                  {a.students.map((s, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() =>
                        setSelectedStudent({ ...s, assignment: a.title })
                      }
                    >
                      <span className="font-medium">{s.name}</span>
                      <span className="text-sm text-gray-600">{s.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student Modal */}
      <Dialog
        open={!!selectedStudent}
        onOpenChange={() => setSelectedStudent(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedStudent?.name}'s Submission</DialogTitle>
          </DialogHeader>
          <p className="text-gray-700">
            Assignment: <strong>{selectedStudent?.assignment}</strong>
          </p>
          <p className="mt-2">
            Status:{" "}
            <span className="font-semibold">{selectedStudent?.status}</span>
          </p>
          <div className="mt-4">
            {/* Энд зураг эсвэл даалгаврын файл харуулах боломжтой */}
            <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              🖼️ Assignment Preview Here
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
