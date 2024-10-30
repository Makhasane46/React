import React, { useState, useEffect } from 'react';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [newUser, setNewUser] = useState({ username: '', password: '', email: '' });
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  // Load users from localStorage
  const loadUsers = () => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(savedUsers);
  };

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === loginData.username && u.password === loginData.password
    );

    if (user) {
      setLoginMessage('Login successful!');
    } else {
      setLoginMessage('Invalid username or password.');
    }
  };

  // Handle new user form submission
  const handleAddUser = (e) => {
    e.preventDefault();
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setNewUser({ username: '', password: '', email: '' });
  };

  // Handle input changes for login form
  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle input changes for new user form
  const handleNewUserChange = (e) => {
    const { id, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [id]: value }));
  };

  return (
    <div>
      <marquee>
        <h1>Wings Cafe Inventory System</h1>
      </marquee>
      <h1>User Management</h1>

      {/* User Login Form */}
      <section id="userLogin">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        {loginMessage && <p>{loginMessage}</p>}
      </section>

      {/* Manage Users Form */}
      <section id="manageUsers">
        <h2>Manage Users</h2>
        <form onSubmit={handleAddUser}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={newUser.username}
            onChange={handleNewUserChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={newUser.password}
            onChange={handleNewUserChange}
            required
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleNewUserChange}
          />
          <button type="submit">Add User</button>
        </form>

        <h3>Existing Users</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.username} ({user.email})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default UserManagement;
