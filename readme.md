# Field Pulse

## Overview

This application is designed to maintain and track the pulse, status, and meetings/reports of clients, allowing management to monitor client account traceability efficiently. It provides tools for logging client interactions, generating reports, and maintaining an overview of client health and engagement.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Scripts](#scripts)
- [Pre-Commit Hooks](#pre-commit-hooks)
- [PWA Support](#pwa-support)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or Yarn (>= 1.x)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://solbaacken.git.beanstalkapp.com/field_pullse_frontend.git
   cd field-pulse-frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   # or if you prefer Yarn
   yarn install
   ```

3. **Setup Environment Variables:**
   Create a `.env` file in the root directory and add necessary environment variables:
   ```env
   REACT_APP_API_URL=https://api.example.com
   ```

## Running the Application

To run the application locally:

```bash
npm start
# or
yarn start
```

This will start the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Folder Structure

```plaintext
src/
├── assets/        # Static assets like images, fonts, etc.
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── pages/         # Main pages of the application
├── services/      # API service calls
├── utils/         # Utility functions
├── App.js         # Main App component
└── index.js       # Entry point of the application
```

## Scripts

Here are some useful scripts you can run:

- **Start Development Server:**

  ```bash
  npm start
  ```

- **Build for Production:**

  ```bash
  npm run build
  ```

- **Run Tests:**

  ```bash
  npm test
  ```

- **Lint the Code:**

  ```bash
  npm run lint
  ```

- **Format the Code:**
  ```bash
  npm run format:fix
  ```

## Pre-Commit Hooks

This project uses [Husky](https://typicode.github.io/husky) to enforce code quality with pre-commit hooks. The following tasks are automatically performed before each commit:

- **Linting:** Code is checked for style issues.
- **Formatting:** Code is automatically formatted with Prettier.

To set up Husky, run:

```bash
npx husky install
```

## PWA Support

This application supports Progressive Web App (PWA) features, providing offline functionality and an enhanced user experience on mobile devices. The PWA is configured out of the box with a custom service worker.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/new-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
