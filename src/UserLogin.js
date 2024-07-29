import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/vehicle-details/${vehicleNumber}`);
  };

  return (
    <div>
      <h2>User Login</h2>
      <input
        type="text"
        placeholder="Enter Vehicle Number"
        value={vehicleNumber}
        onChange={(e) => setVehicleNumber(e.target.value)}
      />
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
}

export default UserLogin;
