# Hustle Hub Frontend

## Project Overview

Hustle Hub Frontend is a React-based web application designed to help users discover developer mentors and programming learning resources in one platform.

The application allows users to:
- Browse developer mentors from GitHub
- Search and filter mentors
- View mentor profiles and repositories
- Browse programming books
- Save favorite mentors and books
- Manage saved favorites

This project demonstrates frontend development skills using React, API integration, routing, reusable components, responsive design, and state management.

---

# Features

## Home Page
- Hero section
- Search section
- Category cards
- Responsive layout

## Mentors Feature
- GitHub API integration
- Dynamic mentor cards
- Search mentors
- Mentor profile pages
- Save favorite mentors

## Books Feature
- Open Library API integration
- Dynamic books display
- Search books
- Save favorite books

## Favorites Feature
- View saved mentors
- View saved books
- Remove favorites

## Authentication UI
- Login page
- Signup page

## UX Improvements
- Loading states
- Responsive design
- Reusable components
- Error handling

---

# Technologies Used

- React
- Vite
- React Router DOM
- CSS
- GitHub API
- Open Library API

---

# Setup and Installation

## Clone the repository

```bash
git clone <repository-link>
```

## Navigate into the project folder

```bash
cd hustlehub_frontend
```

## Install dependencies

```bash
npm install
```

## Run the development server

```bash
npm run dev
```

The application will run on:

```bash
http://localhost:5173
```

---

# Environment Variables

This frontend project currently does not require environment variables because the application uses public APIs.

Possible future environment variables:

```env
VITE_API_URL=
VITE_GITHUB_TOKEN=
```

---

# Deployment

## Frontend Deployment Platform
- Netlify

## Netlify Deployment Settings

Use the following settings during deployment:

```text
Base directory: hustlehub_frontend
Build command: npm run build
Publish directory: hustlehub_frontend/dist
```

## Netlify Deployment Steps

1. Push the project to GitHub
2. Open Netlify
3. Import the GitHub repository
4. Add the deployment settings above
5. Deploy the project

## React Router Netlify Fix

Create a file called:

```text
public/_redirects
```

Add this inside the file:

```text
/* /index.html 200
```

This prevents 404 errors when refreshing React Router pages on Netlify.

Example deployment link:

```text
https://hustle-hub.netlify.app
```

---

# Frontend Project Structure

```bash
src/
├── assets/
├── components/
├── pages/
├── services/
├── App.jsx
├── main.jsx
└── index.css
```

---

# Design and Architecture

## Frontend Design
- Built using React
- Uses React Router for navigation
- Responsive design for desktop and mobile
- Organized component structure

## APIs Used

### GitHub API
Used to fetch mentor profiles and repositories.

### Open Library API
Used to fetch programming books dynamically.

---

# Future Improvements

- Backend integration using Flask
- Real authentication system
- Database support
- Mentor messaging system
- Book preview links
- Better animations
- Dark mode
- User dashboards

---

# Team Workflow

## Version Control
- Git and GitHub
- Feature branches
- Pull requests
- Code reviews
