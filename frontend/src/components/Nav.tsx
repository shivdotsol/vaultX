import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/store/atoms/authState";
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

function Nav() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(
        JSON.parse(localStorage.getItem("isLoggedIn") || "false")
    );
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const currentUser = useRecoilValue(userState);

    function openAlert(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
        setIsDialogOpen(true);
    }

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        setIsDialogOpen(false);
    }

    return (
        <div className="flex justify-between items-center w-full h-12 px-3 mt-1 xl:h-20 xl:px-5">
            <div className="flex items-center h-full w-32 ml-1 xl:w-60">
                <img src="/vaultx.png" alt="logo" />
            </div>
            <div className="flex">
                {isLoggedIn ? (
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="w-14 h-14 font-bold cursor-pointer">
                                    <AvatarFallback
                                        style={{ fontSize: "20px" }}
                                    >
                                        {currentUser.firstName
                                            .slice(0, 1)
                                            .toUpperCase() +
                                            currentUser.lastName
                                                .slice(0, 1)
                                                .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Settings
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>GitHub</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <div
                                        className="text-red-500 h-full w-full"
                                        onClick={openAlert}
                                    >
                                        Log out
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialog open={isDialogOpen}>
                            <AlertDialogTrigger asChild></AlertDialogTrigger>
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
                                        onClick={() => setIsDialogOpen(false)}
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
                            onClick={() => navigate("/#/signup")}
                        >
                            SIGN UP
                        </Button>
                        <Button
                            variant={"secondary"}
                            className="w-24 xl:w-36 xl:h-11 text-[16px]"
                            onClick={() => navigate("/#/login")}
                        >
                            LOG IN
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Nav;
