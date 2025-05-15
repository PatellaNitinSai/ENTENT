# 🚢 Ship Maintenance Dashboard

A fully responsive, frontend-only Ship Maintenance Management System built with React. This application simulates a real-world ship maintenance system using localStorage and implements role-based access control for Admins, Inspectors, and Engineers.

---

## 📌 Project Overview

This dashboard allows users to:

- Manage ships and their details
- Track and maintain ship components
- Create and monitor maintenance jobs
- Visualize KPIs and overdue items
- Enforce user role-based access control
- Persist all data via localStorage (no backend)

---

## 🚀 Live Demo

🔗 Deployed App: https://patellanitinsai.github.io/login

---

## 🧪 Simulated User Credentials

Use the following credentials to log in:

[
  { "email": "admin@entnt.in", "password": "admin123", "role": "Admin" },
  { "email": "inspector@entnt.in", "password": "inspect123", "role": "Inspector" },
  { "email": "engineer@entnt.in", "password": "engine123", "role": "Engineer" }
]

---

## ⚙️ Setup Instructions

Prerequisites:
- Node.js and npm must be installed on your system

Steps to run locally:

1. Clone the repository
2. Run the following commands:

   npm install
   npm start

App will be available at: http://localhost:3000

---

## 📁 Tech Stack

- React (functional components)
- React Router DOM
- Context API for state management
- Material UI (MUI) for UI components
- LocalStorage for data persistence
- gh-pages for deployment

---

## 📄 Technical Notes

- Role-based access is strictly enforced (e.g., Inspector cannot create/edit)
- HashRouter is used instead of BrowserRouter to support GitHub Pages routing
- Data is saved in localStorage and persists across page reloads
- Forms include basic validation and user feedback using MUI

---

## ⚠️ Known Limitations

- No real backend or secure authentication
- No password recovery, signup, or token-based login
- LocalStorage-based persistence can be cleared by users

---

## 📬 Submission Instructions

Please submit the following to hr@entnt.in:

- Deployed GitHub Pages link
- GitHub Repository link
- This README file

---

Thank you for reviewing my project!
