Plushie Shop — Full-Stack E-Commerce Platform

Plushie Shop is a specialized online marketplace for limited-edition collectible plush toys. This project is a complete Full-Stack application featuring a robust MVC architecture, secure authentication with Role-Based Access Control (RBAC), and a highly interactive, responsive frontend.

Key Features
Authentication & Authorization

JWT Security: Secure user sessions using JSON Web Tokens.

Password Hashing: Industry-standard encryption using bcryptjs.

Role-Based Access (RBAC):

User: Browse catalog, manage cart, and simulate checkout.

Admin: Exclusive access to a product management dashboard (Full CRUD).

🛍 Interactive Catalog & Cart

Dynamic Rendering: Products are fetched from MongoDB Atlas and displayed in real-time.

Makeship-Style Sidebar Cart: A smooth, slide-out cart menu allowing users to adjust quantities (+/-) without leaving the page.

Real-Time Synchronization: If an Admin edits a product's price or name, the user's cart updates automatically to reflect the changes.

📱 Modern User Experience

Animated Carousel: Interactive hero section for featured collections.

Responsive UI: Fully functional on mobile, tablet, and desktop devices using Bootstrap 5.

Checkout Simulation: Complete shopping flow from product selection to a generated order confirmation.

🛠 Tech Stack

Frontend: HTML5, CSS3 (Modern Flex/Grid), JavaScript (ES6+), Bootstrap 5.

Backend: Node.js, Express.js.

Database: MongoDB Atlas (Cloud Database).

Tools: Mongoose (ODM), Dotenv, CORS, JWT, Bcrypt.js.

Project Structure (MVC Architecture)
code
Text
download
content_copy
expand_less
/FINAL-PROJECT
  ├── models/          # Mongoose Schemas (User, Toy, Review)
  ├── controllers/     # Request handlers (Logic behind API)
  ├── routes/          # API endpoint definitions
  ├── middleware/      # Auth protection & Role verification
  ├── public/          # Static files (Frontend: HTML, CSS, JS, Images)
  ├── .env             # Environment variables (Private keys)
  ├── server.js        # Main entry point of the application
  └── package.json     # Project dependencies and scripts
 API Documentation 
 Authentication
Method	Endpoint	Description	Access
POST	/api/auth/register	Creates a new user/admin account	Public
POST	/api/auth/login	Validates credentials & returns JWT	Public Products (Toys)
Method	Endpoint	Description	Access
GET	/api/toys	Retrieve all products	Public
POST	/api/toys	Create a new plushie	Admin Only
PUT	/api/toys/:id	Update product details & sync cart	Admin Only
DELETE	/api/toys/:id	Remove product from store	Admin Only
Reviews (Relational Logic)
Method	Endpoint	Description	Access
GET	/api/reviews/:toyId	Get reviews linked to a toy ID	Public
POST	/api/reviews	Post a review linked to a toy	Registered
Local Installation
1. Prerequisites

Node.js installed on your machine.

A MongoDB Atlas cluster or local MongoDB instance.

2. Setup

Clone the project and install dependencies:

code
Bash
download
content_copy
expand_less
npm install
3. Environment Variables

Create a .env file in the root folder and add your credentials:

code
Env
download
content_copy
expand_less
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/plushie_db
JWT_SECRET=your_super_secret_key
PORT=3000
4. Run Application
code
Bash
download
content_copy
expand_less
node server.js

The shop will be available at: http://localhost:3000
