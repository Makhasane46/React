 import { BrowserRouter as Router,Routes,Route, Link } from 'react-router-dom';
import Home from './Home';
import about from './about.js';
import contacts from './contact.js';

const App = () => {
    return (
        <Router>
            
              <div>
               <Routes>
                <nav>
               
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">about</Link>
                        </li>
                        <li>
                            <Link to="/contact">contact</Link>
                        </li>
                    </ul>
                </nav>

                    <Route path="/" home element={<Home/>} />
                    <Route path="/about" element={<about/>} />
                    <Route path="/contact" element={<contact/>} />
                  
            </Routes>
              </div>

            
        </Router>
    );
};
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadUsers();
    showSection('dashboard');
});

// Show specific section
function showSection(sectionId) {
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.toggle('hidden', section.id !== sectionId);
    });
}

// Product Management
document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const product = {
        id: document.getElementById('product-id').value || Date.now().toString(),
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        category: document.getElementById('product-category').value,
        price: parseFloat(document.getElementById('product-price').value),
        quantity: parseInt(document.getElementById('product-quantity').value)
    };
    saveProduct(product);
    loadProducts();
    this.reset();
});

// User Management
document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const user = {
        id: document.getElementById('user-id').value || Date.now().toString(),
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    saveUser(user);
    loadUsers();
    this.reset();
});

// Load and display products
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <strong>${product.name}</strong> (${product.category}) - $${product.price.toFixed(2)}
            <br>Description: ${product.description}
            <br>Quantity: ${product.quantity}
            <button onclick="editProduct('${product.id}')">Edit</button>
            <button onclick="deleteProduct('${product.id}')">Delete</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Save product to Local Storage
function saveProduct(product) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const existingProductIndex = products.findIndex(p => p.id === product.id);
    if (existingProductIndex > -1) {
        products[existingProductIndex] = product;
    } else {
        products.push(product);
    }
    localStorage.setItem('products', JSON.stringify(products));
}

// Edit product
function editProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-quantity').value = product.quantity;
        showSection('product-management');
    }
}

// Delete product
function deleteProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const updatedProducts = products.filter(p => p.id !== productId);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    loadProducts();
}

// Load and display users
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <strong>${user.username}</strong>
            <button onclick="editUser('${user.id}')">Edit</button>
            <button onclick="deleteUser('${user.id}')">Delete</button>
        `;
        userList.appendChild(userDiv);
    });
}

// Save user to Local Storage
function saveUser(user) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUserIndex = users.findIndex(u => u.id === user.id);
    if (existingUserIndex > -1) {
        users[existingUserIndex] = user;
    } else {
        users.push(user);
    }
    localStorage.setItem('users', JSON.stringify(users));
}

// Edit user
function editUser(userId) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === userId);
    if (user) {
        document.getElementById('user-id').value = user.id;
        document.getElementById('username').value = user.username;
        document.getElementById('password').value = user.password;
        showSection('user-management');
    }
}

// Delete user
function deleteUser(userId) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(updatedUsers))
   