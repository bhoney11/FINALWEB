Plushie Shop — Full-Stack E‑Commerce Platform

**Plushie Shop** is a full‑stack web application for limited‑edition collectible plush toys. The project demonstrates a clean **MVC architecture**, secure **authentication with Role‑Based Access Control (RBAC)**, and a modern, responsive frontend with real‑time updates.



## Key Features

### Authentication & Authorization

* **JWT‑based security** for stateless user sessions
* **Password hashing** with `bcryptjs`
* **Role‑Based Access Control (RBAC)**

  * **User**: browse the catalog, manage the cart, and simulate checkout
  * **Admin**: access a protected dashboard with full **CRUD** over products

---

### Interactive Catalog & Cart

* **Dynamic product rendering** from MongoDB Atlas
* **Makeship‑style slide‑out cart** with inline quantity controls (+ / −)
* **Real‑time synchronization**: when an Admin updates a product (name/price), all active carts reflect the change instantly

---

###Modern User Experience

* **Animated hero carousel** for featured collections
* **Responsive design** (mobile, tablet, desktop) using Bootstrap 5
* **Checkout simulation** with order confirmation generation

---

## Tech Stack

**Frontend**

* HTML5, CSS3 (Flexbox & Grid)
* JavaScript (ES6+)
* Bootstrap 5

**Backend**

* Node.js, Express.js

**Database**

* MongoDB Atlas (Cloud)
* Mongoose (ODM)

**Security & Utilities**

* JSON Web Tokens (JWT)
* bcryptjs
* dotenv
* CORS

---

## Project Structure (MVC)

```
/FINAL-PROJECT
├── models/        # Mongoose schemas (User, Toy, Review)
├── controllers/   # Business logic & request handlers
├── routes/        # API endpoint definitions
├── middleware/    # Authentication & role verification
├── public/        # Frontend (HTML, CSS, JS, images)
├── .env           # Environment variables (private)
├── server.js      # Application entry point
└── package.json   # Dependencies & scripts
```

---

## API Documentation

### Authentication

| Method | Endpoint             | Description                    | Access |
| -----: | -------------------- | ------------------------------ | ------ |
|   POST | `/api/auth/register` | Register a new user or admin   | Public |
|   POST | `/api/auth/login`    | Authenticate user & return JWT | Public |

---

### Products (Plushies)

| Method | Endpoint        | Description                       | Access     |
| -----: | --------------- | --------------------------------- | ---------- |
|    GET | `/api/toys`     | Retrieve all products             | Public     |
|   POST | `/api/toys`     | Create a new plushie              | Admin only |
|    PUT | `/api/toys/:id` | Update product details            | Admin only |
| DELETE | `/api/toys/:id` | Remove a product from the catalog | Admin only |

---

### Reviews (Relational Logic)

| Method | Endpoint              | Description                        | Access        |
| -----: | --------------------- | ---------------------------------- | ------------- |
|    GET | `/api/reviews/:toyId` | Get reviews for a specific plushie | Public        |
|   POST | `/api/reviews`        | Post a review linked to a plushie  | Authenticated |

---

## Local Installation

### Prerequisites

* Node.js (v16+ recommended)
* MongoDB Atlas cluster or local MongoDB instance

---

### Setup

1. **Clone the repository** and install dependencies:

   ```bash
   npm install
   ```

2. **Create a `.env` file** in the project root:

   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/plushie_db
   JWT_SECRET=your_super_secret_key
   PORT=3000
   ```

3. **Run the application**:

   ```bash
   node server.js
   ```

---
 Access

The application will be available at:

**[http://localhost:3000](http://localhost:3000)**
