# E-commerce Marketplace Backend

This repository contains the backend implementation of an e-commerce marketplace using Node.js, Express.js, and MongoDB.

## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js and npm (Node Package Manager)
- MongoDB

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/gaurav147-star/backend-UnityLabs.git
   ```

2. Install Dependencies:
   ```bash
   cd backend-UnityLabs
   npm install
   ```
3. Set up environment variables:

   ```bash
   MONGODB_URI=YOUR_MONGODB_URI
   JWT_SECRET=YOUR_JWT_SECRET

   ```

4. Start the server:
   ```bash
   npm run server
   ```

## API Endpoints

### Authentication

#### Register a new user

- `POST /api/auth/register`: Register a new user.
  - Accepts username, password, and user type in the request body.

#### Login

- `POST /api/auth/login`: Login with username and password to receive a JWT token.
  - Accepts username and password in the request body.

### Buyer APIs

#### Get a list of all sellers

- `GET /api/buyer/list-of-sellers`: Get a list of all sellers.

#### Get seller's catalog by ID

- `GET /api/buyer/seller-catalog/:seller_id`: Get the catalog of a specific seller by ID.
  - Replace `:seller_id` with the ID of the seller.

#### Create an order for a specific seller

- `POST /api/buyer/create-order/:seller_id`: Create an order for a specific seller.
  - Accepts a list of items in the request body.
  - Replace `:seller_id` with the ID of the seller.

### Seller APIs

#### Create a catalog for a seller

- `POST /api/seller/create-catalog`: Create a catalog of items for a seller.
  - Accepts a list of items in the request body.

#### Get orders received by a seller

- `GET /api/seller/orders`: Get the list of orders received by a seller.
