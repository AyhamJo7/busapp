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
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "linear-gradient(to bottom, #caf0f8, #ffffff)",
                fontFamily: "sans-serif",
            }}
        >
            <div
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "15px",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    width: "350px",
                    padding: "30px",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        marginBottom: "20px",
                    }}
                >
                    <button
                        onClick={() => setIsRegistering(true)}
                        style={{
                            flex: 1,
                            backgroundColor: isRegistering ? "#0077b6" : "#90e0ef",
                            color: "#fff",
                            border: "none",
                            borderRadius: "20px 0 0 20px",
                            padding: "10px",
                            cursor: "pointer",
                            transition: "0.3s",
                            fontWeight: "bold",
                        }}
                    >
                        📝 Registrieren
                    </button>
                    <button
                        onClick={() => setIsRegistering(false)}
                        style={{
                            flex: 1,
                            backgroundColor: !isRegistering ? "#0077b6" : "#90e0ef",
                            color: "#fff",
                            border: "none",
                            borderRadius: "0 20px 20px 0",
                            padding: "10px",
                            cursor: "pointer",
                            transition: "0.3s",
                            fontWeight: "bold",
                        }}
                    >
                        🔑 Anmelden
                    </button>
                </div>

                {isRegistering ? (
                    <form onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="👤 Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #0077b6",
                                borderRadius: "10px",
                                outline: "none",
                            }}
                        />
                        <input
                            type="email"
                            placeholder="📧 E-Mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #0077b6",
                                borderRadius: "10px",
                                outline: "none",
                            }}
                        />
                        <input
                            type="password"
                            placeholder="🔒 Passwort"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #0077b6",
                                borderRadius: "10px",
                                outline: "none",
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                backgroundColor: "#0077b6",
                                color: "#fff",
                                border: "none",
                                borderRadius: "10px",
                                padding: "10px",
                                cursor: "pointer",
                                transition: "0.3s",
                                fontWeight: "bold",
                            }}
                        >
                            ✅ Registrieren
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="📧 E-Mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #0077b6",
                                borderRadius: "10px",
                                outline: "none",
                            }}
                        />
                        <input
                            type="password"
                            placeholder="🔒 Passwort"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #0077b6",
                                borderRadius: "10px",
                                outline: "none",
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                backgroundColor: "#0077b6",
                                color: "#fff",
                                border: "none",
                                borderRadius: "10px",
                                padding: "10px",
                                cursor: "pointer",
                                transition: "0.3s",
                                fontWeight: "bold",
                            }}
                        >
                            ✅ Anmelden
                        </button>
                    </form>
                )}
            </div>
        </div>
    );

};

export default AuthForm;
