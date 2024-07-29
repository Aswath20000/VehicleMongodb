import React, { useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [price, setPrice] = useState('');
  const [engineCC, setEngineCC] = useState('');
  const [torque, setTorque] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/vehicle', {
        vehicleNumber,
        companyName,
        price,
        engineCC,
        torque,
        insuranceNumber,
        expiryDate
      });
      if (response.data.success) {
        alert('Vehicle added successfully');
      } else {
        alert('Failed to add vehicle');
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Vehicle Number:</label>
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Engine CC:</label>
          <input
            type="number"
            value={engineCC}
            onChange={(e) => setEngineCC(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Torque:</label>
          <input
            type="text"
            value={torque}
            onChange={(e) => setTorque(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Insurance Number:</label>
          <input
            type="text"
            value={insuranceNumber}
            onChange={(e) => setInsuranceNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Expiry Date:</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
}

export default AdminDashboard;