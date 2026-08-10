import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  category: {
    type: Number,
    required: true,
  },
  medicalExamDate: {
    type: Date,
    required: true,
  },
  training: {
    type: String,
    enum: ["Platné", "Končí"],
    required: true,
  },
  ppe: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    enum: ["ok", "warning", "error"],
    default: "ok",
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
