// Backend for Food Ordering App using Node.js + Express

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory database (for demo)
let menu = [
  { id: 1, name: "Pizza", price: 120, category: "Lunch" },
  { id: 2, name: "Burger", price: 80, category: "Snacks" },
  { id: 3, name: "Pasta", price: 100, category: "Lunch" },
  { id: 4, name: "Tea", price: 20, category: "Beverages" }
];

let cart = [];
let orders = [];

// Get all menu items
app.get('/menu', (req, res) => {
  res.json(menu);
});

// Add item to cart
app.post('/cart', (req, res) => {
  const item = req.body;
  cart.push(item);
  res.json({ message: 'Item added to cart', cart });
});

// View cart
app.get('/cart', (req, res) => {
  res.json(cart);
});

// Place order
app.post('/order', (req, res) => {
  const order = {
    id: orders.length + 1,
    items: cart,
    status: "Pending"
  };

  orders.push(order);
  cart = []; // clear cart after order

  res.json({ message: 'Order placed successfully', order });
});

// Track orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
