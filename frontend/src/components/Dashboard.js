import React, { useState } from "react";
import axios from "axios";

export default function Dashboard() {
    const [bookings, setBookings] = useState([]);
    const [showBookings, setShowBookings] = useState(false);
    const [loadingBookings, setLoadingBookings] = useState(false);

    const [rides, setRides] = useState([]);
    const [showRides, setShowRides] = useState(false);
    const [loadingRides, setLoadingRides] = useState(false);

    // State für das Fahrten-Hinzufügen-Formular
    const [newRide, setNewRide] = useState({ fahrtName: "", datum: "" });
    const [addSuccess, setAddSuccess] = useState(false);

    const [userRole, setUserRole] = useState(null);

    React.useEffect(() => {
        const role = localStorage.getItem("userRole");
        setUserRole(role); // z. B. ADMIN oder USER
    }, []);

    const handleAddRide = async (e) => {
        e.preventDefault();

        const payload = {
            routeId: parseInt(newRide.routeId),
            shipId: parseInt(newRide.shipId),
            departureTime: newRide.departureTime + ":00", // Sekunden ergänzen
            arrivalTime: newRide.arrivalTime + ":00"
        };

        console.log("Neuer Ride Payload:", payload); // 👈 Debuggen

        try {
            await axios.post("/api/rides", payload);
            setAddSuccess(true);
            setNewRide({ routeId: "", shipId: "", departureTime: "", arrivalTime: "" });
        } catch (err) {
            if (err.response) {
                console.error("Backend-Fehler:", err.response.status, err.response.data);
                alert(`Fehler ${err.response.status}: ${err.response.data.message || "Fahrt konnte nicht hinzugefügt werden."}`);
            } else {
                console.error("Netzwerk-/Client-Fehler:", err);
                alert("Netzwerkproblem oder Server nicht erreichbar.");
            }
            setAddSuccess(false);
        }
    };


    const handleShowBookings = async () => {
        setShowRides(false);
        setShowBookings(true);
        setLoadingBookings(true);
        try {
            const res = await axios.get("/api/bookings");
            setBookings(res.data);
        } catch {
            setBookings([]);
        }
        setLoadingBookings(false);
    };

    const handleShowRides = async () => {
        setShowBookings(false);
        setShowRides(true);
        setLoadingRides(true);
        try {
            const res = await axios.get("/api/rides");
            console.log("Rides geladen:", res.data);
            setRides(res.data);
        } catch {
            setRides([]);
        }
        setLoadingRides(false);
    };

    return (
        <div>
            <h2>Willkommen im Dashboard!</h2>
            <button onClick={handleShowBookings}>Meine Buchungen</button>
            <button onClick={handleShowRides}>Fahrt buchen</button>

            {showBookings && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Meine Buchungen</h3>
                    {loadingBookings ? (
                        <div>Lade Buchungen...</div>
                    ) : bookings.length === 0 ? (
                        <div>Keine Buchungen vorhanden.</div>
                    ) : (
                        <ul>
                            {bookings.map(b => (
                                <li key={b.id}>
                                    {b.fahrtName} am {b.datum}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {showRides && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Verfügbare Fahrten</h3>
                    {loadingRides ? (
                        <div>Lade Fahrten...</div>
                    ) : rides.length === 0 ? (
                        <div>Keine Fahrten verfügbar.</div>
                    ) : (
                        <ul>
                            {rides.map(r => (
                                <li key={r.id}>
                                    Fahrt #{r.id}: {r.departureTime} → {r.arrivalTime}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {userRole === "ADMIN" && (
                <div style={{ marginTop: "30px" }}>
                    <h3>Neue Fahrt hinzufügen (nur Admin)</h3>
                    <form onSubmit={handleAddRide}>
                        {/* Route auswählen */}
                        <select
                            value={newRide.routeId}
                            onChange={e => setNewRide({ ...newRide, routeId: e.target.value })}
                            required
                        >
                            <option value="">Route wählen</option>
                            <option value="1">Route 1</option>
                            <option value="2">Route 2</option>
                            {/* Optional: dynamisch aus API laden */}
                        </select>

                        {/* Ship auswählen */}
                        <select
                            value={newRide.shipId}
                            onChange={e => setNewRide({ ...newRide, shipId: e.target.value })}
                            required
                        >
                            <option value="">Schiff wählen</option>
                            <option value="1">Schiff A</option>
                            <option value="2">Schiff B</option>
                            {/* Optional: dynamisch aus API laden */}
                        </select>

                        {/* Abfahrtszeit */}
                        <input
                            type="datetime-local"
                            value={newRide.departureTime}
                            onChange={e => setNewRide({ ...newRide, departureTime: e.target.value })}
                            required
                        />

                        {/* Ankunftszeit */}
                        <input
                            type="datetime-local"
                            value={newRide.arrivalTime}
                            onChange={e => setNewRide({ ...newRide, arrivalTime: e.target.value })}
                            required
                        />

                        <button type="submit">Hinzufügen</button>
                    </form>

                    {addSuccess && <div>Fahrt erfolgreich hinzugefügt!</div>}
                </div>
            )}
        </div>
    );
}