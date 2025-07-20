# Assignment Submission Portal 

## Project Description
This is a backend API for an **Assignment Submission Portal** where **Users** can upload assignments, and **Admins** can view, accept, or reject these assignments. The application uses **Node.js** with **Express** as the backend framework, and **MongoDB** for database management.

This API supports user registration, login, assignment uploads, and role-based access control for Admins. Admins can manage the assignments submitted by users, including accepting or rejecting them.

### Features:
- User registration and login
- Admin registration and login
- User can upload assignments
- Admins can view, accept, or reject assignments
- Role-based access control (User/Admin)

---

## Technologies Used
- **Node.js** – Backend JavaScript runtime environment
- **Express.js** – Web framework for Node.js
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling for Node.js
- **JWT (JSON Web Tokens)** – For user and admin authentication
- **bcryptjs** – For password hashing
- **body-parser** – Middleware to parse incoming request bodies

---

## Setup and Installation

### Prerequisites
Before you begin, ensure that you have the following installed:
- **Node.js** (v14 or above)
- **MongoDB** (or access to a MongoDB instance)
- **Postman** or any HTTP client to test API endpoints

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/assignment-submission-portal.git
cd assignment-submission-portal
```
### step 2: Install Dependencies
Run the following command to install the required packages:
```bash
npm install
```
### Step 3: Configure Environment Variables
Create a new file named `.env` in the root directory and add your MongoDB connection string and other
environment variables as needed.
```
MONGO_URI=mongodb://localhost:27017/assignmentPortal
JWT_SECRET=your_secret_key
```
### Step 4: Run the Application
``` bash
You can start the server using:
```
# API Documentation

## Overview
This API provides endpoints for managing users, admins, and assignments. It includes endpoints for user registration, login, assignment upload, and assignment management (accept/reject). Authentication is handled through JWT tokens.

## Authentication
JWT (JSON Web Tokens) are used for authentication. Users and admins are identified by their JWT tokens, which should be passed in the `Authorization` header.

For Admin endpoints, the `role` field in the JWT payload is checked to verify that the user is an admin.

### Example Authentication Header:
```bash
Authorization: Bearer <token>
```
### Endpoints
## User Endpoints

| Method | Endpoint     | Description                  |
| ------ | ------------ | ---------------------------- |
| POST   | /register    | Register a new user          |
| POST   | /login       | User login                   |
| POST   | /upload      | Upload an assignment         |
| GET    | /admins      | Fetch all admins             |

#### Admin Endpoints
## Admin and Assignments Endpoints

| Method | Endpoint                    | Description                          |
| ------ | --------------------------- | ------------------------------------ |
| POST   | /register                   | Register a new admin                |
| POST   | /login                      | Admin login                         |
| GET    | /assignments                 | View assignments tagged to the admin |
| POST   | /assignments/:id/accept      | Accept an assignment                |
| POST   | /assignments/:id/reject      | Reject an assignment                |


### Key Sections:

1. **Project Description**: An overview of the project.
2. **Technologies Used**: The tools and libraries used.
3. **Setup Instructions**: How to install, configure, and run the project.
4. **API Endpoints**: Description of all routes with examples of request and response.
5. **Authentication**: Explains JWT usage and the role-based access control.
6. **Example Usage**: `curl` commands to test the API.
7. **Error Handling**: Common errors you might encounter.
8. **Conclusion**: Final thoughts and contributions.
9. **License**: Licensing details.
"# My Space" 
"# My Space" 
"# My Space" 
