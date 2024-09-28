import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function Nav() {
    const navigate = useNavigate();
    return (
        <div className="flex w-full h-20 px-5 justify-between items-center">
            <div className="h-full w-60 flex items-center ">
                <img src="/vaultx.png" alt="logo" />
            </div>
            <div className="flex h-full items-center justify-between">
                <Button
                    variant={"default"}
                    size={"lg"}
                    className="mr-5"
                    onClick={() => navigate("/signup")}
                >
                    SIGN UP
                </Button>
                <Button
                    variant={"secondary"}
                    size={"lg"}
                    onClick={() => navigate("/login")}
                >
                    LOG IN
                </Button>
            </div>
        </div>
    );
}

export default Nav;
