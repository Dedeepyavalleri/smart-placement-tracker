# Smart Placement Tracker API Documentation

Base URL:

http://localhost:5000

---

# Authentication

Authentication uses JWT Tokens.

Protected routes require:

Authorization: Bearer <token>

Example:

Authorization: Bearer eyJhbGciOiJIUzI1Ni...

---

# User Routes

## Register User

POST /register

Request Body:

{
    "name": "Dedeepya",
    "email": "dedeepya@gmail.com",
    "password": "123456"
}

Response:

{
    "message": "User Registered Successfully",
    "user": {}
}

---

## Login User

POST /login

Request Body:

{
    "email": "dedeepya@gmail.com",
    "password": "123456"
}

Response:

{
    "message": "Login Successful",
    "token": "JWT_TOKEN"
}

---

## Get All Users

GET /users

Response:

[
    {
        "id": 1,
        "name": "Dedeepya",
        "email": "dedeepya@gmail.com"
    }
]

---

## Get User By ID

GET /users/:id

Example:

GET /users/1

Response:

{
    "id": 1,
    "name": "Dedeepya",
    "email": "dedeepya@gmail.com"
}

---

## Update User

PUT /users/:id

Request Body:

{
    "name": "Updated Name",
    "email": "updated@gmail.com"
}

Response:

{
    "message": "User updated",
    "user": {}
}

---

## Delete User

DELETE /users/:id

Response:

{
    "message": "User deleted successfully"
}

---

## Get Profile

GET /profile

Protected Route

Headers:

Authorization: Bearer TOKEN

Response:

{
    "message": "Protected Route Accessed",
    "user": {}
}

---

# Company Routes

## Create Company

POST /companies

Request Body:

{
    "company_name": "Amazon",
    "role": "SDE Intern",
    "package": "12 LPA",
    "deadline": "2026-12-31"
}

Response:

{
    "message": "Company Added Successfully",
    "company": {}
}

---

## Get All Companies

GET /companies

Supports:

?page=1
&limit=5
&sort=asc
&search=amazon

Examples:

GET /companies?page=1&limit=5

GET /companies?search=amazon

GET /companies?sort=desc

Response:

{
    "page": 1,
    "limit": 5,
    "total": 20,
    "companies": []
}

---

## Get Company By ID

GET /companies/:id

Example:

GET /companies/1

Response:

{
    "id": 1,
    "company_name": "Amazon"
}

---

## Update Company

PUT /companies/:id

Request Body:

{
    "company_name": "Amazon",
    "role": "SDE",
    "package": "15 LPA",
    "deadline": "2026-12-31"
}

Response:

{
    "message": "Company Updated"
}

---

## Delete Company

DELETE /companies/:id

Response:

{
    "message": "Company Deleted"
}

---

# Application Routes

All routes are Protected.

Headers:

Authorization: Bearer TOKEN

---

## Create Application

POST /applications

Request Body:

{
    "company_id": 1,
    "status": "Applied"
}

Response:

{
    "message": "Application Added"
}

---

## Get Applications

GET /applications

Supports Filters:

?status=Applied

?status=Selected

?company=Amazon

Examples:

GET /applications?status=Selected

GET /applications?company=Amazon

GET /applications?status=Selected&company=Amazon

Response:

[
    {
        "id": 1,
        "company_name": "Amazon",
        "status": "Applied"
    }
]

---

## Get Application By ID

GET /applications/:id

Response:

{
    "id": 1,
    "status": "Applied"
}

---

## Update Application

PUT /applications/:id

Request Body:

{
    "status": "Selected"
}

Response:

{
    "message": "Application Updated"
}

---

## Delete Application

DELETE /applications/:id

Response:

{
    "message": "Application Deleted"
}

---

# Notes Routes

All routes are Protected.

Headers:

Authorization: Bearer TOKEN

---

## Create Note

POST /notes

Request Body:

{
    "title": "Amazon OA",
    "content": "Practice Sliding Window"
}

Response:

{
    "message": "Note Added"
}

---

## Get All Notes

GET /notes

Response:

[
    {
        "id": 1,
        "title": "Amazon OA",
        "content": "Practice Sliding Window"
    }
]

---

## Get Note By ID

GET /notes/:id

Response:

{
    "id": 1,
    "title": "Amazon OA",
    "content": "Practice Sliding Window"
}

---

## Update Note

PUT /notes/:id

Request Body:

{
    "title": "Updated Title",
    "content": "Updated Content"
}

Response:

{
    "message": "Note Updated"
}

---

## Delete Note

DELETE /notes/:id

Response:

{
    "message": "Note Deleted"
}

---

# Dashboard Routes

Protected Route

Authorization: Bearer TOKEN

---

## Get Dashboard Stats

GET /dashboard

Response:

{
    "totalApplications": 20,
    "totalOffers": 3,
    "totalRejections": 5,
    "totalInterviews": 4,
    "statusSummary": [
        {
            "status": "Applied",
            "count": 10
        },
        {
            "status": "Selected",
            "count": 3
        }
    ]
}

---

# Error Responses

Validation Error

{
    "success": false,
    "message": "Name is required"
}

---

Not Found Error

{
    "success": false,
    "message": "Route Not Found"
}

---

Unauthorized Error

{
    "success": false,
    "message": "Invalid Token"
}

---

Server Error

{
    "success": false,
    "message": "Server Error"
}