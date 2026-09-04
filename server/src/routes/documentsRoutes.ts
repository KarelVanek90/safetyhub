import express from "express";
import Document from "../models/Document";
import Employee from "../models/Employee";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      title,
      category,
      employeeId,
      issueDate,
      expiryDate,
      note,
      fileUrl,
    } = req.body;
    if (employeeId) {
      if (!mongoose.Types.ObjectId.isValid(employeeId)) {
        return res.status(400).json({
          msg: "Neplatné ID zaměstnance",
        });
      }
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json({
          msg: "Zaměstnanec nebyl nalezen",
        });
      }
    }
    const result = await Document.create({
      title,
      category,
      employeeId,
      issueDate,
      expiryDate,
      note,
      fileUrl,
    });
    return res.status(201).json({
      msg: "Dokument byl úspěšně vytvořen",
      docs: result,
    });
  } catch (error) {
    console.error("POST /documents:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        msg: "Dokument obsahuje chybějící nebo neplatná data",
        docs: [],
      });
    }
    return res.status(500).json({
      msg: "Dokument se nepodařilo vytvořit",
      docs: [],
    });
  }
});

router.get("/", async (_req, res) => {
  try {
    const result = await Document.find().populate("employeeId", "name");

    return res.json({
      msg: "Dokumenty byly načteny",
      docs: result,
    });
  } catch (error) {
    console.error("GET /documents:", error);

    return res.status(500).json({
      msg: "Dokumenty se nepodařilo načíst",
      docs: [],
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        msg: "Neplatné ID dokumentu",
      });
    }
    const result = await Document.findById(req.params.id).populate(
      "employeeId",
      "name",
    );

    if (!result) {
      return res.status(404).json({
        msg: "Dokument nebyl nalezen",
      });
    }

    return res.json({ docs: result });
  } catch (error) {
    console.error("GET /documents/:id:", error);

    return res.status(500).json({
      msg: "Dokument se nepodařilo načíst",
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const {
      title,
      category,
      employeeId,
      issueDate,
      expiryDate,
      note,
      fileUrl,
    } = req.body;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        msg: "Neplatné ID dokumentu",
      });
    }
    const fieldsToUpdate = {};
    const fieldsToUnset = {};
    const allowedFields = ["title", "category", "issueDate", "note", "fileUrl"];

    allowedFields.forEach((item) => {
      if (Object.hasOwn(req.body, item)) {
        Object.assign(fieldsToUpdate, {
          [item]: req.body[item],
        });
      }
    });

    if (Object.hasOwn(req.body, "employeeId")) {
      if (employeeId) {
        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
          return res.status(400).json({
            msg: "Neplatné ID zaměstnance",
          });
        }
        const employee = await Employee.findById(employeeId);
        if (!employee) {
          return res.status(404).json({
            msg: "Zaměstnanec nebyl nalezen",
          });
        }
        Object.assign(fieldsToUpdate, { employeeId });
      } else {
        Object.assign(fieldsToUnset, {
          employeeId: 1,
        });
      }
    }
    if (Object.hasOwn(req.body, "expiryDate")) {
      if (expiryDate) {
        Object.assign(fieldsToUpdate, { expiryDate });
      } else {
        Object.assign(fieldsToUnset, {
          expiryDate: 1,
        });
      }
    }
    const updateData = {};
    if (Object.keys(fieldsToUpdate).length > 0) {
      Object.assign(updateData, { $set: fieldsToUpdate });
    }
    if (Object.keys(fieldsToUnset).length > 0) {
      Object.assign(updateData, { $unset: fieldsToUnset });
    }
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        msg: "Nebyla odeslána žádná data k aktualizaci",
      });
    }

    const result = await Document.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!result) {
      return res.status(404).json({
        msg: "Dokument nebyl nalezen",
      });
    }
    return res.status(200).json({
      msg: "Dokument byl úspěšně změněn",
      docs: result,
    });
  } catch (error) {
    console.error("PATCH /documents/:id:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        msg: "Dokument obsahuje chybějící nebo neplatná data",
        docs: [],
      });
    }
    return res.status(500).json({
      msg: "Dokument se nepodařilo aktualizovat",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        msg: "Neplatné ID dokumentu",
      });
    }
    const result = await Document.findOneAndDelete({ _id: req.params.id });

    if (!result) {
      return res.status(404).json({
        msg: "Dokument nebyl nalezen",
      });
    }

    return res.status(200).json({
      msg: "Dokument byl odstraněn",
    });
  } catch (error) {
    console.error("DELETE /documents/:id:", error);

    return res.status(500).json({
      msg: "Chyba při mazání dokumentu",
    });
  }
});

export default router;
