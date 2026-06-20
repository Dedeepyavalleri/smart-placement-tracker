# Smart Placement Tracker

A full-stack web application to help students track their campus placement journey efficiently. It allows users to manage companies, applications, deadlines, notes, and status updates in one place.

---

## 📌 Features

### 👨‍💼 Authentication
- User registration & login
- JWT-based authentication
- Protected routes

### 🏢 Companies Module
- Add / Edit / Delete companies
- Track roles, packages, deadlines
- Search companies
- Deadline status indicator (Days left system)

### 📄 Applications Module
- Track application status (Applied, OA Cleared, Interview, Selected, Rejected)
- Filter by status
- Edit & update applications

### 📝 Notes Module
- Add personal notes
- Edit & delete notes
- Organized note cards UI

### 📊 Dashboard
- Overview of applications
- Stats visualization (if implemented)
- Quick insights

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios
- React Router
- React Toastify
- CSS (Custom Styling)

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt


Create a `.env` file in backend:

````env
PORT=5000
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key

⚠️ .env is ignored in Git for security.

⚙️ Installation & Setup
1️⃣ Clone repository
git clone https://github.com/your-username/smart-placement-tracker.git
cd smart-placement-tracker
2️⃣ Backend Setup
npm install
node server.js
3️⃣ Frontend Setup
cd frontend
npm install
npm start dev
🌐 API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login
Companies
GET /companies
POST /companies
PUT /companies/:id
DELETE /companies/:id
Applications
GET /applications
POST /applications
PUT /applications/:id
DELETE /applications/:id
