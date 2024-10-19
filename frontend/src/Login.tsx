import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { TextField } from "@mui/material";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useSetRecoilState } from "recoil";
import { userState } from "./store/atoms/authState";
import { jwtDecode } from "jwt-decode";
import SuccessToast from "./components/ui/SuccessToast";
import ErrorToast from "./components/ui/ErrorToast";

function Login() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const setUserState = useSetRecoilState(userState);
    const [isLoggedIn, setIsLoggedIn] = useState(
        JSON.parse(localStorage.getItem("isLoggedIn") || "false")
    );
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateSchema = () => {
        const emailRegex =
            /^[a-zA-Z0-9._%+-]+[a-zA-Z0-9%+-]@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        if (email.length == 0) {
            toast(<ErrorToast message="email cannot be empty" />);
            return false;
        }
        if (!emailRegex.test(email)) {
            toast(<ErrorToast message="Invalid email format" />);
            return false;
        } else if (password.length < 8) {
            toast(
                <ErrorToast message="Password must be more than 8 characters" />
            );
            return false;
        } else {
            return true;
        }
    };

    const onLogin = () => {
        if (validateSchema()) {
            setIsLoading(true);
            axios
                .post(`${BASE_URL}/api/v1/user/login`, {
                    email,
                    password,
                })
                .then(({ status, data }) => {
                    if (status == 200) {
                        navigate("/");
                        toast(
                            <SuccessToast message="Logged in successfully !" />,
                            {
                                style: {
                                    fontSize: "16px",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                },
                            }
                        );
                        localStorage.token = data.token;
                        localStorage.isLoggedIn = true;
                        setIsLoggedIn(true);
                        const userObj = jwtDecode<{
                            firstName: string;
                            lastName: string;
                            email: string;
                        }>(data.token);
                        setUserState(userObj);
                        setIsLoading(false);
                    }
                })
                .catch((e) => {
                    if (axios.isAxiosError(e)) {
                        const axiosError = e as AxiosError;
                        if (axiosError.status == 401) {
                            toast(
                                <ErrorToast message="Wrong email or password." />,
                                {
                                    style: {
                                        fontSize: "16px",
                                        border: "1px solid rgba(255, 255, 255, 0.2)",
                                    },
                                }
                            );
                            setIsLoading(false);
                        } else if (axiosError.status == 422) {
                            toast(
                                <ErrorToast message="Invalid email format." />,
                                {
                                    style: {
                                        fontSize: "16px",
                                        border: "1px solid rgba(255, 255, 255, 0.2)",
                                    },
                                }
                            );
                            setIsLoading(false);
                        } else if (axiosError.status == 404) {
                            toast(
                                <ErrorToast message="User does not exist, try signing in." />,
                                {
                                    style: {
                                        fontSize: "16px",
                                        border: "1px solid rgba(255, 255, 255, 0.2)",
                                    },
                                }
                            );
                            setIsLoading(false);
                        } else {
                            toast(
                                <ErrorToast message="Some error occurred, try again." />,
                                {
                                    style: {
                                        fontSize: "16px",
                                        border: "1px solid rgba(255, 255, 255, 0.2)",
                                    },
                                }
                            );
                            setIsLoading(false);
                        }
                    }
                    console.log(e);
                });
        }
    };

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
                <div className="xl:w-full">
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
            <div className="w-full my-auto xl:h-full xl:w-3/4 bg-slate-950 xl:bg-slate-900 flex items-center justify-center">
                <div className="w-[420px] xl:border-2 xl:border-slate-80 bg-slate-950 rounded-lg px-12 py-10">
                    <div className="text-xl font-bold text-slate-200 w-full text-center mb-8">
                        Welcome back !
                    </div>
                    <div className="mt-8">
                        <TextField
                            label="Email"
                            variant="outlined"
                            className="w-full"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="mt-3">
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            className="w-full"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div className="w-full mt-10 flex flex-col">
                        <Button
                            className="w-full py-6 mb-2 flex items-center justify-center hover:bg-white"
                            onClick={onLogin}
                            disabled={isLoading}
                        >
                            {!isLoading ? (
                                <div>LOG IN</div>
                            ) : (
                                <div>
                                    <img
                                        className="w-1/2 h-auto m-auto"
                                        src="/icons/Fountain.gif"
                                        alt=""
                                    />
                                </div>
                            )}
                        </Button>
                        <Button
                            className="w-full py-6"
                            variant={"secondary"}
                            onClick={() => navigate("/")}
                        >
                            CANCEL
                        </Button>
                        <div className="w-full text-center text-slate-300 mt-4 text-sm">
                            New user ?
                            <div
                                className="ml-1 text-slate-100 inline-block cursor-pointer"
                                onClick={() => navigate("/signup")}
                            >
                                signup instead
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
