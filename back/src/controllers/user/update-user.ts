import { userModel } from "../../models/user.model";

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, firstName, lastName, phoneNumber, role } =
      req.body;
    const user = await userModel.findByIdAndUpdate(
      id,
      {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        role,
      },
      { new: true }
    );
    res.status(200).json({ message: `User updated`, user });
  } catch (error) {
    res.status(500).json({ error, message: "Update user server error" });
  }
};
