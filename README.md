

# Roxiller Assignment - Client

This is the **frontend** of the application, built with **React**, **Vite**, and **Tailwind CSS**. It provides an intuitive user interface for administrators, store owners, and users to interact with the rating system.

## Visit Application

[Deployed on Vercel](https://roxiler-assignment-client.vercel.app/)



## Demo Credentials

Use the following credentials to test different user roles:

| Role         | Email              | Password   |
|--------------|--------------------|------------|
| **Admin**     | admin@gmail.com     | Admin@123  |
| **Store Owner** | owner1@gmail.com    | Owner@123  |
| **Normal User** | user1@gmail.com     | User@123   |

---

## Tech Stack

* **React + Vite**
* **Tailwind CSS**
* **Formik & Yup** (Form Handling & Validation)
* **React Router DOM**

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/harshkhavale/roxiller-assignment-client.git
cd roxiller-assignment-client/client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root of the `client` directory with the following:

```env
VITE_API_BASE_URL="http://localhost:5000/api"
```

> Make sure the backend server is running and the URL matches your backend configuration.

### 4. Run the Application

```bash
npm run dev
```

The frontend will be accessible at `http://localhost:5173` (or the configured Vite dev port).

---

## Project Structure

```
client/
├── public/
├── src/
│   ├── assets/             # Images and static files
│   ├── components/         # Reusable UI components
│   ├── screens/              # Route-based pages for each user role
│   ├── store/           # API service handlers
│   ├── utils/              # Utility functions
│   ├── routes/             # App routing configuration
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Application entry point
├── index.html
```

---

## Key Features

* Responsive and modern UI with Tailwind CSS
* Role-based navigation and routing
* Secure authentication using JWT tokens
* Form validation using Formik and Yup
* Search, sort, and filter functionality for listings
* Real-time feedback for user interactions
* Integrated error handling and loading states

