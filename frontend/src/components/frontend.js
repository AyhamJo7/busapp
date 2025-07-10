// Frontend.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Frontend() {
    // States für Benutzerregistrierung
    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regSuccess, setRegSuccess] = useState(false);

    // States für Buchung
    const [users, setUsers] = useState([]);
    const [ferryRides, setFerryRides] = useState([]);
    const [cabins, setCabins] = useState([]);
    const [bookingUser, setBookingUser] = useState("");
    const [bookingFerryRide, setBookingFerryRide] = useState("");
    const [bookingCabin, setBookingCabin] = useState("");
    const [bookingSuccess, setBookingSuccess] = useState(false);

    // Daten laden
    useEffect(() => {
        axios.get("/api/users").then(res => setUsers(res.data));
        axios.get("/api/ferryrides").then(res => setFerryRides(res.data));
        axios.get("/api/cabins").then(res => setCabins(res.data));
    }, []);

    // Benutzerregistrierung
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

    // Buchung absenden
    const handleBooking = async e => {
        e.preventDefault();
        try {
            await axios.post("/api/bookings", {
                userId: bookingUser,
                ferryRideId: bookingFerryRide,
                cabinId: bookingCabin,
                bookingDate: new Date().toISOString()
            });
            setBookingSuccess(true);
            setBookingUser("");
            setBookingFerryRide("");
            setBookingCabin("");
        } catch {
            setBookingSuccess(false);
            alert("Buchung fehlgeschlagen!");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Benutzerregistrierung</h2>
            <form onSubmit={handleRegister} className="mb-4">
                <div className="mb-2">
                    <input className="form-control" placeholder="Name" value={regName} onChange={e => setRegName(e.target.value)} required />
                </div>
                <div className="mb-2">
                    <input className="form-control" type="email" placeholder="E-Mail" value={regEmail} onChange={e => setRegEmail(e.target.value)} required />
                </div>
                <div className="mb-2">
                    <input className="form-control" type="password" placeholder="Passwort" value={regPassword} onChange={e => setRegPassword(e.target.value)} required />
                </div>
                <button className="btn btn-primary" type="submit">Registrieren</button>
                {regSuccess && <div className="alert alert-success mt-2">Registrierung erfolgreich!</div>}
            </form>

            <h2>Buchung</h2>
            <form onSubmit={handleBooking} className="mb-4">
                <div className="mb-2">
                    <select className="form-select" value={bookingUser} onChange={e => setBookingUser(e.target.value)} required>
                        <option value="">Benutzer wählen</option>
                        {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
                    </select>
                </div>
                <div className="mb-2">
                    <select className="form-select" value={bookingFerryRide} onChange={e => setBookingFerryRide(e.target.value)} required>
                        <option value="">Fahrt wählen</option>
                        {ferryRides.map(f => <option key={f.id} value={f.id}>{f.route?.name} ({f.departureTime})</option>)}
                    </select>
                </div>
                <div className="mb-2">
                    <select className="form-select" value={bookingCabin} onChange={e => setBookingCabin(e.target.value)} required>
                        <option value="">Kabine wählen</option>
                        {cabins.map(c => <option key={c.id} value={c.id}>{c.type} ({c.price} €)</option>)}
                    </select>
                </div>
                <button className="btn btn-success" type="submit">Buchen</button>
                {bookingSuccess && <div className="alert alert-success mt-2">Buchung erfolgreich!</div>}
            </form>
        </div>
    );
}