import { atom } from "recoil";

interface User {
    authType: string;
    createdAt: string;
    email: string;
    emailVerified: boolean;
    firstName: string;
    googleId: string;
    id: number;
    lastName: string;
    photoUrl: string;
    username: string;
}

export const userState = atom({
    key: "userState",
    default: JSON.parse(localStorage.getItem("user") || "{}"),
});
