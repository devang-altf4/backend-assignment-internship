const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('../models/User');

dotenv.config();

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin123';
const ADMIN_NAME = 'Admin';

const seedAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    let admin = await User.findOne({ email: ADMIN_EMAIL });

    if (!admin) {
      admin = await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: 'admin'
      });
      console.log(`Admin user created: ${admin.email}`);
    } else {
      admin.name = ADMIN_NAME;
      admin.password = ADMIN_PASSWORD;
      admin.role = 'admin';
      await admin.save();
      console.log(`Admin user updated: ${admin.email}`);
    }

    console.log('Admin credentials seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed admin user:', error.message);
    process.exit(1);
  }
};

seedAdminUser();
