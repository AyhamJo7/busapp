import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Frontend() {
    const [view, setView] = useState(""); // "" | "login" | "register"
    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regSuccess, setRegSuccess] = useState(false);

    // Dummy-Login-States (nur UI, kein echter Login)
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);

    // Registrierung
    const handleRegister = async e => {
        e.preventDefault();
        try {
            await axios.post("/api/users", {
                name: regName,
                email: regEmail,
                password: regPassword,
                role: "PASSAGIER"
            });
            setRegSuccess(true);
            setRegName("");
            setRegEmail("");
            setRegPassword("");
        } catch {
            setRegSuccess(false);
            alert("Registrierung fehlgeschlagen!");
        }
    };

    // Dummy-Login-Handler
    const handleLogin = e => {
        e.preventDefault();
        // Hier könntest du einen echten Login-Call machen
        setLoginSuccess(true);
        setLoginEmail("");
        setLoginPassword("");
    };

    return (
        <div className="container mt-4">
            {view === "" && (
                <div className="d-flex flex-column gap-3">
                    <button className="btn btn-primary" onClick={() => setView("login")}>Anmelden</button>
                    <button className="btn btn-secondary" onClick={() => setView("register")}>Registrieren</button>
                </div>
            )}

            {view === "register" && (
                <form onSubmit={handleRegister} className="mt-4">
                    <h2>Registrieren</h2>
                    <div className="mb-2">
                        <input className="form-control" placeholder="Name" value={regName} onChange={e => setRegName(e.target.value)} required />
                    </div>
                    <div className="mb-2">
                        <input className="form-control" type="email" placeholder="E-Mail" value={regEmail} onChange={e => setRegEmail(e.target.value)} required />
                    </div>
                    <div className="mb-2">
                        <input className="form-control" type="password" placeholder="Passwort" value={regPassword} onChange={e => setRegPassword(e.target.value)} required />
                    </div>
                    <button className="btn btn-success" type="submit">Registrieren</button>
                    <button className="btn btn-link" type="button" onClick={() => setView("")}>Zurück</button>
                    {regSuccess && <div className="alert alert-success mt-2">Registrierung erfolgreich!</div>}
                </form>
            )}

            {view === "login" && (
                <form onSubmit={handleLogin} className="mt-4">
                    <h2>Anmelden</h2>
                    <div className="mb-2">
                        <input className="form-control" type="email" placeholder="E-Mail" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
                    </div>
                    <div className="mb-2">
                        <input className="form-control" type="password" placeholder="Passwort" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
                    </div>
                    <button className="btn btn-primary" type="submit">Anmelden</button>
                    <button className="btn btn-link" type="button" onClick={() => setView("")}>Zurück</button>
                    {loginSuccess && <div className="alert alert-success mt-2">Login erfolgreich!</div>}
                </form>
            )}
        </div>
    );
}