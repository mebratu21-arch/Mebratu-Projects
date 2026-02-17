const axios = require('axios');
require('dotenv').config();

const API_URL = `http://localhost:${process.env.PORT || 5000}/api/auth`;
const TEST_USER = {
  name: 'Test Setup User',
  email: `test${Date.now()}@example.com`,
  password: 'password123'
};

async function testAuth() {
  try {
    console.log('1. Registering User...');
    const regRes = await axios.post(`${API_URL}/register`, TEST_USER);
    console.log('Registration Success:', regRes.data.user.email);
    const token = regRes.data.token;

    console.log('2. Verifying Token on Protected Route...');
    const protectedRes = await axios.get(`http://localhost:${process.env.PORT || 5000}/api/protected`, {
      headers: { 'x-auth-token': token }
    });
    console.log('Protected Route Access:', protectedRes.data.msg);

    console.log('3. Logging in...');
    const loginRes = await axios.post(`${API_URL}/login`, {
      email: TEST_USER.email,
      password: TEST_USER.password
    });
    console.log('Login Success, Token received:', !!loginRes.data.token);

    console.log('ALL TESTS PASSED');
  } catch (err) {
    console.error('Test Failed:', err.response ? err.response.data : err.message);
  }
}

// Ensure server is running first!
// We will just run this script assuming server is up, or we might need to start it.
// For this environment, I'll rely on the user or a separate process.
// But as an agent I can start the server in background.

testAuth();
