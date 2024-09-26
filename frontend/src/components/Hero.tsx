import { Button } from "./ui/button";

function Hero() {
    return (
        <div className="w-full flex flex-col justify-center items-center ">
            <div className="font-extrabold tracking-tighter text-6xl pt-32 pb-5 text-slate-200">
                Cryptocurrency Meets Convenience
                <div className="w-full mt-5 text-center text-xl tracking-normal font-semibold text-slate-400">
                    A web based solution aimed at easing up the process of
                    paying using cryptocurrencies.
                </div>
                <div className="w-full mt-1 text-center text-xl tracking-normal font-bold text-slate-400">
                    Supporting Bitcoin, Ethereum & Solana
                </div>
            </div>
            <Button size={"lg"} className="font-bold">
                GET STARTED
            </Button>
        </div>
    );
}

export default Hero;
