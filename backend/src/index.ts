import express from "express";
import userRouter from "./routes/user";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/v1/user", userRouter);

app.listen(3000);
