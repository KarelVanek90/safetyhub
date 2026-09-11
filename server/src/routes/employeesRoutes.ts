import express from "express";
import Employee from "../models/Employee";
import mongoose from "mongoose";
const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const result = await Employee.find();

    return res.json({
      msg: "Úspěšně nahraná data",
      docs: result,
    });
  } catch (error) {
    console.error("CHYBA GET EMPLOYEES:", error);
    return res.status(500).json({
      msg: "Data se nepodařilo získat",
    });
  }
});

router.post("/", async (req, res) => {
  const { name, position, category, medicalExamDate, training, ppe } = req.body;
  try {
    const result = await Employee.create({
      name,
      position,
      category,
      medicalExamDate,
      training,
      ppe,
    });
    return res.status(201).json({
      msg: "Zaměstnanec byl úspěšně vytvořen",
      docs: result,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "data se nepodařilo vložit",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Employee.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        msg: "zaměstnanec nenalezen",
      });
    }

    return res.json({ docs: result });
  } catch (error) {
    console.error("CHYBA GET EMPLOYEE BY ID:", error);

    return res.status(400).json({
      msg: "Neplatné ID zaměstnance",
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        msg: "Neplatné ID zaměstnance",
      });
    }
    const fieldsToUpdate: Record<string, unknown> = {};
    const allowedFields = [
      "name",
      "position",
      "category",
      "medicalExamDate",
      "training",
      "ppe",
    ];
    allowedFields.forEach((item) => {
      if (Object.hasOwn(req.body, item)) {
        fieldsToUpdate[item] = req.body[item];
      }
    });
    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({
        msg: "Nebyla odeslána žádná data k aktualizaci",
      });
    }
    const result = await Employee.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: fieldsToUpdate,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!result) {
      return res.status(404).json({
        msg: "zaměstnanec nenalezen",
      });
    }
    return res.status(200).json({
      msg: "Zaměstnanec byl úspěšně aktualizován",
      docs: result,
    });
  } catch (error) {
    console.error("CHYBA UPDATE EMPLOYEE:", error);

    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        msg: "Zaměstnanec obsahuje chybějící nebo neplatná data",
      });
    }

    return res.status(500).json({
      msg: "Zaměstnance se nepodařilo aktualizovat",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Employee.findOneAndDelete({ _id: req.params.id });

    if (!result) {
      return res.status(404).json({
        msg: "Zaměstnanec nenalezen",
      });
    }

    return res.status(200).json({
      msg: "Zaměstnanec odstraněn",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      msg: "Chyba při mazání",
    });
  }
});

export default router;
