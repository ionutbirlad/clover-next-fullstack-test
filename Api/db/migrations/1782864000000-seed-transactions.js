/* eslint-disable no-console */
const User = require('../../models/user');
const Transaction = require('../../models/transaction');
require('../connect');

const TEST_USER_EMAIL = 'test@meblabs.com';
const SEED_TITLES = [
  'Monthly salary',
  'Landing page freelance',
  'UX audit freelance',
  'Grocery shopping',
  'Team lunch',
  'Electricity bill',
  'Internet bill',
  'Clothing order',
  'Software subscription',
  'Coffee meeting',
  'Restaurant dinner',
  'Mobile bill',
  'Online course',
  'Book purchase',
  'Weekend groceries',
  'Consulting invoice',
  'Bonus payout',
  'Home supplies',
  'Pharmacy',
  'Utility adjustment',
  'Design retainer',
  'Food delivery',
  'Office equipment',
  'Streaming subscription',
  'Project milestone'
];

const createSeedTransactions = userId =>
  [
    { title: 'Monthly salary', amount: 2450, type: 'income', category: 'salary', date: new Date('2026-06-01') },
    {
      title: 'Landing page freelance',
      amount: 720,
      type: 'income',
      category: 'freelance',
      date: new Date('2026-06-05')
    },
    { title: 'UX audit freelance', amount: 480, type: 'income', category: 'freelance', date: new Date('2026-06-17') },
    { title: 'Grocery shopping', amount: 86.45, type: 'expense', category: 'food', date: new Date('2026-06-02') },
    { title: 'Team lunch', amount: 38.9, type: 'expense', category: 'food', date: new Date('2026-06-04') },
    { title: 'Electricity bill', amount: 124.3, type: 'expense', category: 'bills', date: new Date('2026-06-06') },
    { title: 'Internet bill', amount: 42.99, type: 'expense', category: 'bills', date: new Date('2026-06-07') },
    { title: 'Clothing order', amount: 158.2, type: 'expense', category: 'shopping', date: new Date('2026-06-08') },
    { title: 'Software subscription', amount: 19.99, type: 'expense', category: 'bills', date: new Date('2026-06-09') },
    { title: 'Coffee meeting', amount: 12.5, type: 'expense', category: 'food', date: new Date('2026-06-10') },
    { title: 'Restaurant dinner', amount: 64.8, type: 'expense', category: 'food', date: new Date('2026-06-12') },
    { title: 'Mobile bill', amount: 24.99, type: 'expense', category: 'bills', date: new Date('2026-06-13') },
    { title: 'Online course', amount: 89, type: 'expense', category: 'shopping', date: new Date('2026-06-14') },
    { title: 'Book purchase', amount: 31.4, type: 'expense', category: 'shopping', date: new Date('2026-06-16') },
    { title: 'Weekend groceries', amount: 73.2, type: 'expense', category: 'food', date: new Date('2026-06-18') },
    { title: 'Consulting invoice', amount: 950, type: 'income', category: 'freelance', date: new Date('2026-06-20') },
    { title: 'Bonus payout', amount: 350, type: 'income', category: 'salary', date: new Date('2026-06-21') },
    { title: 'Home supplies', amount: 112.75, type: 'expense', category: 'shopping', date: new Date('2026-06-22') },
    { title: 'Pharmacy', amount: 28.6, type: 'expense', category: 'shopping', date: new Date('2026-06-23') },
    { title: 'Utility adjustment', amount: 53.1, type: 'expense', category: 'bills', date: new Date('2026-06-24') },
    { title: 'Design retainer', amount: 620, type: 'income', category: 'freelance', date: new Date('2026-06-25') },
    { title: 'Food delivery', amount: 26.9, type: 'expense', category: 'food', date: new Date('2026-06-26') },
    { title: 'Office equipment', amount: 214.5, type: 'expense', category: 'shopping', date: new Date('2026-06-27') },
    {
      title: 'Streaming subscription',
      amount: 15.99,
      type: 'expense',
      category: 'bills',
      date: new Date('2026-06-28')
    },
    { title: 'Project milestone', amount: 1150, type: 'income', category: 'freelance', date: new Date('2026-06-30') }
  ].map(transaction => ({ ...transaction, user: userId }));

module.exports.up = async () => {
  const user = await User.findOne({ email: TEST_USER_EMAIL });

  if (!user) {
    console.warn(`Skipping transaction seed: user ${TEST_USER_EMAIL} not found`);
    return undefined;
  }

  await Transaction.deleteMany({ user: user._id, title: { $in: SEED_TITLES } });
  return Transaction.insertMany(createSeedTransactions(user._id));
};

module.exports.down = async () => {
  const user = await User.findOne({ email: TEST_USER_EMAIL });

  if (!user) return undefined;

  return Transaction.deleteMany({ user: user._id, title: { $in: SEED_TITLES } });
};
