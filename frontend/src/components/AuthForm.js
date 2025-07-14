import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
    const [isRegistering, setIsRegistering] = useState(true);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Für Weiterleitung nach Login

    // Registrierung
    const handleRegister = async (e) => {
        e.preventDefault();

        const registerPayload = {
            name,
            email,
            password
        };

        try {
            const response = await fetch("http://localhost:8080/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerPayload),
            });

            if (response.ok) {
                alert("Registrierung erfolgreich!");
                navigate("/login");
            } else {
                alert("Registrierung fehlgeschlagen");
            }
        } catch (error) {
            console.error("Fehler bei der Registrierung:", error);
            alert("Technischer Fehler bei der Registrierung.");
        }
    };


    // Login
    const handleLogin = async (e) => {
        e.preventDefault();

        const loginPayload = {
            email,
            password,
        };

        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginPayload),
            });

            if (response.ok) {
                const result = await response.json(); // 👈 JSON parsen

                // 👇 Rolle und User-ID speichern
                localStorage.setItem("userRole", result.role); // z.B. "ADMIN"
                localStorage.setItem("userId", result.id);

                alert("Login erfolgreich!");
                navigate("/dashboard");
            } else {
                alert("Login fehlgeschlagen: Falsche E-Mail oder Passwort");
            }
        } catch (error) {
            console.error("Fehler beim Login:", error);
            alert("Technischer Fehler beim Login.");
        }
    };



    return (
        <div className="auth-container">
            <div className="tabs">
                <button
                    className={isRegistering ? "active" : ""}
                    onClick={() => setIsRegistering(true)}
                >
                    Registrieren
                </button>
                <button
                    className={!isRegistering ? "active" : ""}
                    onClick={() => setIsRegistering(false)}
                >
                    Anmelden
                </button>
            </div>

            {isRegistering ? (
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="E-Mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Passwort"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Registrieren</button>
                </form>
            ) : (
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="E-Mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Passwort"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Anmelden</button>
                </form>
            )}
        </div>
    );
};

export default AuthForm;
