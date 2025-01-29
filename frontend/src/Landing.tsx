import Hero from "./components/Hero";
import Nav from "./components/Nav";

function Landing() {
    return (
        <div className="h-screen bg-gradient-to-tr from-blue-950 via-slate-950 to-blue-950">
            <div className="container mx-auto">
                <Nav />
                <Hero />
            </div>
        </div>
    );
}

export default Landing;
