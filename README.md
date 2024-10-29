# CodeX App

**CodeX App** is a comprehensive platform that streamlines coding practice and enhances the coding experience. Built with the MERN stack (MongoDB, Express, React, Node.js), CodeX App integrates popular coding platforms like LeetCode and GeeksforGeeks, offering real-time contest tracking, problem-solving practice, and a dynamic user interface designed to cater to coding enthusiasts.  

---

## Features

- **Integration with Coding Platforms**: Access problems from LeetCode, GeeksforGeeks, and other popular platforms to practice directly within the app.
- **Real-Time Contest Tracking**: Stay updated on ongoing and upcoming coding contests, providing a unified view to help users prepare effectively.
- **User-Friendly Interface**: Built with React Native, the app offers a responsive and visually appealing design.
- **Authentication**: Secure user registration and login to personalize each user’s experience.
- **Profile and Ranking System**: View your profile, track your progress, and compare ranks with other users to boost motivation.
- **Chatbot Assistance**: Provides assistance for common queries within the app, utilizing an OpenAI-powered chatbot.

## Future Enhancements

- **Additional Language Support**: Expand the app’s language options for a more inclusive experience.
- **Improved Contest Notifications**: Implement reminder notifications for upcoming contests.
- **Dark Mode**: Offer a dark mode for better user accessibility and eye comfort.
  
---

## Technologies Used

- **Frontend**: React Native, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **External APIs**: LeetCode API, GeeksforGeeks API, CodeChef API, OpenAI API
- **Authentication**: JSON Web Tokens (JWT)

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB installed and running, or use a MongoDB cloud service like MongoDB Atlas
- Access to API keys for LeetCode, GeeksforGeeks, and OpenAI (store these securely in your `.env` file)

---

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/21A91A05G9/CodeX-App.git
   cd CodeX-App

2. **Set Up Environment Variables**
Create a .env file in both the frontend and backend directories and add the necessary keys. Here’s an example:
   ```bash
    # .env file example for backend

    MONGODB_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    OPENAI_API_KEY=your-openai-api-key
   
3. Install Dependencies
Navigate to each directory (frontend and backend) and install the dependencies:
    ```bash
    # In frontend/
    npm install

    # In backend/
    npm install
  
4. Run the App
In separate terminal windows for the frontend and backend:

    ```bash
    # Run backend
    cd backend
    npm start

    # Run frontend
    cd frontend
    npm start
    
The backend will run on http://localhost:5000, and the frontend will run on http://localhost:3000 by default.

---

## Usage
- **Register/Login**: Create an account or log in to access all features.
- **Contest Tracking**: View active contests and filter based on preferences.
- **Problem-Solving**: Select coding problems to solve from integrated platforms.
- **Chatbot Assistance**: Use the chatbot for help, accessible in the app’s UI.

---

## Contributing
Contributions are welcome! Please follow these steps:

- Fork the repository.
- Create a new branch (git checkout -b feature/your-feature).
- Commit your changes (git commit -m 'Add some feature').
- Push to the branch (git push origin feature/your-feature).
- Open a Pull Request.

