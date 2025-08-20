# Omnify Blog Website 📝

A full-stack **MERN Blog Website** built as part of the Omnify
assignment.\
It allows users to create, read, and manage blogs with authentication
and smooth UI using **React + MUI** on the frontend and **Node.js +
Express + MongoDB** on the backend.

---

## 🚀 Live Demo

🔗 [Deployed Website](https://omnify-blog-website-client.vercel.app/)

---

## 📂 GitHub Repositories

- **Client (Frontend)**:
  [Omnify-blogWebsite-client](https://github.com/Imran00852/Omnify-blogWebsite-client)
- **Server (Backend)**:
  [Omnify-blogWebsite-server](https://github.com/Imran00852/Omnify-blogWebsite-server)

---

## ✨ Features

- 🔐 User Authentication (Login / Signup / Logout)
- ✍️ Create, View, and Manage Blogs
- 📝 Rich Blog Details Page with Author and Date
- 📑 Pagination for Blogs
- 👤 My Blogs page (see only your own blogs)
- 📱 Fully Responsive with Mobile Drawer Navigation
- ⚡ Smooth UI with Material UI

---

## 🛠️ Tech Stack

**Frontend:** - React.js (with Vite) - Redux Toolkit & RTK Query -
Material UI (MUI) - Axios

**Backend:** - Node.js + Express.js - MongoDB + Mongoose - JWT
Authentication - bcrypt for password hashing - CORS & cookie-parser

---

## ⚙️ Installation & Setup

Clone both repositories and follow the steps below:

### 1️⃣ Clone the repositories

```bash
# Clone client
git clone https://github.com/Imran00852/Omnify-blogWebsite-client.git
cd Omnify-blogWebsite-client

# Clone server
git clone https://github.com/Imran00852/Omnify-blogWebsite-server.git
cd Omnify-blogWebsite-server
```

### 2️⃣ Install dependencies

```bash
# Inside client
npm install

# Inside server
npm install
```

### 3️⃣ Setup Environment Variables

#### For **Server (.env)**

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    CLIENT_URL=http://localhost:5173

#### For **Client (.env)**

    VITE_API_URL=http://localhost:5000/api

### 4️⃣ Run the apps

```bash
# Start client
cd Omnify-blogWebsite-client
npm run dev

# Start server
cd Omnify-blogWebsite-server
npm run dev
```

---

### 🏠 Home Page

Displays latest blogs with pagination.

### ✍️ Create Blog

Only logged-in users can create blogs.

### 📖 Blog Details

Read full blog with author info and creation date.

### 👤 My Blogs

View only blogs created by the logged-in user.

---
