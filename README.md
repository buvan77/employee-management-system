# 🏢 EMS Portal - Enterprise Employee Management System

A production-ready, secure full-stack administrative workspace built with a high-performance **React** frontend and a robust **Spring Boot REST API** microservices architecture, backed by a **PostgreSQL** relational database.

---

## 🔒 Key Architectural Highlights
* **Stateless Authentication:** Fully integrated **Spring Security** token filter chain utilizing **JSON Web Tokens (JWT)** to guard secure enterprise endpoints.
* **Client-Side Guarding:** Implemented advanced private routing engine states in React with automated **Axios Request Interceptors** to dynamically inject Bearer tokens.
* **Live System Metrics:** Real-time synchronized dashboard tracking total active, on-leave, and resigned metrics fetched through transactional database aggregation pipelines.

---

## 🛠️ Technology Stack Matrix
* **Frontend:** React (Vite), React Router DOM, Axios, Bootstrap 5
* **Backend:** Java, Spring Boot, Spring Security, Spring Data JPA
* **Database:** PostgreSQL
* **Build Tools:** Maven, npm

---


## 🚀 Local Deployment Setup

### Prerequisites
* Java JDK 17 or higher
* Node.js (v18+)
* PostgreSQL running instance

### 1. Backend Initialization

```cd employee-management-system
# Configure your application.properties file with your PostgreSQL credentials
mvn clean install
mvn spring-boot:run
```

### 2. Frontend Initialization
```
cd frontend
npm install
npm run build
npm run preview
```
