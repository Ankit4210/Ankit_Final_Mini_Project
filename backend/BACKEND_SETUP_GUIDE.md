# 🚀 Safe & Smart City – Backend & Apache Tomcat Setup Guide

This guide walks you through setting up the complete Java Servlet backend, MySQL 8.0 database, and Apache Tomcat 10.1 as an automatic **Windows Service** (running 24/7 in the background).

---

## 📦 What is Included in this Project

1. **`backend/SmartCity.war`** (10.6 MB)
   - Pre-packaged, production-ready Java Web Archive.
   - Bundles all Jakarta Servlets, JDBC Driver (`mysql-connector-j-8.3.0.jar`), BCrypt, Gson, and your **Fresh Frontend UI**.
2. **`backend/database.sql`**
   - Full MySQL 8.0 schema: `smart_city_db` with all tables (`users`, `reports`, `categories`, `resolutions`, `upvotes`).
3. **`backend/src/main/java/`**
   - Clean, modular Java source code: Servlets, DAOs, Models, and `DBUtil`.

---

## 🛠️ Step 1: MySQL Database Setup

1. Open **MySQL Command Line Client** or **MySQL Workbench** from your Windows Start Menu.
2. Enter your MySQL `root` password.
3. Run the following command to import the database:
   ```sql
   source C:/Users/DIVYA YADAV/OneDrive/Desktop/Ankit New project/backend/database.sql;
   ```
   *(Or open `database.sql` in MySQL Workbench and click the Execute lightning bolt icon).*
4. Verify the database:
   ```sql
   SHOW DATABASES;
   USE smart_city_db;
   SHOW TABLES;
   ```
   You should see 8 tables: `users`, `categories`, `reports`, `resolutions`, `upvotes`, `feedback`, `notifications`, `activity_logs`.

---

## ☕ Step 2: Download & Install Apache Tomcat 10 (Windows Service)

Because our project uses **Jakarta EE 10 / Servlet 6.0** (Java 17+), you need **Apache Tomcat 10.1**:

1. Go to the official Apache Tomcat 10 download page:
   👉 **https://tomcat.apache.org/download-100.cgi**
2. Under **"Binary Distributions"** $\rightarrow$ **"Core"**, click on:
   👉 **32-bit/64-bit Windows Service Installer** (e.g. `apache-tomcat-10.1.x.exe`).
3. Run the installer:
   - Click **Next** $\rightarrow$ **I Agree**.
   - Under Components, make sure **"Service Startup"** is checked (this makes it run automatically in Windows background).
   - Set HTTP Port to `8080` (default).
   - It will automatically detect your installed Java (`Java 25` is already installed on your PC).
   - Install location (usually `C:\Program Files\Apache Software Foundation\Tomcat 10.1`).
   - Click **Install** $\rightarrow$ **Finish**.

---

## 🚢 Step 3: Deploy `SmartCity.war` into Tomcat

1. Open File Explorer and navigate to your Tomcat installation folder:
   ```
   C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\
   ```
2. Copy the file:
   ```
   C:\Users\DIVYA YADAV\OneDrive\Desktop\Ankit New project\backend\SmartCity.war
   ```
3. Paste it directly into the `webapps` folder:
   ```
   C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\SmartCity.war
   ```
4. Tomcat will automatically detect the file and unpack it within 5-10 seconds!

---

## 🔑 Step 4: Configure MySQL Password in Tomcat (If your MySQL has a password)

If your MySQL `root` user has a password:

1. Open **Windows Services**:
   - Press `Win + R`, type `services.msc`, and press **Enter**.
   - Find **Apache Tomcat 10.1**.
2. Alternatively, set an environment variable:
   - Open PowerShell as Administrator and run:
     ```powershell
     [System.Environment]::SetEnvironmentVariable('SMARTCITY_DB_PASSWORD', 'YOUR_MYSQL_PASSWORD', 'Machine')
     ```
   - Restart the Tomcat service:
     ```powershell
     Restart-Service -Name "Tomcat10"
     ```

---

## 🌐 Step 5: Open and Test Your Live System

Open your browser and navigate to:
👉 **http://localhost:8080/SmartCity/**

- The brand new **Smart City Frontend** will load directly from Apache Tomcat!
- All complaint submissions, GPS coordinates, upvotes, and admin triage actions will now save permanently into your live **MySQL database** via **JDBC**!
