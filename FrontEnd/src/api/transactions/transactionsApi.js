import { apiGet, apiPost, apiPatch, apiDelete } from '../apiClient';
import {
  mapRemoteTransactionsToList,
  mapRemoteTransactionToDetail,
  mapTransactionFormToTransactionPayload
} from './transactionsMapper';

const transactionsApi = {
  getTransactions: async () => {
    const res = await apiGet('/transactions');

    if (!res.ok) return res;

    return {
      ...res,
      data: mapRemoteTransactionsToList(res.data)
    };
  },
  getTransactionById: async id => {
    const res = await apiGet(`/transactions/${id}`);

    if (!res.ok) return res;

    return {
      ...res,
      data: mapRemoteTransactionToDetail(res.data)
    };
  },
  createTransaction: payload => {
    const normalizedPayload = mapTransactionFormToTransactionPayload(payload);
    return apiPost('/transactions', normalizedPayload);
  },
  updateTransaction: (id, payload) => {
    const normalizedPayload = mapTransactionFormToTransactionPayload(payload);
    return apiPatch(`/transactions/${id}`, normalizedPayload);
  },
  deleteTransaction: id => apiDelete(`/transactions/${id}`),
  getCategories: () => apiGet('/transactions/categories')
};

export default transactionsApi;
