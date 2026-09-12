import mongoose from "mongoose";

const medicalExamSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    examType: {
      type: String,
      enum: ["initial", "periodic", "extraordinary", "periodic-extraordinary"],
      required: true,
    },
    examDate: {
      type: Date,
      required: true,
    },
    result: {
      type: String,
      enum: ["fit", "fit-with-condition", "unfit", "long-term-unfit"],
      required: true,
    },
    positionAtExam: {
      type: String,
      required: true,
    },
    categoryAtExam: {
      type: String,
      enum: ["1", "2", "2R", "3", "4"],
      required: true,
    },
    condition: {
      type: String,
      required: function (this: { result: string }): boolean {
        return this.result === "fit-with-condition";
      },
    },
    note: {
      type: String,
    },
    nextExtraordinaryExamDate: {
      type: Date,
    },

    evidenceNumber: {
      type: String,
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  },
  {
    timestamps: true,
  },
);
const MedicalExam = mongoose.model("MedicalExam", medicalExamSchema);
export default MedicalExam;
