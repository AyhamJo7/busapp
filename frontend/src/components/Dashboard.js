import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    
    const [bookings, setBookings] = useState([]);
    const [showBookings, setShowBookings] = useState(false);
    const [loadingBookings, setLoadingBookings] = useState(false);

    const [rides, setRides] = useState([]);
    const [showRides, setShowRides] = useState(false);
    const [loadingRides, setLoadingRides] = useState(false);

    const [ships, setShips] = useState([]); // 🆕 Liste aller Schiffe
    const [routes, setRoutes] = useState([]); // 🆕 Liste aller Routen

    const [newRide, setNewRide] = useState({ routeId: "", shipId: "", departureTime: "", arrivalTime: "" });
    const [addSuccess, setAddSuccess] = useState(false);

    const [userRole, setUserRole] = useState(null);
    const [selectedRideId, setSelectedRideId] = useState("");

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setUserRole(role); // z. B. ADMIN oder USER

        // 🆕 Schiffe und Routen beim Laden holen
        fetchAllShips();
        fetchAllRoutes();
    }, []);

    // 🆕 Alle Schiffe laden
    const fetchAllShips = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/ships");
            if (response.ok) {
                const data = await response.json();
                setShips(data);
            } else {
                console.error("Fehler beim Laden der Schiffe:", response.status);
            }
        } catch (error) {
            console.error("Netzwerk-/Client-Fehler beim Laden der Schiffe:", error);
        }
    };

    // 🆕 Alle Routen laden
    const fetchAllRoutes = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/routes");

            console.log("fetchAllRoutes()", response); // Debugging
            if (response.ok) {
                const data = await response.json();
                setRoutes(data);
            } else {
                console.error("Fehler beim Laden der Routen:", response.status);
            }
        } catch (error) {
            console.error("Netzwerk-/Client-Fehler beim Laden der Routen:", error);
        }
    };

    // Fahrt hinzufügen
    const handleAddRide = async (e) => {
        e.preventDefault();

        const payload = {
            routeId: parseInt(newRide.routeId),
            shipId: parseInt(newRide.shipId),
            departureTime: newRide.departureTime + ":00", // Sekunden ergänzen
            arrivalTime: newRide.arrivalTime + ":00",
        };

        console.log("Neuer Ride Payload:", payload); // 👈 Debuggen

        try {
            const response = await fetch("http://localhost:8080/api/rides", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Fahrt erfolgreich hinzugefügt!");
                setAddSuccess(true);
                setNewRide({ routeId: "", shipId: "", departureTime: "", arrivalTime: "" });
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error("Backend-Fehler:", response.status, errorData);
                alert(`Fehler ${response.status}: ${errorData.message || "Fahrt konnte nicht hinzugefügt werden."}`);
                setAddSuccess(false);
            }
        } catch (error) {
            console.error("Netzwerk-/Client-Fehler:", error);
            alert("Netzwerkproblem oder Server nicht erreichbar.");
            setAddSuccess(false);
        }
    };

    // Buchungen laden
    const handleShowBookings = async () => {
        setShowRides(false);
        setShowBookings(true);
        setLoadingBookings(true);

        try {
            const response = await fetch("http://localhost:8080/api/bookings");
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            } else {
                console.error("Fehler beim Laden der Buchungen:", response.status);
                setBookings([]);
            }
        } catch (error) {
            console.error("Netzwerk-/Client-Fehler beim Laden der Buchungen:", error);
            setBookings([]);
        }
        setLoadingBookings(false);
    };

    // Fahrten laden
    const handleShowRides = async () => {
        setShowBookings(false);
        setShowRides(true);
        setLoadingRides(true);

        try {
            const response = await fetch("http://localhost:8080/api/rides");
            if (response.ok) {
                const data = await response.json();
                console.log("Rides geladen:", data);
                setRides(data);
            } else {
                console.error("Fehler beim Laden der Rides:", response.status);
                setRides([]);
            }
        } catch (error) {
            console.error("Netzwerk-/Client-Fehler beim Laden der Rides:", error);
            setRides([]);
        }
        setLoadingRides(false);
    };

    const handleCreateBooking = async () => {
        if (!selectedRideId) {
            alert("Bitte wähle eine Fahrt aus.");
            return;
        }

        // Get userId from localStorage or use a default value for testing
        const userId = localStorage.getItem("userId") || "1"; // Default to user ID 1 for testing
        
        const bookingData = {
            userId: parseInt(userId),
            ferryRideId: parseInt(selectedRideId), // Backend expects ferryRideId, not rideId
            bookingDate: new Date().toISOString() // Current date/time
        };

        console.log("Booking data:", bookingData); // Debug log

        try {
            const response = await fetch("http://localhost:8080/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                alert("Buchung erfolgreich erstellt!");
                setSelectedRideId(""); // Reset Auswahl
                // Refresh bookings if they are currently shown
                if (showBookings) {
                    handleShowBookings();
                }
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error("Backend error:", response.status, errorData);
                alert(`Fehler ${response.status}: ${errorData.message || "Buchung fehlgeschlagen."}`);
            }
        } catch (error) {
            console.error("Netzwerk-/Client-Fehler:", error);
            alert("Netzwerkproblem oder Server nicht erreichbar.");
        }
    };
    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem("userID");
        localStorage.removeItem("userRole");

        navigate("/");
    };

    return (
        <div
            style={{
                fontFamily: "sans-serif",
                background: "linear-gradient(to bottom, #e0f7fa, #ffffff)",
                minHeight: "100vh",
                padding: "20px",
                color: "#023047",
            }}
        >
            {/* Logout button in top-right corner */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                <button
                    onClick={handleLogout}
                    style={{
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "20px",
                        padding: "8px 16px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        cursor: "pointer",
                        transition: "0.3s",
                        fontSize: "14px",
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#c82333"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#dc3545"}
                >
                    ⏻ Abmelden
                </button>
            </div>

            <h1 style={{ textAlign: "center", color: "#0077b6" }}>
                🚢 FerryBooking
            </h1>

            <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "30px" }}>
                <button
                    onClick={handleShowBookings}
                    style={{
                        backgroundColor: showBookings ? "#0077b6" : "#90e0ef",
                        color: "#fff",
                        border: "none",
                        borderRadius: "20px",
                        padding: "10px 20px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        cursor: "pointer",
                        transition: "0.3s",
                    }}
                >
                    📖 Meine Buchungen
                </button>
                <button
                    onClick={handleShowRides}
                    style={{
                        backgroundColor: showRides ? "#0077b6" : "#90e0ef",
                        color: "#fff",
                        border: "none",
                        borderRadius: "20px",
                        padding: "10px 20px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        cursor: "pointer",
                        transition: "0.3s",
                    }}
                >
                    🚤 Fahrt buchen
                </button>
            </div>

            {showBookings && (
                <div
                    style={{
                        backgroundColor: "#caf0f8",
                        borderRadius: "10px",
                        padding: "20px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        marginBottom: "20px",
                    }}
                >
                    <h3 style={{ color: "#0077b6" }}>📖 Meine Buchungen</h3>
                    {loadingBookings ? (
                        <div>⏳ Lade Buchungen...</div>
                    ) : bookings.length === 0 ? (
                        <div>❌ Keine Buchungen vorhanden.</div>
                    ) : (
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {bookings.map(b => {
                                // Format the booking date
                                const bookingDate = new Date(b.bookingDate).toLocaleDateString('de-DE', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });
                                
                                // Format departure time
                                const departureTime = new Date(b.ferryRide.departureTime).toLocaleDateString('de-DE', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });

                                return (
                                    <li
                                        key={b.id}
                                        style={{
                                            backgroundColor: "#ffffff",
                                            borderRadius: "8px",
                                            padding: "15px",
                                            margin: "8px 0",
                                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                        }}
                                    >
                                        <div style={{ marginBottom: "8px", fontWeight: "bold", color: "#0077b6" }}>
                                            🛳 {b.ferryRide.route.originHarbor.name} ➡ {b.ferryRide.route.destinationHarbor.name}
                                        </div>
                                        <div style={{ fontSize: "14px", color: "#666" }}>
                                            🚢 Schiff: {b.ferryRide.ship.name}
                                        </div>
                                        <div style={{ fontSize: "14px", color: "#666" }}>
                                            🕒 Abfahrt: {departureTime}
                                        </div>
                                        <div style={{ fontSize: "14px", color: "#666" }}>
                                            📅 Gebucht am: {bookingDate}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            )}

            {showRides && (
                <div
                    style={{
                        backgroundColor: "#caf0f8",
                        borderRadius: "10px",
                        padding: "20px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3 style={{ color: "#0077b6" }}>🚤 Verfügbare Fahrten</h3>
                    {loadingRides ? (
                        <div>⏳ Lade Fahrten...</div>
                    ) : rides.length === 0 ? (
                        <div>❌ Keine Fahrten verfügbar.</div>
                    ) : (
                        <>
                            <select
                                value={selectedRideId}
                                onChange={e => setSelectedRideId(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    margin: "10px 0",
                                    borderRadius: "8px",
                                    border: "1px solid #0077b6",
                                }}
                            >
                                <option value="">⚓ Fahrt auswählen</option>
                                {rides.map(r => (
                                    <option key={r.id} value={r.id}>
                                        {r.route.originHarbor.name} ➡ {r.route.destinationHarbor.name} | 🕒 {r.departureTime} → {r.arrivalTime} | 🚢 {r.ship.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleCreateBooking}
                                style={{
                                    backgroundColor: "#0077b6",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "20px",
                                    padding: "10px 20px",
                                    cursor: "pointer",
                                    transition: "0.3s",
                                }}
                            >
                                ✅ Fahrt buchen
                            </button>
                        </>
                    )}
                </div>
            )}

            {userRole === "ADMIN" && (
                <div
                    style={{
                        backgroundColor: "#ffe5ec",
                        borderRadius: "10px",
                        padding: "20px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        marginTop: "30px",
                    }}
                >
                    <h3 style={{ color: "#d00000" }}>⚙️ Neue Fahrt hinzufügen (Admin)</h3>
                    <form onSubmit={handleAddRide}>
                        <select
                            value={newRide.routeId}
                            onChange={e => setNewRide({ ...newRide, routeId: e.target.value })}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                borderRadius: "8px",
                                border: "1px solid #d00000",
                            }}
                        >
                            <option value="">⚓ Route wählen</option>
                            {routes.map(route => (
                                <option key={route.id} value={route.id}>
                                    {route.originHarbor.name} ➡ {route.destinationHarbor.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={newRide.shipId}
                            onChange={e => setNewRide({ ...newRide, shipId: e.target.value })}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                borderRadius: "8px",
                                border: "1px solid #d00000",
                            }}
                        >
                            <option value="">🚢 Schiff wählen</option>
                            {ships.map(ship => (
                                <option key={ship.id} value={ship.id}>
                                    {ship.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="datetime-local"
                            value={newRide.departureTime}
                            onChange={e => setNewRide({ ...newRide, departureTime: e.target.value })}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                borderRadius: "8px",
                                border: "1px solid #d00000",
                            }}
                        />

                        <input
                            type="datetime-local"
                            value={newRide.arrivalTime}
                            onChange={e => setNewRide({ ...newRide, arrivalTime: e.target.value })}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                margin: "10px 0",
                                borderRadius: "8px",
                                border: "1px solid #d00000",
                            }}
                        />

                        <button
                            type="submit"
                            style={{
                                backgroundColor: "#d00000",
                                color: "#fff",
                                border: "none",
                                borderRadius: "20px",
                                padding: "10px 20px",
                                cursor: "pointer",
                                transition: "0.3s",
                            }}
                        >
                            ➕ Hinzufügen
                        </button>
                    </form>
                    {addSuccess && (
                        <div style={{ color: "green", marginTop: "10px" }}>
                            ✅ Fahrt erfolgreich hinzugefügt!
                        </div>
                    )}
                </div>
            )}
        </div>
    );

}
