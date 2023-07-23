**Vacation Rental Platform Documentation**

## Table of Contents

1. Introduction
   - Purpose of the Document
   - Scope of the Project
   - Technologies Used

2. Backend API Documentation
   - Endpoints
   - Request and Response Examples
   - Authentication and Authorization

3. Frontend Documentation
   - Components and Views
   - Data Flow and State Management
   - UI Screenshots

4. Entity-Relationship (ER) Diagram

---

## 1. Introduction

### Purpose of the Document

The purpose of this document is to provide detailed documentation for the Vacation Rental Platform. It includes information about the backend API, frontend components, data flow, and the database schema (ER Diagram). This documentation serves as a comprehensive guide for developers, stakeholders, and team members involved in the development and maintenance of the platform.

### Scope of the Project

The Vacation Rental Platform allows hosts to list their properties, guests to book those properties, and provides a seamless user experience for managing bookings. The platform includes features like property listing, booking management, host and guest profiles, and more.

### Technologies Used

- Backend:
  - Node.js
  - Express.js
  - MongoDB (Database)
  - Mongoose (ODM)

- Frontend:
  - React (JavaScript Framework)
  - HTML/CSS

---

## 2. Backend API Documentation

The backend API of the Vacation Rental Platform provides endpoints for handling various operations related to hosts, properties, guests, and bookings. Below are the main endpoints:

**Hosts:**

- `POST /api/hosts`: Create a new host.
- `GET /api/hosts/:id`: Get host details by ID.
- `PUT /api/hosts/:id`: Update host details by ID.
- `DELETE /api/hosts/:id`: Delete host by ID.

**Properties:**

- `POST /api/properties`: Create a new property listing.
- `GET /api/properties/:id`: Get property details by ID.
- `PUT /api/properties/:id`: Update property details by ID.
- `DELETE /api/properties/:id`: Delete property by ID.
- `GET /api/properties`: Get all properties.
- `GET /api/properties/filter`: Filter properties by location or type.
- `GET /api/properties/sort`: Sort properties by price or rating.

**Guests:**

- `POST /api/guests`: Create a new guest.
- `GET /api/guests/:id`: Get guest details by ID.
- `PUT /api/guests/:id`: Update guest details by ID.
- `DELETE /api/guests/:id`: Delete guest by ID.

**Bookings:**

- `POST /api/bookings`: Create a new booking.
- `GET /api/bookings/:id`: Get booking details by ID.
- `PUT /api/bookings/:id`: Update booking details by ID.
- `DELETE /api/bookings/:id`: Delete booking by ID.
- `GET /api/bookings/guest/:guestId`: Get all bookings of a guest.
- `GET /api/bookings/property/:propertyId`: Get all bookings of a property.

### Request and Response Examples

- **Create Host Request:**
  ```
  POST /api/hosts
  {
    "name": "John Doe",
    "host_status": "Active",
    "location": "New York",
    "property_type": "Apartment",
    "about": "Experienced host with a cozy apartment in the heart of NYC.",
    "hosting_since": "2015-08-20"
  }
  ```

- **Create Host Response:**
  ```
  Status: 201 Created
  {
    "_id": "615a6e08d3497a001c883c4f",
    "name": "John Doe",
    "host_status": "Active",
    "location": "New York",
    "property_type": "Apartment",
    "about": "Experienced host with a cozy apartment in the heart of NYC.",
    "hosting_since": "2015-08-20",
    "__v": 0
  }
  ```

*(Similar request and response examples for other endpoints can be provided)*

### Authentication and Authorization

The API endpoints that require authentication and authorization (e.g., creating/editing hosts, properties, guests, and bookings) use JSON Web Tokens (JWT) for secure access. Only authenticated users (hosts and guests) can perform authorized actions.

---

## 3. Frontend Documentation

The frontend of the Vacation Rental Platform is built using React and follows a component-based architecture. Below are the main components and views:

**Components:**

- `GuestNavbar`: The navigation bar for guest users.
- `HostNavbar`: The navigation bar for host users.
- `PropertyCard`: Represents a property listing with details and a "Select" button.
- `GuestForm`: Form for guest registration.
- `GuestLogin`: Form for guest login.
- `GuestDetails`: Displays guest details and booked properties.
- `BookingForm`: Form for creating a new booking.
- `BookingPropertyList`: Lists all properties for booking.

**Views:**

- `Home`: Home page with login/register options for guests.
- `HostDashboard`: Dashboard for host users to manage properties and bookings.
- `GuestDashboard`: Dashboard for guest users to view details and bookings.

### Data Flow and State Management

The frontend uses React's state and props for data flow and state management. Axios is used to make API requests to the backend for data retrieval and manipulation.

### UI Screenshots

*(Screenshots of UI components and views can be provided here)*

---

## 4. Entity-Relationship (ER) Diagram

Below is the Entity-Relationship (ER) Diagram representing the database schema of the Vacation Rental Platform:

```
+-----------------+           +-----------------+
|       Host      |           |     Property    |
+-----------------+           +-----------------+
| id (PK)         |<----------| id (PK)         |
| name            |           | host_id (FK)    |
| host_status     |           | property_name   |
| location        |           | description     |
| property_type   |           | price           |
| about           |           | location        |
| hosting_since   |           | property_type   |
+-----------------+           +-----------------+
          |
          |
          |
+-----------------+           +-----------------+
|      Guest      |           |     Booking     |
+-----------------+           +-----------------+
| id (PK)         |---------->| id (PK)         |
| name            |           | property_id (FK)|
| gender          |           | guest_id (FK)   |
| date_of_birth   |           | check_in_date   |
| bio             |           | check_out_date  |
+-----------------+           +-----------------+
```

The ER Diagram represents the relationships between the main entities: Host, Property, Guest, and Booking. It shows how the tables are connected through primary and foreign keys.

---

This documentation provides a comprehensive guide to the Vacation Rental Platform, including the backend API, frontend components, data flow, and the database schema. Developers can use this information to understand and work on the different aspects of the platform effectively.