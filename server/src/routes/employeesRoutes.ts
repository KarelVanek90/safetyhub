import express from "express";
import Employee from "../models/Employee";
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
      docs: [],
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
      msg: "data se nopodařilo vložit",
      docs: [],
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
    const { name, position, category, medicalExamDate, training, ppe } =
      req.body;
    const result = await Employee.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name,
          position,
          category,
          medicalExamDate,
          training,
          ppe,
        },
      },
      {
        new: true,
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
    res.status(500).json({
      msg: "Zaměstnance se nepodařilo aktualizovat",
    });
  }
});

export default router;
