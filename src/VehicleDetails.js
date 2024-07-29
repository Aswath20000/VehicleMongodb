import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function VehicleDetails() {
  const { vehicleNumber } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/vehicle/${vehicleNumber}`);
        setVehicle(response.data);
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
      }
    };
    fetchVehicle();
  }, [vehicleNumber]);

  return (
    <div>
      {vehicle ? (
        <div>
          <h2>Vehicle Details</h2>
          <p>Vehicle Number: {vehicle.vehicleNumber}</p>
          <p>Company Name: {vehicle.companyName}</p>
          <p>Price: {vehicle.price}</p>
          <p>Engine CC: {vehicle.engineCC}</p>
          <p>Torque: {vehicle.torque}</p>
          <p>Insurance Number: {vehicle.insuranceNumber}</p>
          <p>Expiry Date: {new Date(vehicle.expiryDate).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default VehicleDetails;
