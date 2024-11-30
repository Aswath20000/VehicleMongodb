const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json()); 


mongoose.connect('mongodb://localhost:27017/vdatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});


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


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});


app.get('/vehicle/:vehicleNumber', async (req, res) => {
  const { vehicleNumber } = req.params;
  const vehicle = await Vehicle.findOne({ vehicleNumber });
  if (vehicle) {
    res.send(vehicle);
  } else {
    res.send({ error: 'Vehicle not found' });
  }
});

//  add a new vehicle
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


app.delete('/vehicle/:vehicleNumber', async (req, res) => {
  const { vehicleNumber } = req.params;
  try {
    const result = await Vehicle.findOneAndDelete({ vehicleNumber });
    if (result) {
      res.send({ success: true });
    } else {
      res.send({ success: false, message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).send({ success: false, error: 'Internal Server Error' });
  }
});


app.put('/vehicle/:vehicleNumber', async (req, res) => {
  const { vehicleNumber } = req.params;
  const {
    companyName,
    price,
    engineCC,
    torque,
    insuranceNumber,
    expiryDate
  } = req.body;

  try {
    const updatedVehicle = await Vehicle.findOneAndUpdate(
      { vehicleNumber },
      {
        companyName,
        price,
        engineCC,
        torque,
        insuranceNumber,
        expiryDate
      },
      { new: true } 
    );

    if (updatedVehicle) {
      res.send({ success: true, updatedVehicle });
    } else {
      res.send({ success: false, message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).send({ success: false, error: 'Internal Server Error' });
  }
});


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
