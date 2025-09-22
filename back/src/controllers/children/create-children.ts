import { RequestHandler } from "express";
import { childrenModel } from "../../models/children.models";
import { userModel } from "../../models/user.model";

export const createChildren: RequestHandler = async (req, res) => {
  const { firstName, lastName, profilePicture, parentId, teacherId } = req.body;

  console.log("Teacher Id", teacherId);
  console.log("Parent Id", parentId);

  try {
    const parent = await userModel.findById(parentId);
    if (!parent) {
      res.status(404).json({ message: `Parent with ${parentId}:id not found` });
      return;
    }
    if (parent.role !== "parents") {
      res.status(400).json({ message: "User is not a parent" });
      return;
    }

    const teacher = await userModel.findById(teacherId);
    console.log(teacher);

    if (!teacher) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }
    if (teacher.role !== "teacher") {
      res.status(400).json({ message: "User is not a teacher" });
      return;
    }

    // Ensure teacher has school and grade so child inherits them
    if (!teacher.school || !teacher.grade) {
      res.status(400).json({
        message: "Teacher is missing school or grade",
        details: {
          teacherId,
          school: teacher.school ?? null,
          grade: teacher.grade ?? null,
        },
      });
      return;
    }

    const newChild = await childrenModel.create({
      firstName,
      lastName,
      profilePicture,
      teacher: teacher,
      parents: parent._id,
      grade: teacher.grade,
      school: teacher.school,
    });
    console.log(newChild.teacher);

    // Avoid triggering full user validation; push child IDs atomically
    await userModel.updateOne(
      { _id: parent._id },
      { $push: { children: newChild._id } }
    );

    await userModel.updateOne(
      { _id: teacher._id },
      { $push: { children: newChild._id } }
    );

    res.status(201).json({
      message: "Child created successfully",
      child: newChild,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Create Student server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
