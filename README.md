# CodeX App

**CodeX App** is a comprehensive platform that streamlines coding practice and enhances the coding experience. Built with the MERN stack (MongoDB, Express, React, Node.js), CodeX App integrates popular coding platforms like LeetCode and GeeksforGeeks, offering real-time contest tracking, problem-solving practice, and a dynamic user interface designed to cater to coding enthusiasts.  

<div style="display: flex; overflow-x: auto;">
    <img src="https://github.com/user-attachments/assets/af1ad116-756d-4587-a363-91ec0d5355e1" alt="Image 1" width="200" height="auto" style="margin-right: 10px;" />
    <img src="https://github.com/user-attachments/assets/e718e429-1622-4053-83b2-9235555a2192" alt="Image 2" width="200" height="auto" style="margin-right: 10px;" />
    <img src="https://github.com/user-attachments/assets/21265bd8-d9f3-4171-83da-a74932ca0e7e" alt="Image 3" width="200" height="auto" />
</div>


## Features

- **Integration with Coding Platforms**: Access problems from LeetCode, GeeksforGeeks, and other popular platforms to practice directly within the app.
- **Real-Time Contest Tracking**: Stay updated on ongoing and upcoming coding contests, providing a unified view to help users prepare effectively.
- **User-Friendly Interface**: Built with React Native, the app offers a responsive and visually appealing design.
- **Authentication**: Secure user registration and login to personalize each user’s experience.
- **Profile System**: View your profile, track your progress effectively.
- **Chatbot Assistance**: Provides assistance for common queries within the app, utilizing an OpenAI-powered chatbot.


## Technologies Used

- **Frontend**: React Native, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **External APIs**: LeetCode API, GeeksforGeeks API, CodeChef API, OpenAI API
- **Authentication**: JSON Web Tokens (JWT)


## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB installed and running, or use a MongoDB cloud service like MongoDB Atlas
- Access to API keys for LeetCode, GeeksforGeeks, and OpenAI (store these securely in your `.env` file)


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

    # .env file example for frontend

    OPENAI_API_KEY=your-openai-api-key
    CLIST_API_URL=https://clist.by/api/v4/contest/
    CLIST_API_USERNAME=your_user_name
    CLIST_API_KEY=your_api_key_here
   
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



## Usage

- **Register/Login**: Create an account or log in to access all features.

<div style="display: flex; overflow-x: auto;">
    <img src="https://github.com/user-attachments/assets/9835ccc3-32d2-4e22-88f7-096f6d32f3ff" alt="Register/Login" width="200" height="auto" style="margin-right: 10px;" />
    <img src="https://github.com/user-attachments/assets/50bb43dd-ad7d-42c5-9f5f-8023f6213c6b" alt="Login Success" width="200" height="auto" style="margin-right: 10px;" />
    <img src="https://github.com/user-attachments/assets/974581a6-7f2b-4629-b569-19afef84f4d2" alt="Forgot Password" width="200" height="auto" />
</div>

- **Home Page and Profile**: View your dashboard and manage your profile settings.

<div style="display: flex; overflow-x: auto;">
    <img src="https://github.com/user-attachments/assets/badf1070-57db-45e3-8459-4c868c3c6cc1" alt="Home Page" width="200" height="auto" style="margin-right: 10px;" />
    <img src="https://github.com/user-attachments/assets/90dea2a9-b0a2-46e7-9dc8-25105886087b" alt="Dashboard" width="200" height="auto" style="margin-right: 10px;" />
    <img src="https://github.com/user-attachments/assets/9c241259-3b71-4d5d-8766-b05662b73d0f" alt="Profile" width="200" height="auto" style="margin-right: 10px;" />
    <img src="https://github.com/user-attachments/assets/e08faa31-2024-4b0b-9fc2-659994fb5ffe" alt="Edit Profile" width="200" height="auto" />
</div>

- **Contest Tracking**: View active contests and filter based on preferences.

<div style="display: flex; overflow-x: auto;">
    <img src="https://github.com/user-attachments/assets/e00727b8-4f9d-4841-8a28-5a10faecb4b0" alt="Contest Tracking" width="200" height="auto" />
</div>

- **Problem-Solving**: Select coding problems to solve from integrated platforms.

<div style="display: flex; overflow-x: auto;">
    <img src="https://github.com/user-attachments/assets/a3767fbd-bc4d-443a-a8cf-e39a7e28a656" alt="Problem Selection" width="200" height="auto" style="margin-right: 10px;" />
    <img src="https://github.com/user-attachments/assets/53c91aee-1328-4409-b05f-fec75dc5fb79" alt="Problem Selection" width="200" height="auto" />
</div>


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

- Fork the repository.
- Create a new branch (git checkout -b feature/your-feature).
- Commit your changes (git commit -m 'Add some feature').
- Push to the branch (git push origin feature/your-feature).
- Open a Pull Request.

