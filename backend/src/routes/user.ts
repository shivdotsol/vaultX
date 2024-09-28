import express from "express";
import { z as zod } from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const secret = process.env.JWT_SECRET;
if (typeof secret == "undefined") {
    throw new Error("JWT_SECRET is not defined in the environment");
}

const signupSchema = zod.object({
    email: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod
        .string()
        .min(8, "Password must be atleast 8 characters long."),
});
const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
});

router.post("/signup", (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);

    ///////// register user and send JWT token

    if (!success) {
        res.json({
            message: "invalid signup schema, try again.",
        });
    } else {
        const token = jwt.sign(
            {
                email: body.email,
                firstName: body.firstName,
                lastName: body.lastName,
            },
            secret
        );

        res.json({
            message: "signup successfull",
            token,
        });
    }

    ///////// make entry for user in db
});

/////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/login", (req, res) => {
    res.json({
        msg: "login route",
    });
});

export default router;
