import { useState } from 'react';

import ContentPanel from '../components/core/layout/ContentPanel';

import FinanceSummaryCard from '../components/domain/FinanceSummaryCard';
import TransactionHistory from '../components/domain/TransactionHistory';

// TODO: remove mock
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

const Home = () => {
  const [loading] = useState(false);

  return (
    <ContentPanel title="Dashboard" loading={loading}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-6 bg-red-50 md:col-span-4">PROFILE INFO HERE</div>

        <div className="col-span-6 bg-amber-50 md:col-span-4">
          <FinanceSummaryCard />
        </div>

        <div className="col-span-6 col-start-4 bg-green-50 md:col-span-4 md:col-start-auto">QUICK ACTIONS HERE</div>

        <div className="col-span-12 bg-cyan-50 md:col-span-7">
          <TransactionHistory transactions={demoTransactions} />
        </div>

        <div className="col-span-12 bg-blue-50 md:col-span-5">MOST RECURRENT EXPENSE HERE</div>
      </div>
    </ContentPanel>
  );
};

export default Home;
