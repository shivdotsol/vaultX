import express from "express";
import { z as zod } from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const router = express.Router();
const secret = process.env.JWT_SECRET;
const prisma = new PrismaClient();

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

router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success, data, error } = signupSchema.safeParse(body);

    if (!success) {
        res.status(422).json({
            message: "invalid signup schema, try again.",
            error,
        });
    } else {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: data.email,
                },
            });
            if (user == null) {
                const token = jwt.sign(
                    {
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                    },
                    secret
                );

                const randomNum = Date.now().toString().slice(-6);
                const username = `${
                    data.firstName.toLowerCase().trim().split(" ").join("") +
                    "_" +
                    randomNum
                }`;

                try {
                    const user = await prisma.user.create({
                        data: {
                            username,
                            email: data.email,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            passwordHash: data.password,
                        },
                    });

                    console.log(user);

                    res.status(200).json({
                        message: "signup successfull",
                        token,
                    });
                } catch (e) {
                    console.log(e);
                    res.status(500).json({
                        message: "some error occurred while creating the user.",
                    });
                }
            } else {
                res.status(409).json({
                    msg: "this email is already in use, try logging in or use a different email",
                });
            }
        } catch (e) {
            res.status(500).json({
                msg: "some error occurred",
            });
        }
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/login", async (req, res) => {
    const body = req.body;
    const { success, data } = loginSchema.safeParse(body);

    if (!success) {
        res.status(422).json({
            msg: "invalid login schema",
        });
    } else {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: data.email,
                },
            });

            if (user != null) {
                if (data.password == user.passwordHash) {
                    const token = jwt.sign(
                        {
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                        },
                        secret
                    );

                    res.status(200).json({
                        msg: "logged in, sucessfully",
                        token,
                    });
                } else {
                    res.status(401).json({
                        msg: "invalid login credentials",
                    });
                }
            } else {
                res.status(404).json({
                    msg: "user not found, try signing up first,",
                });
            }
        } catch (e) {
            console.log("some error occurred " + e);
            res.status(500).json({
                msg: "some error occurred, try again",
            });
        }
    }
});

export default router;
