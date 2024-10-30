import React, { useState, useEffect } from 'react';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    id: null,
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  // Load products from localStorage
  const loadProducts = () => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(savedProducts);
  };

  // Handle form input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Add or update product
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedProducts = [...products];
    if (isEditing) {
      // Update product
      const index = updatedProducts.findIndex((p) => p.id === productData.id);
      if (index > -1) updatedProducts[index] = { ...productData, id: productData.id };
      setIsEditing(false);
    } else {
      // Add new product
      const newProduct = { ...productData, id: Date.now() };
      updatedProducts.push(newProduct);
    }
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setProductData({ id: null, name: '', description: '', category: '', price: '', quantity: '' });
  };

  // Edit product
  const editProduct = (id) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setProductData(product);
      setIsEditing(true);
    }
  };

  // Delete product
  const deleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  return (
    <div>
      <marquee>
        <h1>Wings Cafe Inventory System</h1>
      </marquee>
      <h2>Product Management</h2>

      {/* Add/Edit Product Form */}
      <section id="addProduct">
        <h2>{isEditing ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            id="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            id="category"
            placeholder="Category"
            value={productData.category}
            onChange={handleChange}
          />
          <input
            type="number"
            id="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            id="quantity"
            placeholder="Initial Quantity"
            value={productData.quantity}
            onChange={handleChange}
            required
          />
          <button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
        </form>
      </section>

      {/* Product List Table */}
      <section id="productList">
        <h2>Product List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{!isNaN(parseFloat(product.price)) ? parseFloat(product.price).toFixed(2) : '0.00'}</td>
                <td>{product.quantity}</td>
                <td>
                  <button onClick={() => editProduct(product.id)}>Edit</button>
                  <button onClick={() => deleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
           </tbody>
        </table>
      </section>
    </div>
  );
}

export default ProductManagement;
