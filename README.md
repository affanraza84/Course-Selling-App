
```markdown
# 🎓 Course Selling App (Backend)

A **backend-only Course Selling Application** built using modern JavaScript stacks.  
Made to **revise and solidify backend concepts** — from authentication to validation, database modeling, and middleware management.

---

## 🚀 Tech Stack

- **Node.js** – Runtime environment  
- **Express.js** – Web framework  
- **MongoDB + Mongoose** – Database & ORM  
- **Zod** – Schema validation  
- **bcrypt** – Password hashing  
- **JWT (JSON Web Token)** – Authentication

---

## 🏗️ Project Overview

This project has three main modules — **User**, **Admin**, and **Course** — each with their own routes and access controls.  
Middleware ensures that only the right people hit the right endpoints.

```

📦 course-selling-app-backend
├── 📁 routes
│   ├── user.js
│   ├── admin.js
│   └── course.js
├── 📁 middleware
│   ├── user.js
│   └── admin.js
├── .env
├── package.json
├── index.js
|-- db.js
└── README.md

````

---

## 📍 API Routes

### 👤 User Routes (`/user`)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/signup` | Register a new user |
| `POST` | `/signin` | Login user & get a JWT |
| `GET` | `/purchases` | Retrieve any course |

---

### 🧑‍💼 Admin Routes (`/admin`)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/signup` | Register a new admin |
| `POST` | `/signin` | Login admin & get a JWT |
| `POST` | `/course` | Create a new course |
| `PUT` | `/course` | Update existing course details |
| `GET` | `/course/bulk` | View all created courses |

---

### 📚 Course Routes (`/courses`)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/purchase` | Purchase any course |
| `GET` | `/preview` | Get a specific course by ID |

---

## 🛡️ Middleware

| Middleware | Purpose |
|-------------|----------|
| **userMiddleware** | Verifies JWT token for users and grants access to user routes |
| **adminMiddleware** | Verifies JWT token for admins and protects admin-only endpoints |

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/course-selling-app-backend.git
cd course-selling-app-backend
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` file

Add your environment variables:

```
MONGO_URL=<your-mongodb-connection-string>
JWT_USER_PASSWORD=<your-user-secret-key>
JWT_ADMIN_PASSWORD=<your-admin-secret-key>
```

### 4️⃣ Start the server

```bash
npm run start
```

or for development:

```bash
nodemon run dev
```

Server runs at **[http://localhost:3000](http://localhost:3000)**

---

## 🧠 Core Concepts Revised

* **Routing & modular structure** in Express
* **Zod validation** for clean input handling
* **Authentication** using JWT tokens
* **Password encryption** with bcrypt
* **Middleware-based access control** (user/admin separation)
* **Mongoose models** for structured database design

---

## 📘 Example Models

**User Model**

```js
{
  username: String,
  password: String,
  firstName : String,
  lastName : String,
  purchasedCourses: [String]
}
```

**Admin Model**

```js
{
  username: String,
  password: String
}
```

**Course Model**

```js
{
  title: String,
  description: String,
  price: Number,
  imageUrl: String
}
```

---

## 🔄 Example Flow

1. Admin signs up → creates and publishes courses.
2. User signs up → browses and purchases courses.
3. JWTs secure routes → middleware ensures access control.
4. Data is stored and validated using Mongoose + Zod.

---

## 💡 Future Enhancements

* Payment gateway integration (Stripe/Razorpay)
* Course categories and progress tracking
* Pagination, filtering, and search
* Deployment to Render / Vercel / AWS

---

## 🧩 Why I Built This

I created this project to **revise backend fundamentals** — covering everything from REST API structure, JWT auth, to middleware logic.
It’s a personal sandbox to keep my skills sharp and production-ready.

---

## 🤝 Contributing

Pull requests and suggestions are always welcome.
If you’d like to improve or add new features, feel free to fork and open a PR.

---

## 📜 License

Licensed under the **MIT License** — free for personal and commercial use.

```

---

Would you like me to tweak it slightly to make it **more recruiter-friendly** (with a short “About Me / Developer Info” section at the bottom)? That can make your GitHub repo look more polished for portfolio reviews.
```
