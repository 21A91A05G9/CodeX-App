# CodeX App

**CodeX App** is a comprehensive platform that streamlines coding practice and enhances the coding experience. Built with the MERN stack (MongoDB, Express, React, Node.js), CodeX App integrates popular coding platforms like LeetCode and GeeksforGeeks, offering real-time contest tracking, problem-solving practice, and a dynamic user interface designed to cater to coding enthusiasts.  

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## Demo
- You can check out the live demo of the Codex App [here](https://drive.google.com/file/d/1bIz0BU78zMKFTDCSmmYmvqWecaQT_oJ3/view).


## Features

- **Integration with Coding Platforms**: Access problems from LeetCode, GeeksforGeeks, and other popular platforms to practice directly within the app.
- **Real-Time Contest Tracking**: Stay updated on ongoing and upcoming coding contests, providing a unified view to help users prepare effectively.
- **User-Friendly Interface**: Built with React Native, the app offers a responsive and visually appealing design.
- **Authentication**: Secure user registration and login to personalize each user’s experience.
- **Profile System**: View your profile, track your progress effectively.
- **Chatbot Assistance**: Provides assistance for common queries within the app, utilizing an OpenAI-powered chatbot.


## Technology Stack
- **Frontend:**  React Native, HTML, CSS, JavaScript, Bootstrap
- **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **External APIs**: LeetCode API, GeeksforGeeks API, CodeChef API, OpenAI API
- **Authentication**: JSON Web Tokens (JWT)

## Installation

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) and npm
- [MongoDB](https://www.mongodb.com/) installed and running, or use a MongoDB cloud service like MongoDB Atlas
- Access to API keys for LeetCode, GeeksforGeeks, and OpenAI (store these securely in your `.env` file)


1. **Clone the Repository**

   ```bash
   git clone https://github.com/21A91A05G9/CodeX-App.git
   cd CodeX-App

2. **Backent Setup:**
- Navigate to the backend folder:
  ```bash
  cd Backend
  
- Install dependencies:
  ```bash
  npm install
  
- Set up environment variables as described below.
  Create a `.env` file in both the backtend and add the following variables:
    ```bash
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret

3. **Frontend Setup:**

- Navigate to the frontend folder:
  ```bash
  cd ../Frontend
  
- Set up the frontend environment variables as described below.
  Create a `.env` file in both the frontend and add the following variables:
    ```bash
    OPENAI_API_KEY=your-openai-api-key
    CLIST_API_URL=https://clist.by/api/v4/contest/
    CLIST_API_USERNAME=your_user_name
    CLIST_API_KEY=your_api_key_here

4. **Start the App:**

- Start the backend server:
  ```bash
  node app.js
  
- Start the frontend server:
  ```bash
  expo start
  
- Install dependencies:
   ```bash
  npm install
    
The backend will run on http://localhost:5000, and the frontend will run on http://localhost:3000 by default.



## Usage

- **Register/Login**: Create an account or log in to access all features.
<div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
  <img src="https://github.com/user-attachments/assets/5c268d83-1482-4788-81e6-73d7e427a50e" width="100" height="100" alt="Image 1">
  <img src="https://github.com/user-attachments/assets/7f085485-51c0-4437-ada2-1fcae20444ad" width="100" height="100" alt="Image 2">
  <img src="https://github.com/user-attachments/assets/b386354e-a1d5-4a6a-b2ac-404553ad6536" width="100" height="100" alt="Image 3">
  <img src="https://github.com/user-attachments/assets/7033ea33-1f1a-4d40-92ec-704fdef05554" width="100" height="100" alt="Image 4">
</div>





  
- **Home Page and Profile**: View your dashboard and manage your profile settings.
- **Contest Tracking**: View active contests and filter based on preferences.
- **Problem-Solving**: Select coding problems to solve from integrated platforms.
- **Chatbot Assistance**: Use the chatbot for help, accessible in the app’s UI.


## Project Structure
      CodeX/
      ├── Backend/                  # Backend code
      │   ├── models/               # Database models
      │   ├── API/                  # API routes
      │   ├── .env                  # Backend Environment variables
      │   ├── package.json          # Backend dependencies
      │   └── App.js                # Backend entry point
      ├── Frontend/                 # Frontend code
      │   ├── assets/               # Public assets
      │   ├── screens/              # React Native components and logic
      │   ├── package.json          # Frontend dependencies
      │   └── .env                  # Frontend environment variables
      └── README.md                 # Project documentation


## Future Enhancements

- **Additional Language Support**: Expand the app’s language options for a more inclusive experience.
- **Improved Contest Notifications**: Implement reminder notifications for upcoming contests.
- **Dark Mode**: Offer a dark mode for better user accessibility and eye comfort.
- **Ranking System**: Cmpare ranks with other users to boost motivation.



## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch-name
   
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   
4. Push to the branch:
   ```bash
   git push origin feature-branch-name
   
5. Open a pull request.
