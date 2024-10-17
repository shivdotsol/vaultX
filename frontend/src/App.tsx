import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Signup from "./Signup";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./Login";
import { Toaster } from "sonner";
import { RecoilRoot } from "recoil";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    return (
        <RecoilRoot>
            <ThemeProvider theme={darkTheme}>
                <Toaster duration={5000} theme="dark" />
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </RecoilRoot>
    );
}

export default App;
