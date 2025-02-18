import express from "express";
import { z as zod } from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import sendOtp from "../libs/resend";
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
    lastName: zod.string().optional(),
    password: zod.string().optional(),
    authType: zod.enum(["EMAIL", "GOOGLE"]),
    photoUrl: zod.string().optional(),
    googleId: zod.string().optional(),
    emailVerified: zod.boolean(),
});
const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().optional(),
    authType: zod.enum(["EMAIL", "GOOGLE"]),
});

const generateOtp = () => {
    return Math.floor(Math.random() * 900000 + 100000);
};

const otpStore: { [key: string]: number } = {};

//////////////////////////////////////////////////////////////////////////////////////////////////
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
                const randomNum = Date.now().toString().slice(-6);
                const username = `${
                    data.firstName.toLowerCase().trim().split(" ").join("") +
                    "_" +
                    randomNum
                }`;

                const hashedPassword = await bcrypt.hash(data.password!!, 10);

                try {
                    const user = await prisma.user.create({
                        data: {
                            username,
                            email: data.email,
                            firstName: data.firstName,
                            lastName: data.lastName || "",
                            passwordHash: hashedPassword || "",
                            authType: data.authType || "EMAIL",
                            googleId: data.googleId || "",
                            photoUrl: data.photoUrl || "",
                            emailVerified: data.emailVerified,
                        },
                    });

                    console.log(user);

                    const { passwordHash, ...currUser } = user;

                    const token = jwt.sign(
                        {
                            email: data.email,
                            firstName: data.firstName,
                            lastName: data.lastName,
                        },
                        secret
                    );
                    res.status(200).json({
                        message: "signup successfull",
                        token,
                        currUser,
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
                const { passwordHash, ...currUser } = user;
                let passwordCorrect = false;
                if (data.authType == "EMAIL") {
                    passwordCorrect = await bcrypt.compare(
                        data.password!!,
                        user.passwordHash!!
                    );
                }
                if (data.authType == "GOOGLE") {
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
                        currUser,
                    });
                } else if (passwordCorrect) {
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
                        currUser,
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

router.post("/get-otp", async (req, res) => {
    const { email, firstName } = req.body;
    const otp = generateOtp();
    const otpId = uuidv4();
    otpStore[otpId] = otp;
    const resendResponse = await sendOtp(otp, firstName, email);
    res.json({ otpId, response: resendResponse });
});

router.post("/verify-otp", async (req, res) => {
    const { otp, otpId } = req.body;
    if (otpStore[otpId] == otp) {
        delete otpStore[otpId];
        res.json({
            success: true,
        });
    } else {
        res.json({
            success: false,
            msg: "invalid otp",
        });
    }
});

export default router;
