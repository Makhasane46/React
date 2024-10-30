import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    // Load products from localStorage
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(savedProducts);

    // Check for low stock items
    const lowStock = savedProducts.filter(product => product.quantity < 10);
    setLowStockItems(lowStock);
  };

  return (
    <div>
      <marquee>
        <h1>Wings Cafe Inventory System</h1>
      </marquee>

      {/* Stock Overview */}
      <section id="stockOverview">
        <h2>Stock Overview</h2>
        <div id="lowStockAlert">
          {lowStockItems.length > 0 ? (
            <>
              <h3>Low Stock Alert:</h3>
              <ul>
                {lowStockItems.map(item => (
                  <li key={item.id}>
                    {item.name} (Only {item.quantity} left)
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>All stock levels are sufficient.</p>
          )}
        </div>
      </section>

      {/* Current Stock Table */}
      <section id="stockTableSection">
        <h2>Current Stock</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{!isNaN(parseFloat(product.price)) ? parseFloat(product.price).toFixed(2) : '0.00'}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Dashboard;
