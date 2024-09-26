import express from "express";
import userRouter from "./routes/user";

const app = express();

app.use("/api/v1/user", userRouter);

app.listen(3000);
