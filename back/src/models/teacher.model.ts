import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const teacherSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  school: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },

  students: [{
    type: Schema.Types.ObjectId,
    ref: "Student",
  }],
  homeworks: [{
    type: Schema.Types.ObjectId,
    ref: "Homework",
  }],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare password
teacherSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const teacherModel = model("Teacher", teacherSchema);
