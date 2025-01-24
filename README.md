# README.md

# IMF Gadget API

## Overview

The IMF Gadget API is a secure RESTful API designed to manage gadgets for the Impossible Missions Force (IMF). This API allows users to retrieve, add, update, and decommission gadgets, ensuring a robust inventory management system.

## Features

- **Gadget Inventory Management**: 
  - Retrieve a list of all gadgets with a randomly generated "mission success probability".
  - Add new gadgets with unique codenames.
  - Update existing gadget information.
  - Decommission gadgets instead of deleting them.

- **Self-Destruct Sequence**: 
  - Trigger a self-destruct sequence for specific gadgets with a confirmation code.

- **Authentication and Authorization**: 
  - Secure the API using JWT for robust authentication.

- **Filtering**: 
  - Retrieve gadgets based on their status.

## Technologies Used

- Node.js
- Express
- PostgreSQL
- TypeScript
- JWT for authentication

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd imf-gadget-api
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory and add your database connection string and secret keys.

4. **Run the application**:
   ```
   npm run start
   ```

## Contribution

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
