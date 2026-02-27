# Paysis — Simple Payment System (Example API)
Created by **Dusty Dump**

## Description
Paysis is a sample payment system that simulates a typical payment service. It consists of a collection of REST API endpoints exposed by the Paysis API server.

The API supports standard CRUD operations (**Create, Read, Update, Delete**) and includes authentication based on **Bearer tokens**. You can provide the token in either of the following ways:

- Using the `Authorization` request header (recommended):
  - `Authorization: Bearer <token>`
- Using your API client’s built-in **Bearer Token** authorization type (for example, in Postman)

This API is intentionally simple and stable (designed to be “bug-free” for learning and testing). It does **not** ship with preloaded data. All entities created via the API are stored temporarily in a data file, represented as arrays of **users** and **transactions**.

Because the service uses ephemeral storage, the server may reset when it enters sleep mode (depending on hosting), which clears stored data. Data can also be cleared manually using the **Delete Config** endpoint.

Detailed information about available endpoints is provided below. Each endpoint includes examples of both successful and unsuccessful requests.

> **Note:** This project was created for educational purposes and has been made public to support multi-user access for students.


## Story
As an administrator, you can log in with an admin role to create and manage users, as well as transactions associated with those users. Additionally, you can make minor adjustments to the server configuration.

## Testing
This repository includes automated **API tests** intended to validate the Paysis endpoints and demonstrate good API testing practices.

Typical coverage includes:
- **Authentication flows**
  - obtaining/using Bearer tokens
  - handling missing/invalid tokens
- **CRUD operations**
  - creating, reading, updating, and deleting users/transactions/configuration
- **Validation and negative cases**
  - malformed requests, missing fields, invalid IDs
  - correct HTTP status codes and error payloads
- **Environment/state handling**
  - setup/cleanup steps for repeatable runs (including clearing data via **Delete Config**)
  - ensuring tests do not depend on preloaded data

If the API resets (sleep mode / redeploy), tests are expected to be able to re-create required state (or start from a clean state using the cleanup endpoint).

---

## Dependencies

### Server dependencies
- **express** — Web server framework used to expose the Paysis REST API endpoints.
- **body-parser** — Middleware for parsing incoming request bodies (commonly JSON / urlencoded).  
  *(Note: in modern Express, some of this is available via `express.json()` / `express.urlencoded()`.)*
- **uuid** — Generates unique identifiers (for example, for user and transaction IDs).
- **dotenv** — Loads environment variables from a `.env` file for local configuration (ports, secrets, etc.).

### Test dependencies
- **mocha** — Test runner used to execute the API test suites (`npm test` runs Mocha with `.mocharc.js`).
- **chai** — Assertion library used to express expectations in tests (e.g., status codes, response payload checks).
- **supertest** — HTTP testing library for exercising Express APIs (request building + response assertions), commonly used for API/integration tests.

### Build / tooling dependencies (supporting both server and tests)
- **@babel/core**, **@babel/cli**, **@babel/preset-env**, **@babel/register** — Babel toolchain for transpiling/running modern JavaScript features in Node and/or tests.
- **@babel/plugin-transform-runtime** — Optimizes Babel output and avoids duplication of helper code.
