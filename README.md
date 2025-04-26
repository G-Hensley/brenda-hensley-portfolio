# Brenda Hensley Cybersecurity Portfolio 🚀

Welcome to Brenda Hensley's Cybersecurity Portfolio, a slick full-stack app built to spotlight her cybersecurity journey! 🌟 
This portfolio is a showcase of her skills, certifications, and projects.

## 🎉 Features

- **Home Page**: Sleek About section, Skills & Certs showcase, and Projects gallery, all styled with TailwindCSS flair.
- **Blog Page**: A cyber blog hub where Brenda drops wisdom on her cybersecurity adventures, with modal-style post views.
- **Admin Page**: Secure dashboard (OAuth) for adding skills, certs, projects, and blog posts—easy peasy for updates.
- **Security First**: Battle-tested by Brenda's cybersecurity chops (XSS, CSRF, SQL injection? Not on our watch!).
- **CI/CD Magic**: Automated testing (Jest, Cypress) and deployment (Vercel, AWS) via GitHub Actions to be smooth as butter.

## 🛠 Tech Stack

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, MongoDB
- **Testing**: Jest (unit tests), Cypress (E2E flows)
- **DevOps**: GitHub Actions (CI/CD), AWS Elastic Beanstalk (backend), Vercel (frontend)
- **Security**: OAuth, helmet, express-rate-limit, DOMPurify

## 🚀 Get It Running

Wanna play with the code? Here's how to fire it up locally:

### Clone the Repo:

```bash
git clone https://github.com/G-Hensley/brenda-hensley-portfolio.git
cd brenda-hensley-portfolio
```

### Install Dependencies:

```bash
cd frontend && npm install
cd ../backend && npm install
```

### Set Up Environment:

Create `.env` in `/backend`:

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Create `.env.local` in `/frontend`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Run the App:

- Backend: `cd backend && npm run dev` (runs on http://localhost:3001)
- Frontend: `cd frontend && npm run dev` (runs on http://localhost:3000)

### Test It:

```bash
cd frontend && npm test  # Jest
npx cypress run          # Cypress
```

## 🔗 Demo

- **Live Site**: Coming soon on Vercel/AWS! (Deploying soon, stay tuned!)
- **Screenshots**:
  - Home Page: [Insert link or /screenshots/home.png]
  - Blog Modal: [Insert link or /screenshots/blog.png]
  - Admin Dashboard: [Insert link or /screenshots/admin.png]

## 🤝 Collaboration

This project's a team effort! 🎉

- **Cybersecurity Queen**: Brenda brought her A-game, stress-testing for vulnerabilities (XSS, CSRF, you name it) to keep it locked down.
- **Kanban Flow**: Planned with a Trello board to keep our bounce-around coding style on point.

## 🌟 Future Plans

- Add AI-powered features like a chatbot for security questions
- Enhance blog with comments and search functionality
- Integrate more cybersecurity tools for live demos

## 📬 Get in Touch

- **My Portfolio**: [https://gavinhensley.dev]
- **LinkedIn**: [https://www.linkedin.com/in/g-hensley/]
- **Brenda's GitHub**: [https://github.com/B-Hensley]
- **Brenda's LinkedIn**: [https://www.linkedin.com/in/Brenda-Hensley-/]
