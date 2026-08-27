import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "employee-documentation",
        "bozp",
        "po",
        "internal-regulations",
        "other",
      ],
      required: true,
    },

    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },

    issueDate: {
      type: Date,
      required: true,
    },

    expiryDate: {
      type: Date,
    },

    note: {
      type: String,
    },

    fileUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const Document = mongoose.model("Document", documentSchema);

export default Document;
