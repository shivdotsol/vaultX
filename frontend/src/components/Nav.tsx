import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/store/atoms/authState";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { TextField } from "@mui/material";

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

function Nav() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(
        JSON.parse(localStorage.getItem("isLoggedIn") || "false")
    );
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const currentUser: User = useRecoilValue(userState);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState(currentUser.email);
    const [firstName, setFirstName] = useState(currentUser.firstName);
    const [lastName, setLastName] = useState(currentUser.lastName);
    const [username, setUsername] = useState(currentUser.username);

    function openAlert(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
        setIsDialogOpen(true);
    }

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setIsDialogOpen(false);
    }
    console.log(currentUser);
    return (
        <>
            <div className="flex justify-between items-center w-full h-12 px-3 mt-1 xl:h-20 xl:px-5">
                <div className="flex items-center h-full w-32 ml-1 xl:w-60">
                    <img src="/vaultx.png" alt="logo" />
                </div>
                <div className="flex">
                    {isLoggedIn ? (
                        <div>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Avatar className="w-14 h-14 font-bold cursor-pointer">
                                        <AvatarImage
                                            src={currentUser.photoUrl}
                                        />
                                        <AvatarFallback
                                            style={{ fontSize: "20px" }}
                                        >
                                            {currentUser.firstName
                                                .slice(0, 1)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </SheetTrigger>
                                <SheetContent>
                                    <div className="w-full h-full flex flex-col justify-between">
                                        <div className="text-slate-200">
                                            <div className="mb-7 font-bold text-lg lg:text-xl">
                                                Profile
                                            </div>
                                            <div className="flex items-end text-slate-300">
                                                <Avatar className="w-28 h-28  font-bold cursor-pointer">
                                                    <AvatarImage
                                                        src={
                                                            currentUser.photoUrl
                                                        }
                                                    />
                                                    <AvatarFallback
                                                        style={{
                                                            fontSize: "30px",
                                                        }}
                                                    >
                                                        {currentUser.firstName
                                                            .slice(0, 1)
                                                            .toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <img
                                                    className="w-6 h-6"
                                                    src="/icons/edit.png"
                                                    alt="edit"
                                                />
                                            </div>
                                            <div className="flex flex-col m-auto">
                                                <div className="mb-2 mt-6">
                                                    {isEditing ? (
                                                        <div>
                                                            <TextField
                                                                className="w-full"
                                                                label={
                                                                    "first name"
                                                                }
                                                                value={
                                                                    firstName
                                                                }
                                                                onChange={(e) =>
                                                                    setFirstName(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <span className="font-bold mr-2">
                                                                first name:
                                                            </span>
                                                            {
                                                                currentUser.firstName
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mb-2">
                                                    {isEditing ? (
                                                        <div>
                                                            <TextField
                                                                className="w-full"
                                                                label={
                                                                    "last name"
                                                                }
                                                                value={lastName}
                                                                onChange={(e) =>
                                                                    setLastName(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <span className="font-bold mr-2">
                                                                last name:
                                                            </span>
                                                            {
                                                                currentUser.lastName
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mb-2">
                                                    {isEditing ? (
                                                        <div>
                                                            <TextField
                                                                className="w-full"
                                                                label={"email"}
                                                                value={email}
                                                                onChange={(e) =>
                                                                    setEmail(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <span className="font-bold mr-2">
                                                                email:
                                                            </span>
                                                            {currentUser.email}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mb-5">
                                                    {isEditing ? (
                                                        <div>
                                                            <TextField
                                                                className="w-full"
                                                                label={
                                                                    "username"
                                                                }
                                                                value={username}
                                                                onChange={(e) =>
                                                                    setUsername(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <span className="font-bold mr-2">
                                                                username:
                                                            </span>
                                                            {
                                                                currentUser.username
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                                <Button
                                                    variant={
                                                        isEditing
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    className="font-bold"
                                                    onClick={() =>
                                                        setIsEditing(
                                                            (prev) => !prev
                                                        )
                                                    }
                                                >
                                                    {isEditing
                                                        ? "Save changes"
                                                        : "Edit profile"}
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <Button variant={"ghost"}>
                                                <div className="w-full h-full text-left font-bold">
                                                    Settings
                                                </div>
                                            </Button>
                                            <Button variant={"ghost"}>
                                                <div className="w-full h-full text-left font-bold">
                                                    Support
                                                </div>
                                            </Button>
                                            <Button
                                                variant={"ghost"}
                                                onClick={() =>
                                                    setIsDialogOpen(true)
                                                }
                                            >
                                                <div className="w-full h-full text-left text-red-600 font-bold">
                                                    Logout
                                                </div>
                                            </Button>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                            <AlertDialog open={isDialogOpen}>
                                <AlertDialogTrigger
                                    asChild
                                ></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you sure you want to log out?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            You will have to log back in again.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel
                                            className="font-bold"
                                            onClick={() =>
                                                setIsDialogOpen(false)
                                            }
                                        >
                                            <div className="w-full h-full">
                                                Cancel
                                            </div>
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            className="bg-red-600 text-white font-bold hover:bg-red-700"
                                            onClick={handleLogout}
                                        >
                                            <div className="w-full h-full">
                                                Log Out
                                            </div>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ) : (
                        <div className="flex h-full items-center justify-between">
                            <Button
                                variant={"default"}
                                className="w-24 mr-2 xl:mr-5 xl:w-36 xl:h-11 text-[16px]"
                                onClick={() => navigate("/signup")}
                            >
                                SIGN UP
                            </Button>
                            <Button
                                variant={"secondary"}
                                className="w-24 xl:w-36 xl:h-11 text-[16px]"
                                onClick={() => navigate("/login")}
                            >
                                LOG IN
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Nav;
