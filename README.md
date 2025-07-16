# 🌅 SeaVoyager - Fährbuchungssystem

Eine moderne Full-Stack-Fährbuchungsanwendung, entwickelt mit Spring Boot und React. Dieses System ermöglicht es Benutzern, Fährfahrten zu buchen, und Administratoren, Routen, Schiffe und Fährfahrpläne zu verwalten.

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.0-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![H2 Database](https://img.shields.io/badge/Database-H2-lightblue)

## 🚀 Funktionen

### Benutzer-Funktionen
- **Benutzerregistrierung & Authentifizierung**: Sichere Benutzerregistrierung und Anmeldesystem
- **Fährfahrt-Buchung**: Verfügbare Fährfahrten durchsuchen und buchen
- **Buchungsverwaltung**: Persönliche Buchungshistorie mit detaillierten Informationen anzeigen
- **Routeninformationen**: Routen zwischen verschiedenen Häfen anzeigen

### Admin-Funktionen
- **Fährfahrt-Verwaltung**: Fährfahrpläne erstellen und verwalten
- **Routenverwaltung**: Routen zwischen Häfen verwalten
- **Schiffsverwaltung**: Schiffsinformationen und Kapazität verwalten
- **Buchungsübersicht**: Alle Buchungen im System anzeigen

## 🏗️ Architektur

### Backend (Spring Boot)
- **RESTful API** mit umfassenden Endpunkten
- **JPA/Hibernate** für Datenbankoperationen
- **H2-Datenbank** für Datenpersistierung
- **Lombok** zur Reduzierung von Boilerplate-Code
- **CORS-Konfiguration** für Frontend-Integration

### Frontend (React)
- **Modernes React** mit Hooks und funktionalen Komponenten
- **React Router** für Navigation
- **Axios** für API-Kommunikation
- **Bootstrap** für responsives Styling
- **Komponentenbasierte Architektur**

## 📁 Projektstruktur

```
busapp/
├── 📂 src/main/java/de/haw/busapp/
│   ├── 📂 controller/          # REST API Controller
│   │   ├── BookingController.java
│   │   ├── FerryRideController.java
│   │   ├── RouteController.java
│   │   ├── ShipController.java
│   │   └── UserController.java
│   ├── 📂 model/              # JPA Entity-Klassen
│   │   ├── Booking.java
│   │   ├── Cabin.java
│   │   ├── CabinType.java
│   │   ├── FerryRide.java
│   │   ├── Harbor.java
│   │   ├── Route.java
│   │   ├── Ship.java
│   │   └── User.java
│   ├── 📂 repository/         # Datenzugriffsschicht
│   │   ├── BookingRepository.java
│   │   ├── CabinRepository.java
│   │   ├── FerryRideRepository.java
│   │   ├── HarborRepository.java
│   │   ├── RouteRepository.java
│   │   ├── ShipRepository.java
│   │   └── UserRepository.java
│   ├── 📂 service/           # Geschäftslogik-Schicht
│   │   ├── BookingService.java
│   │   └── UserService.java
│   ├── 📂 dto/               # Datenübertragungsobjekte
│   │   ├── BookingResponse.java
│   │   ├── CreateBookingRequest.java
│   │   └── FerryRideRequest.java
│   └── BusappApplication.java # Hauptanwendungsklasse
├── 📂 src/main/resources/
│   └── application.properties # Anwendungskonfiguration
├── 📂 frontend/              # React Frontend
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── AuthForm.js   # Login/Registrierungs-Komponente
│   │   │   └── Dashboard.js  # Haupt-Dashboard-Komponente
│   │   ├── App.js           # Haupt-App-Komponente
│   │   ├── index.js         # React-Einstiegspunkt
│   │   └── index.css        # Globale Styles
│   ├── package.json         # Frontend-Abhängigkeiten
│   └── package-lock.json
├── 📂 data/                 # H2-Datenbankdateien
├── build.gradle            # Build-Konfiguration
└── README.md               # Diese Datei
```

## 🛠️ Installation & Einrichtung

### Voraussetzungen
- **Java 17** oder höher
- **Node.js 16** oder höher
- **npm** oder **yarn**

### Backend-Einrichtung

1. **Repository klonen**
   ```bash
   git clone https://github.com/AyhamJo7/busapp.git
   cd busapp
   ```

2. **Spring Boot-Anwendung erstellen und ausführen**
   ```bash
   # Gradle Wrapper verwenden (empfohlen)
   ./gradlew bootRun
   
   # Oder unter Windows
   gradlew.bat bootRun
   ```

3. **Backend-Betrieb überprüfen**
   - Backend startet auf `http://localhost:8080`
   - H2-Konsole verfügbar unter `http://localhost:8080/h2-console`
   - Datenbank-URL: `jdbc:h2:file:./data/busdb`
   - Benutzername: `sa` (kein Passwort)

### Frontend-Einrichtung

1. **Zum Frontend-Verzeichnis navigieren**
   ```bash
   cd frontend
   ```

2. **Abhängigkeiten installieren**
   ```bash
   npm install
   ```

3. **React-Entwicklungsserver starten**
   ```bash
   npm start
   ```

4. **Anwendung aufrufen**
   - Frontend startet auf `http://localhost:3000`
   - Die Anwendung öffnet sich automatisch in Ihrem Browser

## 🔧 Konfiguration

### Datenbank-Konfiguration
Die Anwendung verwendet H2-Datenbank mit folgender Konfiguration in `application.properties`:

```properties
# Persistente H2-Datenbank
spring.datasource.url=jdbc:h2:file:./data/busdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2-Web-Konsole
spring.h2.console.enabled=true

# Hibernate-Konfiguration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
```

### CORS-Konfiguration
Das Backend ist konfiguriert, um Anfragen vom React-Frontend zu akzeptieren:
```java
registry.addMapping("/api/**").allowedOrigins("http://localhost:3000");
```

## 🌐 API-Endpunkte

### Benutzerverwaltung
- `POST /api/users` - Neuen Benutzer erstellen
- `POST /api/users/login` - Benutzerauthentifizierung

### Buchungsverwaltung
- `GET /api/bookings` - Alle Buchungen abrufen
- `POST /api/bookings` - Neue Buchung erstellen

### Fährfahrt-Verwaltung
- `GET /api/rides` - Alle Fährfahrten abrufen
- `POST /api/rides` - Neue Fährfahrt erstellen (Admin)

### Routenverwaltung
- `GET /api/routes` - Alle Routen abrufen
- `POST /api/routes` - Neue Route erstellen (Admin)

### Schiffsverwaltung
- `GET /api/ships` - Alle Schiffe abrufen
- `POST /api/ships` - Neues Schiff erstellen (Admin)

## 📊 Datenmodell

### Kern-Entitäten

**User (Benutzer)**
- ID, Name, E-Mail, Passwort
- Rolle (USER/ADMIN)
- Eins-zu-Viele-Beziehung mit Buchungen

**Harbor (Hafen)**
- ID, Name, Standort

**Route**
- ID, Ursprungshafen, Zielhafen

**Ship (Schiff)**
- ID, Name, Kapazität
- Eins-zu-Viele-Beziehung mit Kabinen

**FerryRide (Fährfahrt)**
- ID, Route, Schiff, Abfahrtszeit, Ankunftszeit
- Eins-zu-Viele-Beziehung mit Buchungen

**Booking (Buchung)**
- ID, Benutzer, Fährfahrt, Kabine, Buchungsdatum

**Cabin (Kabine)**
- ID, Schiff, Typ (NORMAL_INNEN, NORMAL_BALKON, SUITE), Preis

## 🎨 Benutzeroberfläche

Die Anwendung verfügt über ein modernes, responsives Design mit:
- **Verlaufshintergründe** für visuelle Attraktivität
- **Kartenbasierte Layouts** für Inhaltsorganisation
- **Intuitive Navigation** zwischen Buchungs- und Fahrtverwaltung
- **Rollenbasierte UI** (Admin-Funktionen nur für Administratoren sichtbar)
- **Responsives Design** für Desktop und Mobile

### Hauptkomponenten
- **AuthForm**: Behandelt Benutzerregistrierung und -anmeldung
- **Dashboard**: Hauptanwendungsschnittstelle mit Buchungs- und Fahrtverwaltung

## 🚀 Verwendung

### Für Benutzer
1. **Registrieren/Anmelden**: Konto erstellen oder anmelden
2. **Fahrten durchsuchen**: Verfügbare Fährfahrten anzeigen
3. **Buchung vornehmen**: Fährfahrt auswählen und buchen
4. **Buchungen anzeigen**: Buchungshistorie überprüfen

### Für Administratoren
1. **Als Admin anmelden**: Admin-Anmeldedaten verwenden
2. **Routen verwalten**: Routen zwischen Häfen erstellen
3. **Schiffe hinzufügen**: Neue Schiffe im System registrieren
4. **Fahrten planen**: Fährfahrpläne erstellen
5. **Buchungen überwachen**: Alle Systembuchungen anzeigen

## 🛠️ Entwicklung

### Für Produktion erstellen

**Backend:**
```bash
./gradlew build
java -jar build/libs/busapp-0.0.1-SNAPSHOT.jar
```

**Frontend:**
```bash
cd frontend
npm run build
```

### Testen
```bash
./gradlew test
```


## 👥 Autoren

- **Bashar Ahma** - [BasharAhma](https://github.com/BasharAhma)

---

**Gute Fahrt mit SeaVoyager! 🚢⚓**
