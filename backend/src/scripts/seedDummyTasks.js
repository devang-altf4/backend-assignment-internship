const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('../models/User');
const Task = require('../models/Task');

dotenv.config();

const seedTemplates = [
  {
    title: 'Need to bathe my cat',
    description: 'Pick up pet shampoo and finish this by evening.',
    status: 'todo',
    priority: 'medium'
  },
  {
    title: 'Need to cut my hair',
    description: 'Book the barber appointment and go after lunch.',
    status: 'in-progress',
    priority: 'low'
  },
  {
    title: 'Finished attending meeting',
    description: 'Completed the weekly planning meeting and noted action items.',
    status: 'done',
    priority: 'medium'
  }
];

const oldPlaceholderTitles = ['Dummy Todo Task', 'Dummy Ongoing Task', 'Dummy Completed Task'];

const seedDummyTasks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const users = await User.find({}, '_id email');
    if (!users.length) {
      console.log('No users found. Create a user first, then run this script again.');
      process.exit(0);
    }

    let insertedCount = 0;

    for (const user of users) {
      await Task.deleteMany({
        user: user._id,
        title: { $in: oldPlaceholderTitles }
      });

      for (const template of seedTemplates) {
        const exists = await Task.findOne({
          user: user._id,
          title: template.title,
          status: template.status
        });

        if (!exists) {
          await Task.create({
            ...template,
            user: user._id
          });
          insertedCount += 1;
        }
      }
    }

    console.log(`Seed complete. Inserted ${insertedCount} dummy tasks.`);
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedDummyTasks();
