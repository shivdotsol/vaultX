import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox, TextField } from "@mui/material";
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
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

interface GoogleJWTPayload {
    iss: string; // Issuer
    nbf: number; // Not before
    aud: string; // Audience
    sub: string; // Subject (Google User ID)
    email: string; // User's email
    email_verified: boolean;
    azp: string;
    name: string; // User's full name
    picture?: string; // User's profile picture URL
    given_name?: string; // User's first name
    family_name?: string; // User's last name
    iat: number; // Issued at
    exp: number; // Expiration time
    jti: string; // JWT ID
}

function Login() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const setUserState = useSetRecoilState(userState);
    const [isLoggedIn, setIsLoggedIn] = useState(
        JSON.parse(localStorage.getItem("isLoggedIn") || "false")
    );
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
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

    const handleGoogleLogin = (res: CredentialResponse) => {
        if (res.clientId != null && res.credential != null) {
            const decoded = jwtDecode<GoogleJWTPayload>(res.credential);
            axios
                .post(`${BASE_URL}/api/v1/user/login`, {
                    email: decoded.email,
                    password,
                    authType: "GOOGLE",
                })
                .then(({ status, data }) => {
                    if (status == 200) {
                        navigate("/dashboard", { replace: true });
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
                        localStorage.user = JSON.stringify(data.currUser);
                        console.log(data.currUser);
                        setIsLoggedIn(true);
                        setIsLoading(false);
                        setUserState(data.currUser);
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

    const onLogin = () => {
        if (validateSchema()) {
            setIsLoading(true);
            axios
                .post(`${BASE_URL}/api/v1/user/login`, {
                    email: email.toLowerCase(),
                    password,
                })
                .then(({ status, data }) => {
                    if (status == 200) {
                        navigate("/dashboard", { replace: true });
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
                        localStorage.user = JSON.stringify(data.currUser);
                        console.log(data.currUser);
                        setIsLoggedIn(true);
                        setIsLoading(false);
                        setUserState(data.currUser);
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
                            type={passwordVisible ? "text" : "password"}
                            className="w-full"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div className="mt-5 flex h-4 items-center">
                        <Checkbox
                            checked={passwordVisible}
                            onChange={() => setPasswordVisible((prev) => !prev)}
                        />
                        <div className="text-sm">Show password</div>
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
                        <div className="my-3 w-full flex items-center justify-center">
                            or
                        </div>
                        <div className="flex w-full items-center justify-center">
                            <GoogleLogin
                                onSuccess={(credentialResponse) => {
                                    handleGoogleLogin(credentialResponse);
                                }}
                                onError={() => {
                                    console.log("Login Failed");
                                }}
                            />
                        </div>
                        <div className="w-full text-center text-slate-300 mt-4 text-sm">
                            New user ?
                            <div
                                className="ml-1 text-slate-100 inline-block cursor-pointer"
                                onClick={() =>
                                    navigate("/signup", { replace: true })
                                }
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
