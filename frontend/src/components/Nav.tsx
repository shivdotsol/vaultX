import { Button } from "./ui/button";

function Nav() {
    return (
        <div className="flex w-full h-20 px-5 justify-between items-center">
            <div className="h-full w-60 flex items-center ">
                <img src="/vaultx.png" alt="logo" />
            </div>
            <div className="flex h-full items-center justify-between">
                <Button variant={"default"} size={"lg"} className="mr-5">
                    SIGN UP
                </Button>
                <Button variant={"secondary"} size={"lg"}>
                    LOG IN
                </Button>
            </div>
        </div>
    );
}

export default Nav;
