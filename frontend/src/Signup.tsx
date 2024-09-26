import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { TextField } from "@mui/material";
import { Button } from "./components/ui/button";

function Signup() {
    return (
        <div className="flex w-[100vw] h-[100vh] ">
            <div className="h-full w-1/4 bg-slate-950 flex flex-col items-center py-28 px-10">
                <div className="w-full mb-20 flex justify-center">
                    <img
                        className="h-10 w-auto"
                        src="/vaultx.png"
                        alt="vaultx"
                    />
                </div>
                <div className=" font-bold w-full text-left mb-1 ">FAQs</div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            What cryptocurrencies does this platform support ?
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
                            Yes, as long as it is either Bitcoin or Ethereum or
                            Solana, you can safely deposit and transact using
                            your own crypto.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>
                            Is this platform secure ?
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes, we are following all the security measures to
                            ensure the safety of your assets both during a
                            transaction and when it sits idle in your wallet.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="h-full w-3/4 bg-slate-900 flex items-center justify-center">
                <div className="w-[420px] border-2 border-slate-800 bg-slate-950 rounded-lg px-12 py-10">
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
                        <Button className="w-full py-6" variant={"secondary"}>
                            CANCEL
                        </Button>
                        <div className="w-full text-center text-slate-300 mt-4 text-sm">
                            Existing user ?{" "}
                            <a
                                href="/login"
                                className="text-slate-100 underline"
                            >
                                login instead
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
