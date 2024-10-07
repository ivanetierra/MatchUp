# Matchup

**Matchup** is a sports event app that allows users to create and join sports events with ease. The app is built using Angular, Firebase, and Tailwind for styling.

## Features

- Create sports events
- Join existing sports events
- User authentication and management (via Firebase)
- Responsive design using Tailwind CSS

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Angular CLI](https://angular.io/cli) (version 18 or higher)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/matchup.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd matchup
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Run the app:**

    ```bash
    ng serve
    ```

5. **Open your browser:**

    Navigate to [http://localhost:4200](http://localhost:4200) to view the app.

## Firebase Setup

Make sure to set up your Firebase project and include your Firebase credentials in `environment.ts`. Here is a sample structure:

```typescript
export const environment = {
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT_ID.appspot.com',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID'
  },
  production: false
};
