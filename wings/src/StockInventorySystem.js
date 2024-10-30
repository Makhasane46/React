import React, { useState, useEffect } from 'react';

const StockInventorySystem = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [productForm, setProductForm] = useState({
    productName: '',
    description: '',
    category: '',
    price: '',
    initialQuantity: ''
  });
  const [userForm, setUserForm] = useState({
    username: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    updateProductList();
    updateUserList();
    updateStockSummary();
  }, []);

  const handleProductChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleUserChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const addProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      ...productForm,
      price: parseFloat(productForm.price),
      quantity: parseInt(productForm.initialQuantity, 10)
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    setProductForm({
      productName: '',
      description: '',
      category: '',
      price: '',
      initialQuantity: ''
    });
    updateStockSummary();
  };

  const addUser = (e) => {
    e.preventDefault();
    const newUser = { ...userForm };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setUserForm({ username: '', password: '', role: '' });
  };

  const updateProductList = () => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  };

  const updateUserList = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    updateStockSummary();
  };

  const deleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const updateStockSummary = () => {
    const totalStock = products.reduce((total, product) => total + product.quantity, 0);
    return totalStock;
  };

  return (
    <div>
      <header>
        <h1>Wings Cafe Stock Inventory</h1>
        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#product-management">Product-Management</a>
          <a href="#user-management">User-Management</a>
        </nav>
      </header>

      <main>
        {/* Dashboard */}
        <section id="dashboard">
          <h2>Dashboard</h2>
          <p>Total stock: {updateStockSummary()}</p>
        </section>

        {/* Product Management */}
        <section id="product-management">
          <h2>Product-Management</h2>
          <form onSubmit={addProduct}>
            <label>Product Name:</label>
            <input
              type="text"
              name="productName"
              value={productForm.productName}
              onChange={handleProductChange}
              required
            />

            <label>Description:</label>
            <textarea
              name="description"
              value={productForm.description}
              onChange={handleProductChange}
            />

            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={productForm.category}
              onChange={handleProductChange}
            />

            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={productForm.price}
              onChange={handleProductChange}
              step="0.01"
              required
            />

            <label>Initial Quantity:</label>
            <input
              type="number"
              name="initialQuantity"
              value={productForm.initialQuantity}
              onChange={handleProductChange}
              required
            />

            <button type="submit">Add Product</button>
          </form>
          <h3>Existing Products</h3>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                {product.productName} - {product.category} - ${product.price.toFixed(2)} - Qty: {product.quantity}
                <button onClick={() => deleteProduct(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>

        {/* User Management */}
        <section id="user-management">
          <h2>User-Management</h2>
          <form onSubmit={addUser}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={userForm.username}
              onChange={handleUserChange}
              required
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={userForm.password}
              onChange={handleUserChange}
              required
            />

            <label>Role:</label>
            <input
              type="text"
              name="role"
              value={userForm.role}
              onChange={handleUserChange}
            />

            <button type="submit">Add User</button>
          </form>
          <h3>Existing Users</h3>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                {user.username} - {user.role}
                <button onClick={() => deleteUser(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default StockInventorySystem;
