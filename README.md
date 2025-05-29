# Vaka Web3 App

This project is a full-stack web3 authentication platform built with [Next.js](https://nextjs.org/) for the frontend and a GraphQL API server (Apollo Server) for the backend. It supports Cardano wallet authentication, email-based registration, and policy-based access control, using MongoDB as the database and AWS SES for email delivery.

## Project Structure

```
.
├── api/        # GraphQL API server (Node.js, Apollo, MongoDB, Cardano, AWS SES)
├── app/        # Next.js frontend application
├── docker-compose.yml
├── README.md
```

### `api/` - GraphQL API Server ⚡

- Built with Node.js, Apollo Server, MikroORM (MongoDB), and Cardano libraries.
- Handles user registration (email or wallet), login, OTP/email verification, and policy-based authentication.
- Integrates with AWS SES for sending verification emails.
- Exposes GraphQL endpoints for authentication and user management.
- Can run locally or as an AWS Lambda function (see `serverless.yml`).

### `app/` - Next.js Frontend 🖥️

- React-based UI for registration, login, and profile management.
- Integrates with the backend via GraphQL and custom web3 authentication provider.
- Uses Material UI for styling and components.
- Supports Cardano wallet login and email-based flows.

## Getting Started

### Prerequisites 📋

- Node.js 18+
- Docker & Docker Compose (for local development)
- MongoDB (or use Docker Compose service)
- AWS credentials (for SES and MongoDB IAM, if using cloud resources)

## Local Development 🐳

You can develop locally using either Docker Compose (recommended for most users) or by running each service manually with npm.

### 1. Using Docker Compose

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-org/vaka-web3.git
   cd vaka-web3
   ```

2. **Copy and configure the unified environment file:**

   - Copy the root sample env file:
     ```sh
     cp sample.env .env
     ```
   - Edit `.env` in the root directory with your credentials and settings. This unified file will be used by both API and App when running with Docker Compose.

3. **Build and start all services:**

   ```sh
   docker-compose up --build
   ```

   - API will be available at [http://localhost:9001](http://localhost:9001) ⚡
   - App will be available at [http://localhost:3001](http://localhost:3001) 🖥️

4. **Access the Frontend:**

   Open [http://localhost:3001](http://localhost:3001) in your browser.

### 2. Manual Local Setup (without Docker)

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-org/vaka-web3.git
   cd vaka-web3
   ```

2. **Copy and configure environment variables:**

   - For API:  
     `cp api/sample.env api/.env`  
     Edit `api/.env` with your credentials and settings.
   - For App:  
     `cp app/sample.env app/.env`  
     Edit `app/.env` as needed.

3. **Install dependencies and start each service:**

   - **API:**

     ```sh
     cd api
     npm install
     npm run start:dev
     ```

   - **App:**

     Open a new terminal, then:

     ```sh
     cd app
     npm install
     npm run dev
     ```

   - API will be available at [http://localhost:9001](http://localhost:9001)
   - App will be available at [http://localhost:3001](http://localhost:3001)

## Deployment 🚢

- The API is configured for AWS Lambda deployment using Serverless Framework.
- See [`api/serverless.yml`](api/serverless.yml) for configuration and deployment commands.

## Features ✨

- Cardano wallet authentication (signature verification) 🔑
- Email-based registration and OTP/email verification 📧
- Policy ID and asset-based access control 🛡️
- JWT-based session management 🪪
- MongoDB for user and wallet storage 🍃
- AWS SES for transactional emails ✉️
- Fully typed with TypeScript 📝

## Useful Scripts 🛠️

- **Generate JWT keys:**  
  `api/scripts/gen.sh`

- **Start API in development:**  
  `npm run start:dev` (in [`api`](api))

- **Start App in development:**  
  `npm run dev` (in [`app`](app))

