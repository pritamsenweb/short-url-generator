# 🔗 Short URL Generator — Lightweight URL Shortener with Analytics

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-black?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-9.x-brightgreen?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![EJS](https://img.shields.io/badge/EJS-6.x-yellow?style=for-the-badge&logo=ejs)](https://ejs.co/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)

> **A full-stack URL shortening service** built with **Node.js**, **Express**, and **MongoDB**. Features user authentication, click analytics, custom short IDs, and a clean EJS-rendered UI. Perfect for learning modern web development patterns or deploying as a production-ready link shortener.

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| **🔐 User Authentication** | Secure signup/login with cookie-based sessions (UUID tokens) |
| **✂️ URL Shortening** | Generate short, memorable links using `nanoid` / `uuid` |
| **📊 Click Analytics** | Track visit history with timestamps — see total clicks per link |
| **🔒 Protected Routes** | Middleware-based auth guards for URL management |
| **📱 Responsive UI** | Clean, mobile-friendly EJS templates with semantic HTML |
| **⚡ Fast & Lightweight** | Express 5 + MongoDB + zero heavy dependencies |
| **🛡️ Secure by Default** | HttpOnly cookies, input validation, MongoDB injection protection |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js 18+ |
| **Framework** | Express 5 (latest) |
| **Database** | MongoDB with Mongoose ODM |
| **Templating** | EJS (Embedded JavaScript) |
| **Auth** | Cookie-parser + UUID session tokens |
| **ID Generation** | `nanoid` (URL-safe, collision-resistant) |
| **Dev Tools** | Nodemon (hot reload) |

---

## 📦 Quick Start

### Prerequisites
- **Node.js 18+** and **npm**
- **MongoDB** running locally (`mongodb://localhost:27017`) or a cloud URI (MongoDB Atlas)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/pritamsenweb/short-url-generator.git
cd short-url-generator

# 2. Install dependencies
npm install

# 3. Start MongoDB (if local)
# mongod  # or use your preferred method

# 4. Run the development server
npm start
# Server runs at http://localhost:8001
```

### Environment Variables (Optional)

Create a `.env` file for production:

```env
PORT=8001
MONGODB_URI=mongodb://localhost:27017/short-url
NODE_ENV=production
```

---

## 📁 Project Structure

```
short-url-generator/
├── index.js                 # App entry point + global routes
├── connect.js               # MongoDB connection utility
├── package.json
├── .gitignore
├── README.md
├── controller/
│   ├── url.js               # URL CRUD + redirect logic
│   └── user.js              # Signup / login handlers
├── middleware/
│   └── auth.js              # Auth guards (restrictToLoggedinUserOnly, checkAuth)
├── models/
│   ├── url.js               # URL schema (shortId, redirectUrl, visitHistory[])
│   └── user.js              # User schema (name, email, password)
├── routes/
│   ├── url.js               # Protected URL routes (/url)
│   ├── user.js              # Auth routes (/user)
│   └── staticRouter.js      # Public pages (/, /signup, /login)
├── service/
│   └── auth.js              # Session management (setUser, getUser)
└── views/
    ├── home.ejs             # Dashboard: create + list URLs with analytics
    ├── signup.ejs           # User registration form
    └── login.ejs            # User login form
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/signup` | Render signup page | ❌ |
| `POST` | `/user` | Register new user | ❌ |
| `GET` | `/login` | Render login page | ❌ |
| `POST` | `/user/login` | Authenticate & set cookie | ❌ |

### URL Management (Protected)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/url` | Create short URL | ✅ |
| `GET` | `/url/:id` | Get URL details + analytics | ✅ |

### Public Redirect
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/:shortId` | Redirect to original URL + log visit |

---

## 🧪 Usage Examples

### Create a Short URL (Authenticated)
```bash
curl -X POST http://localhost:8001/url \
  -H "Content-Type: application/json" \
  -b "uid=your-session-cookie" \
  -d '{"url": "https://example.com/very/long/url/with/parameters"}'
```

### Access Short Link
```
http://localhost:8001/abc123  →  Redirects to original URL + increments click count
```

### View Analytics
Open the dashboard at `http://localhost:8001` after login to see:
- Short ID
- Original URL
- Total clicks (visitHistory.length)
- Timestamp of each visit

---

## 🔐 Security Highlights

- **HttpOnly cookies** — Prevents XSS token theft
- **Password hashing** — (Add `bcrypt` in production)
- **Input sanitization** — Mongoose schema validation
- **Route protection** — Middleware guards on all write operations
- **No eval/Function constructors** — Safe template rendering

---

## 📈 Roadmap / TODO

- [ ] Add **bcrypt** for password hashing
- [ ] Implement **custom short aliases** (e.g., `/my-brand`)
- [ ] Add **QR code generation** for short links
- [ ] REST API with **JWT tokens** for mobile apps
- [ ] **Rate limiting** (express-rate-limit)
- [ ] **Docker** support + docker-compose
- [ ] Unit/integration tests (Jest + Supertest)
- [ ] Deploy to **Vercel / Railway / Render** with MongoDB Atlas

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the **ISC License**. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Pritam Sen** — [@pritamsenweb](https://github.com/pritamsenweb)

Built as a learning project following the [Piyush Garg Node.js Tutorial](https://www.youtube.com/@piyushgargdev) series.

---

## ⭐ Show Your Support

If you found this project helpful, **give it a star** on GitHub — it helps others discover it!

[![GitHub stars](https://img.shields.io/github/stars/pritamsenweb/short-url-generator?style=social)](https://github.com/pritamsenweb/short-url-generator/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/pritamsenweb/short-url-generator?style=social)](https://github.com/pritamsenweb/short-url-generator/network/members)

---

## 🔍 SEO Keywords

> `url shortener`, `link shortener`, `nodejs url shortener`, `express mongodb url shortener`, `short link generator`, `url analytics`, `click tracking`, `nanoid short urls`, `full stack nodejs project`, `express authentication tutorial`, `mongodb mongoose crud`, `ejs templating engine`, `cookie based auth`, `url redirect service`, `web development portfolio project`

---

> **Built with ❤️ for learning and sharing** — Deploy your own URL shortener in minutes!