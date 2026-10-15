# 🍽️ PARADISE Cafe & Fine Dining — MERN Stack Web Application

A full-stack luxury restaurant web application and management platform built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Developed as a capstone project for Full Stack Development.

---

## 🌟 Key Features

### 👤 Guest & Customer Features
- **Modern Responsive Design**: Dark aesthetic with gold accents, smooth animations, and luxury typography.
- **Dynamic Menu Explorer**: Browse menu categories (Coffee, Mains, Starters, Desserts, Beverages) with real-time updates from MongoDB.
- **Table Reservation System**: Book tables with date, time slot, guest count validation (1–20), and special dietary requests.
- **Inquiry & Contact Form**: Send inquiries directly to the restaurant administration.
- **User Authentication**: Secure guest registration and login with JWT and hashed passwords.

### 🛡️ Administration & Management Portal
- **Dashboard Overview**: Real-time stats on pending reservations, confirmed bookings, total menu items, and inquiries.
- **Menu Management (Full CRUD)**:
  - Add new dishes with image, price, category, description, and Chef's Special tag.
  - Edit dish details in an interactive modal.
  - Delete menu items with confirmation.
- **Reservation Management**:
  - Filter bookings by status (`pending`, `confirmed`, `cancelled`).
  - Search reservations by guest name, email, or phone.
  - One-click confirm or cancel actions.
- **Guest Inquiries**:
  - Read full customer messages in modal reader.
  - Direct "Reply via Email" mailto integration.
  - Delete processed inquiries.

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), React Router v6, Axios, React Toastify, Modern CSS
- **Backend**: Node.js, Express.js, Mongoose, JWT (jsonwebtoken), bcryptjs, express-validator, express-rate-limit
- **Database**: MongoDB (Local or MongoDB Atlas)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, or a MongoDB Atlas URI

---

### 1. Backend Setup

```bash
cd server
npm install
```

Configure your environment variables in `server/.env`:
```env
MONGO_URI=mongodb://localhost:27017/paradise_cafe
PORT=5000
JWT_SECRET=paradise_cafe_jwt_secret_key_2026
JWT_EXPIRE=7d
NODE_ENV=development
```

Seed the database with initial dishes and default admin:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```
Backend runs on: `http://localhost:5000`

---

### 2. Frontend Setup

In a new terminal:
```bash
cd client
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 🔐 Default Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@paradisecafe.com` | `adminpassword123` |

---

## 📡 API Endpoints

### Auth (`/api/auth`)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user & retrieve JWT
- `GET /api/auth/me` - Get profile (Protected)

### Menu (`/api/menu`)
- `GET /api/menu` - Retrieve all menu items (Public)
- `GET /api/menu/:id` - Retrieve item by ID (Public)
- `POST /api/menu` - Create menu item (Admin)
- `PUT /api/menu/:id` - Update menu item (Admin)
- `DELETE /api/menu/:id` - Delete menu item (Admin)

### Reservations (`/api/reservations`)
- `POST /api/reservations` - Create booking (Public)
- `GET /api/reservations` - List all bookings (Admin)
- `PATCH /api/reservations/:id` - Update booking status (Admin)
- `DELETE /api/reservations/:id` - Delete booking (Admin)

### Contact (`/api/contact`)
- `POST /api/contact` - Submit inquiry (Public)
- `GET /api/contact` - List inquiries (Admin)
- `DELETE /api/contact/:id` - Delete inquiry (Admin)
