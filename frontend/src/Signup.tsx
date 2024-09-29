import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { TextField } from "@mui/material";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col-reverse overflow-y-auto w-[100vw] h-[100vh] xl:flex-row bg-slate-950">
            <div className="w-full py-10 bg-slate-950 hidden xl:flex xl:flex-col xl:items-center xl:py-28 xl:px-10 xl:h-full xl:w-1/4">
                <div className="w-full mb-20 flex justify-center">
                    <img
                        className="h-7 xl:h-10 w-auto"
                        src="/vaultx.png"
                        alt="vaultx"
                        onClick={() => navigate("/")}
                    />
                </div>
                <div>
                    <div className=" font-bold w-full text-left mb-1">FAQs</div>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                What cryptocurrencies do we support ?
                            </AccordionTrigger>
                            <AccordionContent>
                                We support Bitcoin, Ethereum & Solana.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                Can I deposit my crypto here ?
                            </AccordionTrigger>
                            <AccordionContent>
                                Yes, as long as it is either Bitcoin or Ethereum
                                or Solana, you can safely deposit and transact
                                using your own crypto.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                Is this platform secure ?
                            </AccordionTrigger>
                            <AccordionContent>
                                Yes, we are following all the security measures
                                to ensure the safety of your assets both during
                                a transaction and when it sits idle in your
                                wallet.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
            <div className="w-full my-auto xl:h-full xl:w-3/4 bg-slate-900 flex items-center justify-center">
                <div className="w-[420px] xl:border-2 xl:border-slate-800 bg-slate-950 rounded-lg px-12 py-10">
                    <div className="text-xl font-bold text-slate-200 w-full text-center mb-8">
                        Welcome aboard !
                    </div>
                    <div className="mt-8">
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            className="w-full"
                        />
                    </div>
                    <div className="mt-3">
                        <TextField
                            id="outlined-basic"
                            label="First Name"
                            variant="outlined"
                            className="w-full"
                        />
                    </div>
                    <div className="mt-3">
                        <TextField
                            id="outlined-basic"
                            label="Last Name"
                            variant="outlined"
                            className="w-full"
                        />
                    </div>
                    <div className="mt-3">
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            type="password"
                            className="w-full"
                        />
                    </div>
                    <div className="w-full mt-10 flex flex-col">
                        <Button className="w-full py-6 mb-2">SIGN IN</Button>
                        <Button
                            className="w-full py-6"
                            variant={"secondary"}
                            onClick={() => navigate("/")}
                        >
                            CANCEL
                        </Button>
                        <div className="w-full text-center text-slate-300 mt-4 text-sm">
                            Existing user ?
                            <div
                                className="ml-1 text-slate-100 inline-block cursor-pointer"
                                onClick={() => navigate("/login")}
                            >
                                login instead
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
