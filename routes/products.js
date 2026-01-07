const express = require('express');
const router = express.Router();
const db = require('../config/db');

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await db('products').select('*');
    const formattedProducts = products.map(p => ({
      ...p,
      title: p.title
    }));
    res.json(formattedProducts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await db('products').where({ id: req.params.id }).first();
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json({ ...product, title: product.title });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
