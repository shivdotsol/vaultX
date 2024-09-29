import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function Hero() {
    const navigate = useNavigate();
    return (
        <div className="w-full flex flex-col justify-center items-center ">
            <div className="font-extrabold tracking-tighter text-2xl pb-3 pt-24 text-slate-200 xl:text-6xl xl:pt-32 xl:pb-5">
                <div className="text-center">
                    Cryptocurrency Meets Convenience
                </div>
                <div className="w-[80%] mx-auto mt-1 text-center text-sm tracking-normal font-semibold text-slate-400 xl:mt-5 xl:text-xl xl:w-full">
                    A web based solution aimed at easing up the process of
                    paying using cryptocurrencies.
                </div>
                <div className="w-full mt-1 text-center text-sm tracking-normal font-bold text-slate-400 xl:text-xl">
                    Supporting Bitcoin, Ethereum & Solana
                </div>
            </div>
            <Button className="font-bold" onClick={() => navigate("/signup")}>
                GET STARTED
            </Button>
        </div>
    );
}

export default Hero;
