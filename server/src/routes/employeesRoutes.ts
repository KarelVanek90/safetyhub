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

export default router;
