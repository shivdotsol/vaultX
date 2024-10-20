import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Signup from "./Signup";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./Login";
import { Toaster } from "sonner";
import { RecoilRoot } from "recoil";
import Dashboard from "./Dashboard";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    return (
        <HashRouter>
            <RecoilRoot>
                <ThemeProvider theme={darkTheme}>
                    <Toaster duration={5000} theme="dark" />
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </ThemeProvider>
            </RecoilRoot>
        </HashRouter>
    );
}

export default App;
