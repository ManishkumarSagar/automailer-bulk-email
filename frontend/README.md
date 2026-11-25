📧 AutoMailer – Bulk Email Automation
📝 Overview
AutoMailer is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to automate bulk email campaigns. Managing hundreds of emails manually is time-consuming and prone to errors.

AutoMailer simplifies this by allowing users to import contacts directly from Excel/CSV files, create reusable email templates with dynamic placeholders (like {{name}}), and schedule campaigns. To ensure the server doesn't crash during large email blasts, it uses a Redis-backed BullMQ queue to process and send emails in the background, while tracking the status of every single email (Sent, Pending, Failed) in real-time.

✨ Key Features
Secure Authentication: JWT-based user registration and login system.

Bulk Contact Import: Drag-and-drop file upload (supports .csv, .xlsx, .xls) with automatic parsing and validation.

Dynamic Personalization: Write one email template, and the system automatically replaces placeholders like {{name}} and {{company}} with actual data from the contact list.

Background Processing (Queues): Uses BullMQ + Redis to handle email sending in the background. This prevents server timeouts and allows processing emails in controlled batches.

Automated Email Delivery: Integrates Nodemailer to send emails via any SMTP provider (like Gmail, SendGrid, Mailtrap).

Real-Time Analytics: A dashboard that displays live counts of Total Campaigns, Emails Sent, Emails Pending, and Emails Failed.

Campaign History: Track the status of all past and ongoing campaigns.

🛠️ Technology Stack
Frontend:

React.js (Vite): For a fast, dynamic user interface.

React Router DOM: For seamless client-side routing.

Axios: To handle REST API requests to the backend.

React Dropzone: For a smooth drag-and-drop file upload experience.

React Icons: For a clean and modern UI.

Backend:

Node.js & Express.js: For building the RESTful API server.

MongoDB & Mongoose: NoSQL database to store users, contacts, campaigns, and email logs.

Multer: Middleware for handling multipart/form-data file uploads.

csv-parse & xlsx: To parse CSV and Excel files into structured JSON.

BullMQ & Redis: For creating delayed jobs, background queues, and reliable email delivery.

Nodemailer: For sending transactional emails via SMTP.

JWT & bcryptjs: For secure authentication and password hashing.

🚀 How It Works (Workflow)
Authentication: The user securely logs into the dashboard.

Import: The user uploads an Excel/CSV file containing candidate or client details (Name, Email, Company, Position).

Template: The user creates a campaign, selects the imported contacts, and writes a subject and body using placeholders like Hello {{name}}.

Queue: Upon scheduling, the backend creates individual jobs for every contact in the Redis Queue.

Delivery: The background worker picks up the jobs, replaces the placeholders with actual contact data, sends the email via Nodemailer, and updates the database status.

Analytics: The user monitors the delivery status (Sent/Pending/Failed) on the Dashboard.

🎯 Use Cases
HR & Recruitment: Sending bulk interview invitations or offer letters to candidates.

Marketing: Sending personalized product updates or newsletters to opted-in clients.

Education: Sending course announcements or results to students.

Event Management: Sending registration confirmations and reminders.