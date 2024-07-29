import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserLogin from './UserLogin';
import AdminLogin from './AdminLogin';
import VehicleDetails from './VehicleDetails';
import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <Router>
      <div>
        <h1>Vehicle Details</h1>
        <nav>
          <ul>
            <li>
              <Link to="/user-login">User Login</Link>
            </li>
            <li>
              <Link to="/admin-login">Admin Login</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/vehicle-details/:vehicleNumber" element={<VehicleDetails />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
