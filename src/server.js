const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/vehicledatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Define Mongoose schemas and models
const vehicleSchema = new mongoose.Schema({
  vehicleNumber: String,
  companyName: String,
  price: Number,
  engineCC: Number,
  torque: String,
  insuranceNumber: String,
  expiryDate: Date,
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
const Admin = mongoose.model('Admin', adminSchema);

// Endpoint for admin login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

// Endpoint to fetch vehicle details by vehicle number
app.get('/vehicle/:vehicleNumber', async (req, res) => {
  const { vehicleNumber } = req.params;
  const vehicle = await Vehicle.findOne({ vehicleNumber });
  if (vehicle) {
    res.send(vehicle);
  } else {
    res.send({ error: 'Vehicle not found' });
  }
});

// Endpoint to add a new vehicle
app.post('/vehicle', async (req, res) => {
  const {
    vehicleNumber,
    companyName,
    price,
    engineCC,
    torque,
    insuranceNumber,
    expiryDate
  } = req.body;
  
  const vehicle = new Vehicle({
    vehicleNumber,
    companyName,
    price,
    engineCC,
    torque,
    insuranceNumber,
    expiryDate
  });
  
  await vehicle.save();
  res.send({ success: true });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
