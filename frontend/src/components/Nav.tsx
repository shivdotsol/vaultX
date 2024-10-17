import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInState, userState } from "@/store/atoms/authState";

function Nav() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState);
    const currentUser = useRecoilValue(userState);

    return (
        <div className="flex justify-between items-center w-full h-12 px-3 mt-1 xl:h-20 xl:px-5">
            <div className="flex items-center h-full w-32 ml-1 xl:w-60">
                <img src="/vaultx.png" alt="logo" />
            </div>
            {isLoggedIn ? (
                <Avatar className="w-14 h-14 font-bold cursor-pointer">
                    <AvatarFallback style={{ fontSize: "18px" }}>
                        {currentUser.firstName}
                    </AvatarFallback>
                </Avatar>
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
    );
}

export default Nav;
