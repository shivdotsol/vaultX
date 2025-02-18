import express from "express";
import userRouter from "./routes/user";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use(express.static(path.join(__dirname, "../public/dist/")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/dist", "index.html"));
});

app.listen(3000);
