import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function Nav() {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center w-full h-12 px-3 mt-1 xl:h-20 xl:px-5">
            <div className="flex items-center h-full w-32 ml-1 xl:w-60">
                <img src="/vaultx.png" alt="logo" />
            </div>
            <div className="flex h-full items-center justify-between">
                <Button
                    variant={"default"}
                    className="w-24 mr-2 xl:mr-5"
                    onClick={() => navigate("/signup")}
                >
                    SIGN UP
                </Button>
                <Button
                    variant={"secondary"}
                    className="w-24"
                    onClick={() => navigate("/login")}
                >
                    LOG IN
                </Button>
            </div>
        </div>
    );
}

export default Nav;
