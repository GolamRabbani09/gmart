require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    // 1. Connect to DB
    await connectDB();
    console.log('Clearing old data...');

    // 2. Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // 3. Create Admin & Customer Users
    console.log('Creating users...');
    const adminPassword = await bcrypt.hash('admin123', 12);
    const userPassword = await bcrypt.hash('user123', 12);

    const users = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@gmart.com',
        password: adminPassword,
        role: 'admin',
      },
      {
        name: 'Customer One',
        email: 'customer@gmart.com',
        password: userPassword,
        role: 'user',
      },
    ]);

    // 4. Create 10 Real-Looking Products (Electronics, Fashion, Gadgets)
    console.log('Creating products...');
    const sampleProducts = [
      {
        name: 'iPhone 15 Pro Max - 256GB',
        description: 'The latest iPhone with titanium design, A17 Pro chip, and advanced camera system.',
        price: 155000,
        category: 'Gadgets',
        stock: 15,
        unit: 'piece',
        images: [{ url: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800' }]
      },
      {
        name: 'Sony WH-1000XM5 Wireless Headphones',
        description: 'Industry-leading noise canceling headphones with Auto NC Optimizer and 30-hour battery life.',
        price: 35000,
        category: 'Electronics',
        stock: 25,
        unit: 'piece',
        images: [{ url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800' }]
      },
      {
        name: 'MacBook Air M2',
        description: 'Supercharged by M2, perfectly portable design, up to 18 hours of battery life.',
        price: 125000,
        category: 'Gadgets',
        stock: 10,
        unit: 'piece',
        images: [{ url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800' }]
      },
      {
        name: 'Samsung 55" 4K Smart TV',
        description: 'Crystal UHD 4K Smart TV with HDR, PurColor, and Object Tracking Sound Lite.',
        price: 65000,
        category: 'Electronics',
        stock: 8,
        unit: 'piece',
        images: [{ url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800' }]
      },
      {
        name: 'Men\'s Premium Cotton T-Shirt',
        description: '100% pure premium cotton t-shirt. Breathable, comfortable, and perfect for everyday wear.',
        price: 850,
        category: 'Fashion',
        stock: 100,
        unit: 'piece',
        images: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800' }]
      },
      {
        name: 'Nike Air Max 270',
        description: 'Men\'s running shoes featuring the first-ever Max Air unit created specifically for Nike Sportswear.',
        price: 12500,
        category: 'Fashion',
        stock: 30,
        unit: 'pair',
        images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' }]
      },
      {
        name: 'Logitech MX Master 3S',
        description: 'Advanced wireless mouse with 8K DPI any-surface tracking and quiet clicks.',
        price: 11500,
        category: 'Gadgets',
        stock: 40,
        unit: 'piece',
        images: [{ url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800' }]
      },
      {
        name: 'Women\'s Denim Jacket',
        description: 'Classic fit denim jacket made with high-quality durable cotton blend.',
        price: 2500,
        category: 'Fashion',
        stock: 45,
        unit: 'piece',
        images: [{ url: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800' }]
      },
      {
        name: 'Apple Watch Series 9',
        description: 'Smarter, brighter, mightier. Advanced health features and up to 18 hours of battery life.',
        price: 45000,
        category: 'Gadgets',
        stock: 20,
        unit: 'piece',
        images: [{ url: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=800' }]
      },
      {
        name: 'Canon EOS R5 Mirrorless Camera',
        description: 'Professional mirrorless camera with 45MP full-frame sensor and 8K video recording.',
        price: 380000,
        category: 'Electronics',
        stock: 5,
        unit: 'piece',
        images: [{ url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800' }]
      }
    ];

    await Product.insertMany(sampleProducts);
    console.log('✅ Data Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

seedData();
