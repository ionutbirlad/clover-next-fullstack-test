import { useState, useMemo } from 'react';

import ContentPanel from '../components/core/layout/ContentPanel';

import TransactionTrendChart from '../components/domain/TransactionTrendChart';

import buildTransactionTrendData from '../api/transactions/transactionsAggregations';

// TODO: remove mock data
const demoTransactions = [
  {
    id: 'demo-upwork',
    title: 'Upwork',
    date: '2026-06-29T00:00:00.000Z',
    createdAt: '2026-06-29T08:15:00.000Z',
    updatedAt: '2026-06-29T08:15:00.000Z',
    dateLabel: 'Today',
    amount: 850,
    type: 'income',
    category: 'freelance'
  },
  {
    id: 'demo-transfer',
    title: 'Transfer',
    date: '2026-06-28T00:00:00.000Z',
    createdAt: '2026-06-28T16:30:00.000Z',
    updatedAt: '2026-06-28T16:45:00.000Z',
    dateLabel: 'Yesterday',
    amount: 85,
    type: 'expense',
    category: 'salary'
  },
  {
    id: 'demo-paypal',
    title: 'Paypal',
    date: '2026-06-18T00:00:00.000Z',
    createdAt: '2026-06-18T13:40:00.000Z',
    updatedAt: '2026-06-18T13:40:00.000Z',
    dateLabel: 'Jan 30, 2022',
    amount: 1406,
    type: 'income',
    category: 'food'
  },
  {
    id: 'demo-youtube',
    title: 'Youtube',
    date: '2026-05-30T00:00:00.000Z',
    createdAt: '2026-05-30T21:05:00.000Z',
    updatedAt: '2026-05-30T21:05:00.000Z',
    dateLabel: 'Jan 16, 2022',
    amount: 11.99,
    type: 'expense',
    category: 'bills'
  }
];
const demoTrendTransactions = [
  ...demoTransactions,
  { id: 'trend-1', title: 'Salary', date: '2026-03-08T00:00:00.000Z', amount: 1600, type: 'income' },
  { id: 'trend-2', title: 'Groceries', date: '2026-03-11T00:00:00.000Z', amount: 420, type: 'expense' },
  { id: 'trend-3', title: 'Freelance', date: '2026-04-15T00:00:00.000Z', amount: 540, type: 'income' },
  { id: 'trend-4', title: 'Bills', date: '2026-04-18T00:00:00.000Z', amount: 360, type: 'expense' },
  { id: 'trend-5', title: 'Salary', date: '2026-05-07T00:00:00.000Z', amount: 1800, type: 'income' },
  { id: 'trend-6', title: 'Shopping', date: '2026-05-22T00:00:00.000Z', amount: 640, type: 'expense' },
  { id: 'trend-7', title: 'Freelance', date: '2026-06-10T00:00:00.000Z', amount: 720, type: 'income' },
  { id: 'trend-8', title: 'Food', date: '2026-06-24T00:00:00.000Z', amount: 230, type: 'expense' },
  { id: 'trend-9', title: 'Salary', date: '2025-09-12T00:00:00.000Z', amount: 1500, type: 'income' },
  { id: 'trend-10', title: 'Bills', date: '2025-10-04T00:00:00.000Z', amount: 910, type: 'expense' }
];

const StatisticsPage = () => {
  const [loading] = useState(false);

  const [trendRange, setTrendRange] = useState('day');

  const trendData = useMemo(
    () => buildTransactionTrendData({ transactions: demoTrendTransactions, range: trendRange }),
    [trendRange]
  );

  return (
    <ContentPanel title="Dashboard" loading={loading}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 bg-red-50 md:col-span-7">
          <TransactionTrendChart data={trendData} range={trendRange} onRangeChange={setTrendRange} />
        </div>

        <div className="col-span-12 bg-amber-50 md:col-span-5">TOP SPENDING TRANSACTIONS HERE</div>
      </div>
    </ContentPanel>
  );
};

export default StatisticsPage;
