import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import WalletList from "./components/WalletList";
import TransactionList from "./components/TransactionList";

function Dashboard() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-[100vh] px-16 py-14 bg-gradient-to-tr from-slate-950 via-slate-800 to-slate-950">
            {/* heading */}
            <div className="flex justify-between items-center mb-16">
                <div className="text-4xl font-bold">Dashboard</div>
                <div>
                    <Button
                        onClick={() => navigate("/")}
                        variant={"outline"}
                        className="text-lg px-6 py-5 bg-slate-800 hover:bg-slate-800 border border-slate-700"
                    >
                        Home
                    </Button>
                </div>
            </div>
            {/* assets value */}
            <div className="flex justify-between px-5 ">
                <div className="flex flex-col justify-center rounded-xl bg-slate-950 bg-opacity-30 h-28 pl-6 pr-28 border-2 border-slate-800">
                    <div className="text-xl mb-1 text-slate-300">
                        Total Assets
                    </div>
                    <div className="text-4xl font-bold">INR 888.00</div>
                </div>
                <div className="flex align-middle h-full">
                    <div className="flex flex-col rounded-2xl mr-5 pb-5 pt-4 px-4 border-2 border-slate-800 bg-slate-950 bg-opacity-30">
                        <div className="text-xl pl-1 mb-2 text-slate-300 font-bold">
                            Bitcoin
                        </div>
                        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 py-2 w-full pl-3 pr-24 rounded-xl">
                            <div className="text-2xl mb-1 font-bold">
                                INR 444.00
                            </div>
                            <div className="text-lg font-bold text-slate-300">
                                0.000034 BTC
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col rounded-2xl mr-5 pb-5 pt-4 px-4 border-2 border-slate-800 bg-slate-950 bg-opacity-30">
                        <div className="text-xl pl-1 mb-2 text-slate-300 font-bold">
                            Ethereum
                        </div>
                        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 py-2 w-full pl-3 pr-24 rounded-xl">
                            <div className="text-2xl mb-1 font-bold">
                                INR 111.00
                            </div>
                            <div className="text-lg font-bold text-slate-300">
                                0.000034 ETH
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col rounded-2xl mr-5 pb-5 pt-4 px-4 border-2 border-slate-800 bg-slate-950 bg-opacity-30">
                        <div className="text-xl pl-1 mb-2 text-slate-300 font-bold">
                            Solana
                        </div>
                        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 py-2 w-full pl-3 pr-24 rounded-xl">
                            <div className="text-2xl mb-1 font-bold">
                                INR 333.00
                            </div>
                            <div className="text-lg font-bold text-slate-300">
                                0.000034 SOL
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-between mt-10 px-5">
                {/* wallets */}
                <WalletList />
                {/* Transactions */}
                <TransactionList />
            </div>
        </div>
    );
}

export default Dashboard;
