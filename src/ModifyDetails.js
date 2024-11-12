import React, { useState } from 'react';
import axios from 'axios';

function ModifyDetails() {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [price, setPrice] = useState('');
  const [engineCC, setEngineCC] = useState('');
  const [torque, setTorque] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [vehicleFound, setVehicleFound] = useState(false); // To check if the vehicle exists

  const handleCheckVehicle = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/vehicle/${vehicleNumber}`);
      if (response.data) {
        setCompanyName(response.data.companyName);
        setPrice(response.data.price);
        setEngineCC(response.data.engineCC);
        setTorque(response.data.torque);
        setInsuranceNumber(response.data.insuranceNumber);
        setExpiryDate(response.data.expiryDate);
        setVehicleFound(true);
      } else {
        alert('Vehicle not found');
        setVehicleFound(false);
      }
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
      alert('Error fetching vehicle details');
      setVehicleFound(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put((`http://localhost:5000/vehicle/${vehicleNumber}`), {
        vehicleNumber,
        companyName,
        price,
        engineCC,
        torque,
        insuranceNumber,
        expiryDate
      });
      if (response.data.success) {
        alert('Vehicle updated successfully');
      } else {
        alert('Failed to update vehicle');
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  return (
    <div>
      <h2>Modify Vehicle Details</h2>
      
      {/* Step 1: Check if the vehicle exists */}
      {!vehicleFound && (
        <div>
          <label>Vehicle Number:</label>
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
          />
          <button onClick={handleCheckVehicle}>Check Vehicle</button>
        </div>
      )}

      {/* Step 2: If vehicle exists, display the modification form */}
      {vehicleFound && (
        <form onSubmit={handleUpdateSubmit}>
           <div>
            <label>Vehicle Number:</label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) =>setVehicleNumber(e.target.value)}
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
          <button type="submit">Update Vehicle</button>
        </form>
      )}
    </div>
  );
}

export default ModifyDetails;
