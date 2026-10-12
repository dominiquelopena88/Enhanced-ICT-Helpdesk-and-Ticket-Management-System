# Enhanced ICT Helpdesk and Ticket Management System

## 1. Project Overview

The Enhanced ICT Helpdesk and Ticket Management System is a web-based application designed to help organisations manage IT support requests efficiently. It provides a central platform for employees to submit and track tickets and for authorised administrators and technicians to manage support activities.

### Project Objectives
- Centralise IT support requests and ticket records.
- Provide user authentication and role-based access control.
- Support ticket tracking and management.
- Improve the organisation of technical support activities.
- Explore automated ticket classification and technician assignment.

### Feature List
- User registration and login.
- JWT-based authentication, where configured.
- Role-based access control (RBAC).
- Employee ticket submission and tracking.
- Administrative user and technician management.
- Ticket classification and technician matching, where implemented.
- Chat and SMS support, where implemented.

> Features should be marked as completed only when they are implemented and verified in the final codebase.

## 2. Prerequisites and Technologies

### Prerequisites
- Node.js and npm
- MySQL Server
- Visual Studio Code (recommended)
- Git
- A modern web browser

### Technologies
- **Frontend:** HTML, CSS and JavaScript
- **Backend:** Node.js and Express.js
- **Database:** MySQL
- **Authentication:** JSON Web Tokens (JWT), where configured
- **Version Control:** Git and GitHub

Development versions previously used:
- Node.js 24.19.0
- Express.js 5.2.1
- MySQL 8.4.11

Check installed versions:

```bash
node --version
npm --version
mysql --version
```

## 3. Repository Structure

GitHub repository:  
https://github.com/dominiquelopena88/Enhanced-ICT-Helpdesk-and-Ticket-Management-System

The following is an indicative structure. Refer to the actual repository for the complete file layout.

```text
Enhanced-ICT-Helpdesk-and-Ticket-Management-System/
├── backend/
│   ├── src/
│   │   └── app.js
│   ├── package.json
│   └── .env
├── index.html
├── style.css
├── app.js
├── README.md
└── .gitignore
```

### Main Files
- `backend/src/app.js` — backend application entry point, if configured.
- `backend/package.json` — backend dependencies and scripts.
- `index.html` — frontend page structure.
- `style.css` — frontend styling.
- `app.js` — frontend interactions and API requests.
- `.env` — local environment configuration.
- `.gitignore` — excludes sensitive and unnecessary files from version control.

## 4. Installation and Environment Configuration

### Step 1: Clone the Repository

```bash
git clone https://github.com/dominiquelopena88/Enhanced-ICT-Helpdesk-and-Ticket-Management-System.git
cd Enhanced-ICT-Helpdesk-and-Ticket-Management-System
```

### Step 2: Install Dependencies

```bash
cd backend
npm install
```

If a `package-lock.json` is available, `npm ci` can be used for a clean dependency installation.

### Step 3: Configure Environment Variables

Create a `.env` file in the backend directory if required by the application.

Example configuration:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=ict_helpdesk
JWT_SECRET=replace_with_a_secure_random_secret
```

Replace the example values with your local configuration. Confirm the required variable names against the source code. Never commit real passwords, secrets or credentials to GitHub.

## 5. Database Setup and Schema Instructions

### Step 1: Start MySQL

Ensure the MySQL server is running and accessible.

### Step 2: Create the Database

Connect through MySQL Workbench or the MySQL command-line client and run:

```sql
CREATE DATABASE IF NOT EXISTS ict_helpdesk;
USE ict_helpdesk;
```

Use the database name configured in your application if it differs.

### Step 3: Create the Schema

Execute the project's SQL schema or migration files, if available, to create the required tables and relationships.

Verify the database tables:

```sql
SHOW TABLES;
```

If the ticket table is named `tickets`, inspect its records using:

```sql
SELECT * FROM tickets;
```

Replace the table name with the actual name in your database schema.

### Step 4: Verify the Connection

Start the backend and check the terminal for database connection errors. Confirm that the database name, username, password and port match your configuration.

**Note:** Creating the database does not create the application tables. Use the actual schema or migration files supplied by the project.

## 6. Starting the Backend and Frontend

### Start the Backend

From the project root:

```bash
cd backend
node src/app.js
```

This assumes `backend/src/app.js` is the configured entry point. If a start script is defined in `package.json`, you may instead use:

```bash
npm start
```

Check the terminal for a successful startup message. The backend is expected to use port `3000` unless configured otherwise.

### Start the Frontend

If the frontend consists of static files, open `index.html` in a browser or use the VS Code Live Server extension.

If the frontend has its own `package.json`, follow the scripts defined there.

### Access the Application

Open the URL provided by your frontend server. The backend may be accessible at:

```text
http://localhost:3000
```

Confirm the actual frontend URL, backend URL and API routes in the project configuration.

## 7. Testing Instructions and Verification Steps

Run the application and test the main workflows. Record the actual results before marking tests as passed.

| Test | Verification procedure | Expected result |
|---|---|---|
| Backend startup | Run the backend start command | Server starts without fatal errors |
| Frontend loading | Open the frontend in a browser | Page and assets load correctly |
| Valid login | Enter valid credentials | User can sign in |
| Invalid login | Enter incorrect credentials | Access is rejected |
| Ticket submission | Submit a ticket, if implemented | Ticket is saved successfully |
| Ticket record | Inspect the database | Saved ticket data is present |
| Role-based access | Attempt an admin-only action as an employee | Backend denies unauthorised access |
| Administrator access | Sign in with an authorised admin account | Permitted admin functions are available |
| Protected API | Send a request without a valid token | API rejects the unauthorised request |

### Testing Evidence

Useful screenshots include:
- Backend startup in the terminal.
- Login page and login request in browser DevTools.
- Ticket records in MySQL Workbench.
- Ticket submission and tracking.
- An employee being denied access to an administrator-only resource.

Only report a test as passed when the result has been observed and recorded.

## 8. Known Issues and Limitations

- Login and API requests may require further troubleshooting if the frontend and backend routes are not aligned.
- A frontend JavaScript filename mismatch, such as requesting `apps.js` instead of `app.js`, may prevent login interactions from working.
- Database functionality depends on correct MySQL configuration and the availability of the required schema.
- Advanced features such as AI-based classification, automated technician matching, chat and SMS depend on their actual implementation and configuration.
- The development version may not include production-grade hosting, high availability, automated backups or monitoring.
- Security testing is required to confirm that protected routes enforce authentication and role permissions on the backend.

Update this section when issues are resolved or new limitations are identified.

## 9. Contributors

This project was developed as part of an academic software development project.

**Project:** Enhanced ICT Helpdesk and Ticket Management System

**Repository:**  
https://github.com/dominiquelopena88/Enhanced-ICT-Helpdesk-and-Ticket-Management-System

Add the names of all group members and their respective contributions here, ensuring they reflect the actual work completed.

## 10. Maintenance and Future Improvements

Potential improvements include:
- Resolve and retest login and API integration issues.
- Strengthen authentication and backend authorisation.
- Expand unit, integration and user acceptance testing.
- Improve input validation and error handling.
- Add automated testing and database backup procedures.
- Complete and verify planned classification, assignment and notification features.
- Improve deployment configuration and production monitoring.

Regularly review dependencies, maintain backups, protect credentials and document changes to keep the system secure and maintainable.
