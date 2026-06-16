const TRANSACTION_CATEGORIES = [
  { value: 'salary', label: 'Salary', type: 'income' },
  { value: 'freelance', label: 'Freelance', type: 'income' },
  { value: 'food', label: 'Food', type: 'expense' },
  { value: 'bills', label: 'Bills', type: 'expense' },
  { value: 'shopping', label: 'Shopping', type: 'expense' }
];

const TRANSACTION_CATEGORY_VALUES = TRANSACTION_CATEGORIES.map(({ value }) => value);
const TRANSACTION_TYPES = ['income', 'expense'];

module.exports = {
  TRANSACTION_CATEGORIES,
  TRANSACTION_CATEGORY_VALUES,
  TRANSACTION_TYPES
};
