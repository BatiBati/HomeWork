import { taskModel } from "../../models/task.model";

export const getTasksByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const tasks = await taskModel.find({ teacherId }).populate("homeworks"); // тухайн даалгаварт оруулсан бүх homeworks

    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "Энэ багш даалгавар оруулаагүй байна" });
    }

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching teacher tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};
