![House 18 Wide Logo](https://res.cloudinary.com/dzcqnchjm/image/upload/v1746566707/logo-white-trans_m6bctz.png)

# House18 – Fullstack Webshop

This is a fullstack project built with **React (frontend)** and **Express (backend)**. The goal is to create an e-commerce site as part of a student group assignment.

---

## 📁 Project Structure

```
house18/
├── frontend/     # React (Vite)
├── backend/      # Express
├── package.json  # Controls both frontend and backend scripts using concurrently
└── .gitignore
```

---

## 🧑‍💻 Getting Started – How to Install Everything

> Make sure you have **Node.js** installed.

### 1. Clone the repository

```bash
git clone <repo-url>
cd <project-name>
```

### 2. Install all dependencies (root + frontend + backend)

You can either do this manually:

```bash
# Root (for concurrently)
npm install

# Frontend
cd frontend
npm install
cd ..

# Backend
cd backend
npm install
cd ..
```

Or use the following script from the root:

```bash
npm run install-all
```

(You need to define this in the root `package.json`, see below.)

---

## 🚀 Run the Project

Run both frontend and backend at the same time:

```bash
npm start
```

This uses `concurrently` and starts:
- Frontend on `http://localhost:5173`
- Backend on `http://localhost:5000` (or similar)

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend/` folder, for example:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_string
```


---

## 👥 Team Members

- Nicholas Malm
- Jacob Hellgren
- Hugo Nilsson
- Pontus Havmyr

---

## 📄 License

MIT (or another license of your choice)
