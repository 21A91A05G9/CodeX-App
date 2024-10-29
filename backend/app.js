const express = require("express");
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 
// const axios = require("axios");
const cors = require("cors");
const User = require('./UserDetails');
const CodingProfile = require('./CodingProfile')
const jwt = require("jsonwebtoken");
const scrapper = require("./API/codechefScraper");


const JWT_SECRET = "codex";


const app = express();
app.use(cors()); 
app.use(bodyParser.json()); 

const mongourl = "mongodb+srv://prudhvikarri9121:uo8lYRMH6YVfzKNQ@cluster0.atlz1cr.mongodb.net/CodeX?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database is connected");
    })
    .catch((e) => {
        console.log(e);
    });

app.get("/", (req, res) => {
    res.send({ status: "started" });
});

// POST endpoint to register a new user
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("Register API called")
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists please login' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        const codingProfile = new CodingProfile({
            user: email, // Reference the user's email
            name: name,
            platforms: {
                leetcode: '',
                codechef: '',
                geekforgeeks: '',
                // Add more platforms as needed
            }
        });
        await codingProfile.save();
        res.status(201).send({ status: 'ok', user: savedUser });
    } catch (error) {
       // console.error('Error saving user:', error);
        res.status(500).json({ error: 'Could not save user' });
    }
});



app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const oldUser = await User.findOne({ email: email });
  
    if (!oldUser) {
      return res.status(400).send({ error: "User doesn't exist!! please signup" });
    }
  
    const passwordMatch = await bcrypt.compare(password, oldUser.password);
    if (!passwordMatch) {
      return res.status(400).send({ error: "Incorrect password" });
    }
  
    const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);
    console.log(token);
    res.status(201).send({
      status: "ok",
      data: token,
    });
});

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

// Update username endpoint
app.post('/update-username', verifyToken, async (req, res) => {
    const { platform, username } = req.body;
    const userEmail = req.user.email;

    try {
        // Check if the user exists in the database
        const existingProfile = await CodingProfile.findOne({ user: userEmail });
        if (!existingProfile) {
            return res.status(404).json({ error: 'User profile not found' });
        }

        // Update the username for the specified platform
        existingProfile.platforms[platform] = username;
        await existingProfile.save();

        res.status(200).json({ message: `Username updated for ${platform}` });
    } catch (error) {
        console.error('Error updating username:', error);
        res.status(500).json({ error: 'An error occurred while updating username' });
    }
});


app.get('/check-username', verifyToken, async (req, res) => {
    try {
        console.log("Checking username...");
        console.log("User email:", req.user.email);
        
        const existingProfile = await CodingProfile.findOne({ user: req.user.email });
        console.log("Existing profile:", existingProfile);

        const usernames = {};
        if (existingProfile) {
            Object.entries(existingProfile.platforms).forEach(([platform, username]) => {
                usernames[platform] = username !== ''; // Check if username exists for each platform
            });
        }
        console.log("Usernames:", usernames);
        res.status(200).json(usernames);
    } catch (error) {
        console.error('Error checking username:', error);
        res.status(500).json({ error: 'An error occurred while checking username' });
    }
});

  


app.get("/contests", async (req, res) => {
    try {
        const data = await scrapper();
        res.json(data);
    } catch (error) {
        console.error("Error scraping contest data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



app.post('/plat_details',verifyToken, async (req, res) => {
    // const { platform, username } = req.body;
    const userEmail = req.user.email;

    try {
        // Check if the user exists in the database
        const existingProfile = await CodingProfile.findOne({ user: userEmail });
        if (!existingProfile) {
            return res.status(404).json({ error: 'User profile not found' });
        }
        res.send(existingProfile)
    }
    catch{

    }
    
});

// Password change endpoint
app.post('/api/change-password', async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
    console.log(req.body); // Corrected console.log
    try {
      // Find the user by email in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Check if the current password matches
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Current password is incorrect.' });
      }
  
      // Hash the new password and update it in the database
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password
      user.password = hashedPassword; // Set the new hashed password
      await user.save(); // Save the updated user document
  
      res.status(200).json({ message: 'Password changed successfully!' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ message: 'An error occurred while changing the password.' });
    }
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});