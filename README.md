# 🏙️ Safe & Smart City – Civic Issue Reporting System

A full-stack web application designed for transparent reporting, tracking, and resolving everyday urban civic grievances (garbage dumps, potholes, non-functional streetlights, water pipeline bursts, fallen trees, and sanitation hazards).

> **Academic Project:** B.Sc. Computer Science Final Year Project  
> **Repository:** [https://github.com/Ankit4210/Ankit_Final_Mini_Project](https://github.com/Ankit4210/Ankit_Final_Mini_Project)

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend** | HTML5 (Semantic Structure), Vanilla CSS3 (Custom Design Tokens), Vanilla JavaScript (ES6+), Leaflet.js 1.9.4 GIS, FontAwesome 6.5.1 |
| **Backend Language & Framework** | Java (Jakarta Servlet 6.0 / JSP), JDK 17+ / Java 25 |
| **Web Server & Container** | Apache Tomcat 10.1+ / 11.0 (Windows Service background deployment) |
| **Database** | MySQL Server 8.0 (`smart_city_db`) |
| **Database Connectivity** | JDBC (`mysql-connector-j-8.3.0.jar`) |
| **Security & Utilities** | BCrypt Password Hashing (`jbcrypt`), Google Gson JSON parsing |

---

## ✨ Key Features

1. **Automatic Geolocation (GPS):** HTML5 Geolocation API auto-captures latitude and longitude. An interactive Leaflet map picker allows manual pin adjustments.
2. **Photo Evidence Pipeline:** Upload before-photos when reporting issues.
3. **Unique Tracking IDs:** Auto-generated tracking codes (e.g. `SSC-2026-8812`) for real-time status tracking.
4. **Live Resolution Stepper:** 5-stage progress indicator:
   `Reported` $\rightarrow$ `Verified` $\rightarrow$ `Team Dispatched` $\rightarrow$ `In Progress` $\rightarrow$ `Resolved & Closed`
5. **Before & After Proof Verification:** Transparent proof comparison showing the original issue and official resolution photo side-by-side.
6. **Community Upvoting Engine:** Citizens can upvote genuine problems to escalate municipal urgency.
7. **Municipal Administration Console:** Dedicated triage dashboard to filter, assign field squads, and resolve complaints with remarks and after-photos.
8. **Civic Karma & Leaderboard:** Citizens earn points and merit badges for active community participation.
9. **Dark / Light Mode:** Native theme switcher with persistent local memory.

---

## 📂 Project Structure

```
collage-mini-project/
├── index.html                    # Main Single Page Application (UI)
├── css/
│   ├── style.css                 # Complete Design System & Theme Tokens
│   └── assets/                   # Image assets & backgrounds
├── js/
│   └── app.js                    # Dual-mode Interactive Engine & API Bridge
├── assets/
│   └── hero-bg.jpg               # Aerial Smart City skyline hero background
└── backend/
    ├── database.sql              # MySQL 8.0 schema & initial seed data
    ├── pom.xml                   # Maven dependencies & build configuration
    ├── SmartCity.war             # Pre-packaged production web archive (10.6 MB)
    ├── BACKEND_SETUP_GUIDE.md    # Detailed Tomcat & MySQL setup guide
    └── src/main/
        ├── java/com/smartcity/   # Servlets, DAOs, Models, and DB utilities
        └── webapp/WEB-INF/       # web.xml deployment descriptor & libraries
```

---

## 🚀 Setup & Execution Guide

### 1. Database Setup (MySQL 8.0)
1. Open MySQL Command Line Client or MySQL Workbench.
2. Run the SQL script to create and populate the database:
   ```sql
   source /path/to/backend/database.sql;
   ```

### 2. Apache Tomcat Deployment
1. Copy `backend/SmartCity.war` into your Tomcat `webapps/` directory:
   ```
   C:\Program Files\Apache Software Foundation\Tomcat 11.0\webapps\
   ```
2. Set your MySQL root password (if set) in your environment:
   ```powershell
   [System.Environment]::SetEnvironmentVariable('SMARTCITY_DB_PASSWORD', 'YOUR_PASSWORD', 'Machine')
   Restart-Service -Name "Tomcat11"
   ```
3. Open your browser and navigate to:
   👉 **http://localhost:8080/SmartCity/**

---

## 📄 License & Academic Attribution
Developed as an academic mini-project for the B.Sc. Computer Science curriculum.
