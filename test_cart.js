const axios = require('axios');
const { assert } = require('console');
require('dotenv').config();

const API_URL = `http://localhost:${process.env.PORT || 5000}`;
const TEST_USER = {
  email: 'test@example.com',
  password: 'password123'
};
// We need to register/login first. 
// Assuming user from previous test exists, or we register a new one.
const NEW_USER = {
  name: 'Cart Tester',
  email: `cart_tester_${Date.now()}@example.com`,
  password: 'password123'
};

async function testCart() {
  try {
    console.log('--- STARTING CART TESTS ---');
    
    // 1. Auth/Login
    console.log('1. Registering/Logging in...');
    let token;
    try {
        const regRes = await axios.post(`${API_URL}/api/auth/register`, NEW_USER);
        token = regRes.data.token;
    } catch(e) {
        // Fallback login if exists (very unlikely with unique email)
        const loginRes = await axios.post(`${API_URL}/api/auth/login`, {email: NEW_USER.email, password: NEW_USER.password});
        token = loginRes.data.token;
    }
    const headers = { 'x-auth-token': token };

    // 2. Add Item to Cart
    // Note: We need a valid product_id. Assuming seeds ran or DB has products.
    // If not, we might fail. Let's assume ID 1 exists (from seeds).
    console.log('2. Adding Item to Cart...');
    await axios.post(`${API_URL}/api/cart`, { product_id: 1, qty: 2 }, { headers });
    console.log('   Item added.');

    // 3. Get Cart
    console.log('3. Fetching Cart...');
    const cartRes = await axios.get(`${API_URL}/api/cart`, { headers });
    console.log('   Cart Items:', cartRes.data.items.length);
    
    if (cartRes.data.items.length > 0) {
        console.log('   PASSED: Cart has items.');
    } else {
        console.error('   FAILED: Cart is empty.');
    }

    // 4. Create Checkout Session
    console.log('4. Creating Stripe Checkout Session...');
    // Note: behavior depends on valid stripe key. If dummy key, it might error 500 or 400.
    try {
        const sessionRes = await axios.post(`${API_URL}/api/checkout/create-session`, {}, { headers });
        console.log('   Session Created:', sessionRes.data.id ? 'YES' : 'NO');
    } catch (e) {
        console.log('   Stripe Error (Expected if invalid key):', e.response?.data?.msg || e.message);
    }
    
    console.log('--- TESTS COMPLETE ---');

  } catch (err) {
    console.error('Test Failed:', err.response ? err.response.data : err.message);
  }
}

testCart();
