import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard"; // das erstellst du gleich

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Bus Buchungssystem</h1>
                <Routes>
                    <Route path="/" element={<AuthForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
