const mongoose = require('mongoose');

// This is the schema. It tells Mongoose what our data looks like.
// Think of it as a blueprint for a "User" in our database.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // This means a name MUST be provided
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});

// We export the model so we can use it in our server.js file
module.exports = mongoose.model('User', userSchema);
