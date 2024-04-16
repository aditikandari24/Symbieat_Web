const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
app.use(cors())

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://Aanchalm192:uibZ8UL0xXaxqPMB@cluster0.2zaspag.mongodb.net/Symbi", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB", err);
});

const signupSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(value) {
        return value === this.password;
      },
      message: 'Passwords do not match'
    }
  }
});

const Signup = mongoose.model('Signup', signupSchema);

// Define a user schema and model for login
const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Login = mongoose.model('Login', loginSchema);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle signup
app.post('/api/signup', async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;
  console.log("Request body:", req.body); // Log the request body for debugging
  if (firstname && lastname && email && password && confirmPassword) {
    if (password === confirmPassword) {
      try {
        const newSignup = new Signup({ firstname, lastname, email, password, confirmPassword });
        await newSignup.save();
        res.status(201).json({ message: 'Signup successful', signup: newSignup });
      } catch (error) {
        console.error('Error creating signup:', error);
        res.status(500).json({ message: 'Error creating signup' });
      }
    } else {
      res.status(400).json({ message: 'Passwords do not match' });
    }
  } else {
    res.status(400).json({ message: 'Please fill in all required fields' });
  }
});

// Endpoint to handle login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await Signup.findOne({ email });

    // If user not found or password doesn't match, return error
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Authentication successful
    return res.json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
