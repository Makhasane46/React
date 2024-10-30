import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard'; // Placeholder if not yet created
import ProductManagement from './ProductManagement'; // Placeholder if not yet created
import UserManagement from './UserManagement';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Wings Cafe Stock Inventory</h1>
          <nav>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/product-management">Product Management</Link></li>
              <li><Link to="/user-management">User Management</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product-management" element={<ProductManagement />} />
            <Route path="/user-management" element={<UserManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
