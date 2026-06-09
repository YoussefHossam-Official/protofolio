# Youssef Hossam — Backend Developer Portfolio

A clean, fast portfolio website for a backend developer. Built with Express.js + vanilla HTML/CSS/JS.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| Frontend | HTML5, Vanilla CSS, Vanilla JS |
| Auth | JWT + bcryptjs |
| Security | Helmet, express-rate-limit |
| Hosting | Vercel (serverless) |

## Features

- **6 pages**: Home, About, Projects, Project Detail, Contact, 404
- **REST API**: Full JSON API for all content
- **Admin Panel**: Password-protected dashboard to manage all content
- **Live Color Editor**: Change site colors from admin panel with live preview
- **Dark Mode**: Toggle dark/light, saves preference
- **Fully Responsive**: Works on all devices
- **Contact Form**: Sends email via Nodemailer (SMTP)
- **Security**: Helmet headers, rate limiting, input validation, JWT auth

## Project Structure

```
protofolio/
├── api/                  # Vercel serverless entry point
├── back/
│   └── src/
│       ├── config/       # App configuration
│       ├── controllers/  # Request handlers
│       ├── middleware/    # Auth, cache, error, rate-limit, validator
│       ├── routes/       # Express route definitions
│       ├── services/     # Business logic layer
│       ├── utils/        # Helpers, mailer
│       └── data/         # JSON data files (projects, skills, etc.)
├── front/                # Static assets
│   ├── index.html        # Main pages
│   ├── admin/            # Admin panel pages
│   ├── css/              # Stylesheets
│   └── js/               # JavaScript files
├── vercel.json
└── package.json
```

## Getting Started

```bash
# Install dependencies
cd back && npm install

# Start development server
npm run dev     # → http://localhost:3000
```

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push this repo to GitHub
2. Import into Vercel
3. Set environment variables (optional):
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL` — email
   - `JWT_SECRET` — JWT signing secret
   - `MASTER_RESET_KEY` — key to reset admin password

## Admin Panel

- URL: `/admin/login.html`
- Default: First password you enter becomes the admin password
- Manage: Projects, Skills, Experience, Site Info, Colors
