const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../config/db');

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', auth(), async (req, res) => {
  try {
    let cart = await db('carts').where({ user_id: req.user.id }).first();
    if (!cart) {
      return res.json({ items: [] });
    }

    const items = await db('cart_items')
      .join('products', 'cart_items.product_id', 'products.id')
      .select(
        'cart_items.id', 
        'products.title', 
        'products.price', 
        'cart_items.qty', 
        'cart_items.product_id'
      )
      .where('cart_items.cart_id', cart.id);

    res.json({ cart_id: cart.id, items });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Private
router.post('/', auth(), async (req, res) => {
  const { product_id, qty } = req.body;
  console.log(`Add to Cart Request:`, { product_id, qty, user_id: req.user.id });

  try {
    // Check if cart exists
    let cart = await db('carts').where({ user_id: req.user.id }).first();
    if (!cart) {
      const [newCart] = await db('carts').insert({ user_id: req.user.id }).returning('*');
      cart = newCart;
    }

    // Check if item already in cart
    const existingItem = await db('cart_items')
      .where({ cart_id: cart.id, product_id })
      .first();

    if (existingItem) {
      // Update qty
      await db('cart_items')
        .where({ id: existingItem.id })
        .update({ qty: existingItem.qty + (qty || 1) });
    } else {
      // Add new item
      await db('cart_items').insert({
        cart_id: cart.id,
        product_id,
        qty: qty || 1
      });
    }

    res.json({ msg: 'Item added to cart' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/cart/:id
// @desc    Remove item from cart
// @access  Private
router.delete('/:id', auth(), async (req, res) => {
  try {
    const item = await db('cart_items').where({ id: req.params.id }).first();
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    // Ensure user owns the cart
    const cart = await db('carts').where({ id: item.cart_id }).first();
    if (cart.user_id !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await db('cart_items').where({ id: req.params.id }).del();
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
