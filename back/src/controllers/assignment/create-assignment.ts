import { RequestHandler } from "express";
import { assignmentModel } from "../../models/assignment.models";
import { childrenModel } from "../../models/children.models";

export const createAssignment: RequestHandler = async (req, res) => {
  const { teacher, lessons, dayCares, images, publicLinks } = req.body;

  const childrens = await childrenModel
    .find({ teacher: teacher })
    .select("_id");

  if (!childrens.length) {
    res.status(404).json({ message: "Teacher has no children" });
    return;
  }

  try {
    const newAssignment = await assignmentModel.create({
      teacher,
      childrens: childrens.map((c) => c._id),
      lessons,
      dayCares,
      images,
      publicLinks,
    });

    await childrenModel.updateMany(
      { teacher: teacher },
      { $push: { assignment: newAssignment._id } }
    );

    res.status(201).json({
      message: "Assignment created successfully",
      assignment: newAssignment,
    });
  } catch (error) {
    console.error("Create assignment error:", error);
    res.status(500).json({ message: "Create assignment server error" });
  }
};
