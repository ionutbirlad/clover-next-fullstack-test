import { apiGet, apiPost, apiPatch, apiDelete } from '../apiClient';

const transactionsApi = {
  getTransactions: () => apiGet('/transactions'),
  getTransactionById: id => apiGet(`/transactions/${id}`),
  createTransaction: payload => apiPost('/transactions', payload),
  updateTransaction: (id, payload) => apiPatch(`/transactions/${id}`, payload),
  deleteTransaction: id => apiDelete(`/transactions/${id}`),
  getCategories: () => apiGet('/transactions/categories')
};

export default transactionsApi;
