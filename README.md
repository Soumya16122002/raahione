# Raahione — AI-Powered Ride-Sharing Platform

A full-stack, peer-to-peer ride-sharing platform built with Spring Boot, React, and PostgreSQL, featuring JWT-secured REST APIs, booking workflows, and a recommendation engine. Deployed across Railway, Vercel, and Render.

🔗 **Live Demo:** https://raahione.vercel.app/
📦 **Repository:** https://github.com/Soumya16122002/raahione

---

## ✨ Features

- **User Authentication & Authorization** — JWT-based auth with role-based access control (rider/driver roles)
- **Ride Booking System** — End-to-end booking flow with a one-active-booking-per-user rule to prevent conflicting reservations
- **Booking Approval Workflow** — Driver-side approval/rejection of ride requests
- **Recommendation Engine** — Suggests optimal ride matches based on route and availability
- **Search & Filters** — Filter available rides by route, time, and preferences
- **Profile Management** — User profile creation and editing
- **Protected Routes** — Role-based route protection on the frontend (React Router)
- **Responsive UI** — Tailwind CSS with Framer Motion animations (Hero section redesign)

---

## 🛠️ Tech Stack

| Layer          | Technology                              |
|----------------|------------------------------------------|
| Backend        | Java, Spring Boot, Spring Security       |
| Frontend       | React.js, React Router, Tailwind CSS, Framer Motion |
| Database       | PostgreSQL (hosted on Neon)              |
| Auth           | JWT (JSON Web Tokens)                    |
| Containerization | Docker                                 |
| Deployment     | Backend → Render / AWS EC2, Frontend → Vercel, DB → Railway/Neon |
| Version Control| Git                                      |

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌──────────────────┐        ┌─────────────────┐
│  React Frontend │  ────▶  │  Spring Boot API  │ ────▶  │   PostgreSQL     │
│  (Vercel)       │  REST   │  (Render/EC2)      │  JDBC  │   (Neon/Railway) │
│                  │  JWT    │  25+ Endpoints     │        │                  │
└─────────────────┘         └──────────────────┘        └─────────────────┘
```

- **Frontend** communicates with the backend via REST APIs secured with JWT bearer tokens.
- **Backend** handles business logic: booking rules, approval workflows, recommendation logic.
- **Database** stores users, rides, bookings, and profile data in a normalized PostgreSQL schema.
- Entire stack is **Dockerized** for consistent local development and deployment.

---

## 📁 Project Structure

```
raahione/
├── backend/
│   ├── src/main/java/com/raahione/
│   │   ├── controller/       # REST controllers
│   │   ├── service/          # Business logic (booking, recommendation)
│   │   ├── repository/       # Spring Data JPA repositories
│   │   ├── entity/           # JPA entities (User, Ride, Booking)
│   │   ├── security/         # JWT filters, Spring Security config
│   │   └── dto/               # Request/response DTOs
│   ├── src/main/resources/
│   │   └── application.yml
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/       # Hero, Navbar, RideCard, etc.
│   │   ├── pages/             # Login, Dashboard, BookRide, Profile
│   │   ├── routes/            # Protected route wrappers
│   │   └── App.jsx
│   └── package.json
├── docker-compose.yml
└── README.md
```

*(Adjust structure above to match your actual repo layout.)*

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL (or Neon account)
- Docker (optional, for containerized setup)

### Backend Setup

```bash
cd backend
# Configure DB credentials in src/main/resources/application.yml
./mvnw clean install
./mvnw spring-boot:run
```

Backend runs on `http://localhost:8080` by default.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA).

### Environment Variables

**Backend (`application.yml` or `.env`):**
```
DB_URL=jdbc:postgresql://<host>:5432/<db_name>
DB_USERNAME=<username>
DB_PASSWORD=<password>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRATION=86400000
```

**Frontend (`.env`):**
```
VITE_API_BASE_URL=http://localhost:8080/api
```

### Run with Docker Compose

```bash
docker-compose up --build
```

---

## 📡 API Overview

| Method | Endpoint                     | Description                        | Auth Required |
|--------|-------------------------------|-------------------------------------|----------------|
| POST   | `/api/auth/register`          | Register new user                   | No             |
| POST   | `/api/auth/login`             | Login, returns JWT                  | No             |
| GET    | `/api/rides`                  | List/search available rides         | Yes            |
| POST   | `/api/rides`                  | Create a new ride offer             | Yes (Driver)   |
| POST   | `/api/bookings`               | Book a ride                         | Yes (Rider)    |
| PUT    | `/api/bookings/{id}/approve`  | Approve/reject booking request      | Yes (Driver)   |
| GET    | `/api/users/profile`          | Get logged-in user profile          | Yes            |
| PUT    | `/api/users/profile`          | Update profile                      | Yes            |

*(Full list: 25+ endpoints — update table with your actual controller mappings.)*

---

## 🧪 Testing

```bash
cd backend
./mvnw test
```

---

## 📌 Roadmap / Future Improvements

- [ ] Real-time ride tracking with WebSockets
- [ ] Payment gateway integration
- [ ] In-app chat between rider and driver
- [ ] Rating & review system

---

## 👤 Author

**Soumya Ghosh**
 soumyaghosh30912@gmail.com

---

## 📄 License

This project is licensed under the MIT License.
