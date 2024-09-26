import express from "express";
import { z as zod } from "zod";

const router = express.Router();

router.post("/signup", (req, res) => {
    res.json({
        msg: "signup route",
    });
});

router.post("/login", (req, res) => {
    res.json({
        msg: "login route",
    });
});

export default router;
