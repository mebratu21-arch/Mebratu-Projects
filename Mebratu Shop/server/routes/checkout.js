const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../config/db');

// @route   POST /api/checkout/create-session
// @desc    Create Stripe Checkout Session
// @access  Private
router.post('/create-session', auth(), async (req, res) => {
  try {
    const { items } = req.body || {};
    // items: [{ title, price, qty }] from frontend or validated from DB
    
    // Validate items (In production, fetch prices from DB to avoid client manipulation)
    // For this MVP, assuming client sends valid data but we should minimally check DB
    // Or better, fetch cart items from DB using user ID

    let line_items = [];
    
    // Fetch user's cart items from DB to be secure
    const cart = await db('carts').where({ user_id: req.user.id }).first();
    if (!cart) {
      return res.status(400).json({ msg: 'Cart is empty' });
    }
    
    const dbItems = await db('cart_items')
      .join('products', 'cart_items.product_id', 'products.id')
      .select('products.title', 'products.price', 'cart_items.qty', 'cart_items.product_id')
      .where({ cart_id: cart.id });

    if (dbItems.length === 0) {
      return res.status(400).json({ msg: 'Cart is empty' });
    }

    line_items = dbItems.map(item => {
      const price = Number(item.price);
      if (isNaN(price)) {
        throw new Error(`Invalid price for product: ${item.title}`);
      }
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
          },
          unit_amount: Math.round(price * 100), // Stripe expects cents
        },
        quantity: item.qty,
      };
    });

    const totalPrice = dbItems.reduce((acc, item) => acc + (Number(item.price) * item.qty), 0);

    // Save order to DB as 'pending'
    const [orderObj] = await db('orders').insert({
      user_id: req.user.id,
      total_price: totalPrice,
      status: 'pending',
      payment_status: 'pending'
    }).returning('*');

    const orderId = orderObj.id;

    // record items to order_items
    const orderItems = dbItems.map(item => ({
      order_id: orderId,
      product_id: item.product_id,
      qty: item.qty,
      price: item.price
    }));
    console.log('Inserting Order Items:', JSON.stringify(orderItems, null, 2));
    await db('order_items').insert(orderItems);

    console.log(`Order ${orderId} created for user ${req.user.id} with total ${totalPrice}`);
    console.log('Creating Stripe session with line items:', JSON.stringify(line_items, null, 2));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/success.html`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/cancel.html`,
    });

    // Optional: Clear cart now, or wait for webhook. 
    // Usually better to clear on success page or webhook, but for MVP we can clear now
    await db('cart_items').where({ cart_id: cart.id }).del();

    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error('Stripe Checkout Error:', err.message);
    if (err.type === 'StripeInvalidRequestError') {
       return res.status(400).json({ msg: 'Payment configuration error: ' + err.message });
    }
    res.status(500).json({ msg: err.message || 'Server Error' });
  }
});

module.exports = router;
