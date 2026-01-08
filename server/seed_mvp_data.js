const knex = require('knex');
const config = require('./knexfile');
const db = knex(config.development);

const products = [
  // Electronics
  {
    title: "Wireless Bluetooth Headphones — Noise Canceling",
    description: "Experience silence with our top-tier noise canceling headphones. 24-hour battery life, lightweight, and foldable design.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    rating: 4.6,
    review_count: 1283,
    delivery_info: "Fast Shipping",
    category: "Electronics",
    stock: 50,
    is_active: true
  },
  {
    title: "Smart Fitness Watch — Heart Rate & Activity Tracker",
    description: "Track your health metrics with precision. Monitors heart rate, sleep, and steps. Waterproof and durable.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
    rating: 4.4,
    review_count: 864,
    delivery_info: "2–4 Days",
    category: "Electronics",
    stock: 100,
    is_active: true
  },
  {
    title: "4K Action Camera - Waterproof",
    description: "Capture your adventures in stunning 4K. Waterproof case included. Wi-Fi enabled for instant sharing.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    review_count: 320,
    delivery_info: "Free Shipping",
    category: "Electronics",
    stock: 25,
    is_active: true
  },
  {
    title: "Portable Bluetooth Speaker",
    description: "Big sound in a small package. Waterproof, 12-hour playtime, and rugged design for outdoor use.",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60",
    rating: 4.7,
    review_count: 550,
    delivery_info: "Fast Shipping",
    category: "Electronics",
    stock: 60,
    is_active: true
  },

  // Fashion
  {
    title: "Anti-Theft Laptop Backpack — USB Charging Port",
    description: "Secure your tech with this anti-theft backpack. Features hidden zippers, water-resistant fabric, and a built-in USB charging port.",
    price: 24.50,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60",
    rating: 4.7,
    review_count: 2105,
    delivery_info: "Fast Shipping",
    category: "Fashion",
    stock: 75,
    is_active: true
  },
  {
    title: "Women’s Lightweight Casual Sneakers",
    description: "Comfort meets style. These lightweight sneakers are perfect for daily wear. Breathable mesh and cushioned sole.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    review_count: 932,
    delivery_info: "Fast Local Shipping",
    category: "Fashion",
    stock: 120,
    is_active: true
  },
  {
    title: "Classic Denim Jacket",
    description: "A timeless wardrobe staple. High-quality denim with a comfortable fit correctly sized for layering.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format&fit=crop&q=60",
    rating: 4.3,
    review_count: 150,
    delivery_info: "Standard Shipping",
    category: "Fashion",
    stock: 40,
    is_active: true
  },
   {
    title: "Men's Polarized Sunglasses",
    description: "Protect your eyes with style. UV400 protection, lightweight frame, and durable lenses.",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60",
    rating: 4.6,
    review_count: 410,
    delivery_info: "Fast Shipping",
    category: "Fashion",
    stock: 200,
    is_active: true
  },

  // Home
  {
    title: "Digital Air Fryer — Oil-Free Cooking",
    description: "Cook healthier meals with less oil. Digital touchscreen, multiple cooking presets, and easy-clean basket.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1626202166668-2a288924190c?w=500&auto=format&fit=crop&q=60",
    rating: 4.6,
    review_count: 1478,
    delivery_info: "Buyer Protection Included",
    category: "Home",
    stock: 30,
    is_active: true
  },
  {
    title: "Smart LED Bulb - RGB Color",
    description: "Control your lighting with your phone. Millions of colors, dimmable, and compatible with voice assistants.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=500&auto=format&fit=crop&q=60",
    rating: 4.2,
    review_count: 890,
    delivery_info: "Fast Shipping",
    category: "Home",
    stock: 150,
    is_active: true
  },
  {
    title: "Ceramic Plant Pot Set",
    description: "Modern minimalist design. Set of 3 ceramic pots with drainage holes and bamboo saucers.",
    price: 22.50,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&auto=format&fit=crop&q=60",
    rating: 4.8,
    review_count: 210,
    delivery_info: "Fragile Handling",
    category: "Home",
    stock: 45,
    is_active: true
  },

  // Beauty
  {
    title: "Organic Vitamin C Serum",
    description: "Brighten and revitalize your skin. 100% organic ingredients, cruelty-free, and suitable for all skin types.",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60",
    rating: 4.7,
    review_count: 650,
    delivery_info: "Fast Shipping",
    category: "Beauty",
    stock: 80,
    is_active: true
  },
  {
    title: "Professional Makeup Brush Set",
    description: "12-piece premium brush set for flawless application. Soft synthetic bristles and durable handles.",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    review_count: 340,
    delivery_info: "Fast Shipping",
    category: "Beauty",
    stock: 60,
    is_active: true
  },

  // Essentials
  {
    title: "Reusable Water Bottle - Stainless Steel",
    description: "Keep your drinks cold for 24 hours. Double-wall vacuum insulation, leak-proof lid, and eco-friendly.",
    price: 16.50,
    image: "https://images.unsplash.com/photo-1602143407151-0111419516eb?w=500&auto=format&fit=crop&q=60",
    rating: 4.8,
    review_count: 1100,
    delivery_info: "Fast Shipping",
    category: "Essentials",
    stock: 200,
    is_active: true
  },
  {
    title: "Yoga Mat - Non-Slip",
    description: "Perfect for yoga, pilates, or workouts. Extra thick for comfort, non-slip surface, and easy to clean.",
    price: 21.00,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format&fit=crop&q=60",
    rating: 4.4,
    review_count: 420,
    delivery_info: "Standard Shipping",
    category: "Essentials",
    stock: 90,
    is_active: true
  }
];

async function seed() {
  try {
    // Optional: Delete existing products to have a clean MVP state
    // await db('cart_items').del(); // Dependent table
    // await db('products').del(); 
    // Actually, let's just UPSERT or Insert new ones. 
    // To ensure clean slate for MVP, I'll truncate.
    console.log('Cleaning old data...');
    await db('cart_items').del();
    await db('products').del();
    
    console.log('Seeding new MVP products...');
    await db('products').insert(products);
    
    console.log('Seeding complete!');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await db.destroy();
  }
}

seed();
