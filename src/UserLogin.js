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
      <h2>Enter Vehicle Number</h2>
      <input
        type="text"
        placeholder="eg: KX0XLX5XXX"
        value={vehicleNumber}
        onChange={(e) => setVehicleNumber(e.target.value)}
      />
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
}

export default UserLogin;
