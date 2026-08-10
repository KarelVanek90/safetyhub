import express from "express";
import cors from "cors";
import connectDB from "./config/database";
import employeesRouter from "./routes/employeesRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeesRouter);

const PORT = 5000;

app.get("/", (_req, res) => {
  res.send("SafetyHub API běží");
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server běží na portu ${PORT}`);
  });
};

startServer();
