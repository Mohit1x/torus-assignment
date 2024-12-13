# User Management Dashboard

A modern User Management Dashboard built with Vite, React, TypeScript, Tailwind CSS, Redux, Redux Thunk, and Chart.js. This application features user login, data management, and data visualization, including charts to display statistics.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Features](#features)
   - [Login Functionality](#login-functionality)
   - [User Table & Pie Chart](#user-table-pie-chart)
   - [Filtering on User Data Management Page](#filtering-on-user-data-management-page)
5. [Technologies Used](#technologies-used)
6. [Contributing](#contributing)

## Prerequisites

- Node.js (v14 or later)
- npm or yarn package manager

## Installation

Follow these steps to set up the application:

### 1. Create Vite App with TypeScript

To start, create a Vite app with TypeScript template:

```bash
npm create vite@latest user-management-dashboard --template react-ts
cd user-management-dashboard
```

### 2. Install Tailwind CSS

Next, install Tailwind CSS and its dependencies:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

### 3. Install Redux, Redux Thunk, and Chart.js

To manage state and create charts, install Redux, Redux Thunk, and Chart.js:
Project Structure
bash
Copy code
src/
├── components/ # React components
├── pages/ # Page components
├── store/ # Redux store setup
└── App.tsx

### 4. Features

### 4.1 Login Functionality

Login: Users must log in using the credentials:
Username: admin\_\_torus
Password: admiin@123
A mock API (Node.js) will authenticate the user. Only the above credentials will work.

### 4.2 User Table & Pie Chart

User Table: Displays a list of users with their details. The user table includes functionalities for deleting users.
Pie Chart: A chart displaying a pie representing the number of active vs inactive users.

### 4.3 Filtering on User Data Management Page

The User Data Management page allows users to filter the data by:
Date
Region
Name
Email

### 4.4 Technologies Used

Vite - For fast and optimized development.
React - Frontend JavaScript library for building UI.
TypeScript - Adds type safety to JavaScript.
Tailwind CSS - Utility-first CSS framework for quick styling.
Redux - State management for the application.
Redux Thunk - Middleware for handling asynchronous actions in Redux.
Chart.js - A JavaScript library for creating charts, used here for bar and pie charts.
