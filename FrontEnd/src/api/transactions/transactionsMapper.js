export const mapRemoteTransactionToDetail = transaction => ({
  id: transaction._id,
  title: transaction.title,
  amount: transaction.amount,
  type: transaction.type,
  category: transaction.category,
  date: transaction.date,
  createdAt: transaction.createdAt,
  updatedAt: transaction.updatedAt
});

export const mapRemoteTransactionToListItem = transaction => ({
  id: transaction._id,
  title: transaction.title,
  amount: transaction.amount,
  type: transaction.type,
  category: transaction.category,
  date: transaction.date
});

export const mapRemoteTransactionsToList = transactions => transactions.map(mapRemoteTransactionToListItem);

export const mapTransactionFormToTransactionPayload = values => ({
  title: values.title,
  amount: values.amount,
  type: values.type,
  category: values.category,
  date: values.date
});
