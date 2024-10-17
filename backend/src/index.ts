import express from "express";
import userRouter from "./routes/user";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/v1/user", userRouter);

app.listen(3000);
