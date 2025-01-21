# JWT Authentication and Authorisation Example

This project demonstrates how to implement **JWT-based authentication and authorisation** in a Node.js application using Express. It includes role-based access control, with specific endpoints for regular users and admins.

---

## Features
1. **Authentication**: Users can log in to receive a JWT token. Think of this like checking into a hotel—you provide your credentials (e.g., ID) at the front desk, and in return, you get a keycard (the JWT).
2. **Authorisation**: Role-based access control using the `role` field in the JWT payload.
3. **Secure Endpoints**: Demonstrates protected routes for `USER` and `ADMIN` roles.
4. **Stateless Architecture**: Uses JWT for authentication without relying on server-side session storage.

---

## Endpoints

### 1. `/login`
**Method**: POST

This endpoint allows users to log in and receive a JWT token.

- **Request Body**:
  ```json
  {
      "username": "<your_username>",
      "role": "<USER or ADMIN>"
  }
  ```
- **Response**:
  ```json
  {
      "token": "<your_jwt_token>"
  }
  ```
- **Description**: The `role` field determines the user's access level.

---

### 2. `/protected`
**Method**: GET

This endpoint is accessible to all authenticated users, regardless of their role.

- **Headers**:
  ```
  Authorization: Bearer <your_jwt_token>
  ```
- **Response**:
  ```json
  {
      "message": "Welcome!",
      "user": {
          "username": "<username>",
          "role": "<role>"
      }
  }
  ```
- **Description**: Returns a welcome message and user details extracted from the JWT.

---

### 3. `/admin`
**Method**: GET

This endpoint is restricted to users with the `ADMIN` role.

- **Headers**:
  ```
  Authorization: Bearer <your_jwt_token>
  ```
- **Response (if `role` is `ADMIN`)**:
  ```json
  {
      "message": "Welcome, Admin!",
      "user": {
          "username": "<username>",
          "role": "ADMIN"
      }
  }
  ```
- **Response (if `role` is not `ADMIN`)**:
  ```json
  {
      "message": "Access denied. Admins only!"
  }
  ```

---

## Setup and Installation

### 1. Clone the Repository
```bash
git clone <repository_url>
cd <repository_directory>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure the Environment Variables
Create a `.env` file in the root of your project and add the following:
```env
SECRET_KEY=mysecretkey
```

### 4. Run the Server
```bash
npm start
```
The application will be available at `http://localhost:3000` by default.

---

## Testing the Application
You can use [Postman](https://www.postman.com/) or any API client to test the endpoints.

### Step 1: Log In
- Send a POST request to `/login` with the `username` and `role` (e.g., `USER` or `ADMIN`).
- Copy the `token` from the response.

### Step 2: Access Protected Endpoints
- Use the copied token in the `Authorization` header for the `/protected` and `/admin` endpoints.
- Example header:
  ```
  Authorization: Bearer <your_jwt_token>
  ```

### Example Use Cases
- A user with the `USER` role can access `/protected` but will receive an **Access Denied** response for `/admin`.
- A user with the `ADMIN` role can access both `/protected` and `/admin`.

---

## Project Structure
```
project-root
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── .env               # Environment variables
└── README.md          # Documentation
```

---

## Notes
- This example uses the `jsonwebtoken` library for signing and verifying JWTs.
- The secret key (`SECRET_KEY`) should be stored securely in production environments.
- Ensure tokens are sent via the `Authorization` header with the `Bearer` prefix.

---

## Resources
- [JSON Web Tokens (JWT) Documentation](https://jwt.io)
- [Express.js Documentation](https://expressjs.com)
- [Postman API Client](https://www.postman.com/)
