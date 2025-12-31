Clutter Backend is a Node.js–based REST API designed to handle authentication and user verification for the Clutter application. The service focuses on secure, scalable user onboarding using OTP-based email verification and clean separation of authentication concerns.

This backend is currently under active development and is being built with production-readiness, security, and extensibility in mind.

Project Purpose
The goal of this backend is to provide a robust authentication layer that can scale with the Clutter frontend. Rather than treating authentication as a simple feature, this project emphasizes:

* Proper OTP lifecycle management
* Secure user verification flows
* Clean API design
* Backend-first architectural thinking

Implemented Features
Authentication:
* User signup with email-based OTP generation
* User login with credential validation
* Email verification using time-bound OTPs

OTP Management:
* OTP verification with expiry validation
* OTP reset / regeneration for expired OTPs
* Single active OTP per user
* Explicit separation between OTP verification and OTP reset flows

User State Handling:
* Verified vs unverified user states
* Prevention of OTP reset for verified users
* Controlled OTP regeneration to prevent abuse

Tech Stack
* Runtime: Node.js
* Framework: Express.js
* Database: MongoDB (via Mongoose)
* Authentication: Custom auth logic (JWT planned)
* OTP Handling: Time-based OTPs with expiry checks

Current Status
* Core authentication routes implemented
* OTP verification and reset logic completed
* Backend not yet hosted
* Email delivery and JWT integration in progress
* This project is actively evolving and will continue to expand in scope.

Planned Enhancements
* JWT-based authentication and protected routes
* Email service integration for OTP delivery
* Rate limiting and abuse protection
* Refresh tokens and session management
* Password reset functionality
* API documentation (Swagger / OpenAPI)
* Logging and monitoring