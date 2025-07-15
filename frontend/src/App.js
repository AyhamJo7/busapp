import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard"; // das erstellst du gleich

function App() {
    return (
        <Router>
            <div className="App" style={{
                fontFamily: "sans-serif",
                background: "linear-gradient(to bottom, #caf0f8, #ffffff)",
                minHeight: "100vh"
            }}>
                {/* Firmenname / Logo */}
                <header style={{
                    backgroundColor: "#0077b6",
                    color: "#fff",
                    padding: "15px",
                    textAlign: "center",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
                }}>
                    🌅 SeaVoyager
                </header>

                {/* Seiten */}
                <Routes>
                    <Route path="/" element={<AuthForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );

}

export default App;
