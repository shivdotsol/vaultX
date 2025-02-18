import { useState } from "react";
import { Button } from "./ui/button";

function WalletList() {
    const [currentToken, setCurrentToken] = useState("BTC");

    return (
        <div className="flex flex-col py-6 px-7 w-[58%] rounded-2xl border-[3px] border-slate-800 bg-slate-900 bg-opacity-50">
            <div className="flex justify-between">
                <div className="text-xl font-bold">Your Wallets</div>
                <Button className="font-bold">+ Create Wallet</Button>
            </div>
            <div className="flex mt-3">
                <Button
                    variant={currentToken == "BTC" ? "default" : "secondary"}
                    className="font-bold mr-2"
                    onClick={() => setCurrentToken("BTC")}
                >
                    Bitcoin
                </Button>
                <Button
                    variant={currentToken == "ETH" ? "default" : "secondary"}
                    className="font-bold mr-2"
                    onClick={() => setCurrentToken("ETH")}
                >
                    Ethereum
                </Button>
                <Button
                    variant={currentToken == "SOL" ? "default" : "secondary"}
                    className="font-bold"
                    onClick={() => setCurrentToken("SOL")}
                >
                    Solana
                </Button>
            </div>
        </div>
    );
}

export default WalletList;
