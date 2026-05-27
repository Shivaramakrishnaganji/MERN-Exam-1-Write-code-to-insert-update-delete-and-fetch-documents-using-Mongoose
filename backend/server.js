const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); 

const app = express();


app.use(cors()); 
app.use(express.json()); 


mongoose.connect('mongodb://127.0.0.1:27017/assignment4_db')
  .then(() => console.log('Connected to MongoDB perfectly!'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));





app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    });
    
  
    const savedUser = await newUser.save(); 
    res.status(201).json(savedUser); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while saving" });
  }
});


app.get('/api/users', async (req, res) => {
  try {
    const allUsers = await User.find(); 
    res.status(200).json(allUsers); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while fetching" });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id; 
    const updatedData = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    };
    
   
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while updating" });
  }
});


app.delete('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id; 
    

    await User.findByIdAndDelete(userId); 
    
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error while deleting" });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT}`);
});
