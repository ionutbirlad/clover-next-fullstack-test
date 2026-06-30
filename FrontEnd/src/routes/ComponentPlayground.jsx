import { useMemo, useState } from 'react';
import { Alert, Col, Row, Typography } from 'antd';

import ContentPanel from '../components/core/layout/ContentPanel';
import FinanceSummaryCard from '../components/domain/FinanceSummaryCard';
import TransactionDetailTable from '../components/domain/TransactionDetailTable';
import TransactionForm from '../components/domain/TransactionForm';
import TransactionHistory from '../components/domain/TransactionHistory';
import TransactionTrendChart from '../components/domain/TransactionTrendChart';
import buildTransactionTrendData from '../api/transactions/transactionsAggregations';

const { Paragraph } = Typography;

const demoTransactionCategories = [
  { value: 'salary', label: 'Salary', type: 'income' },
  { value: 'freelance', label: 'Freelance', type: 'income' },
  { value: 'food', label: 'Food', type: 'expense' },
  { value: 'bills', label: 'Bills', type: 'expense' },
  { value: 'shopping', label: 'Shopping', type: 'expense' }
];

// TransactionHistory component
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

const ComponentPlayground = () => {
  const [trendRange, setTrendRange] = useState('day');

  const trendData = useMemo(
    () => buildTransactionTrendData({ transactions: demoTrendTransactions, range: trendRange }),
    [trendRange]
  );

  return (
    <ContentPanel title="Component Playground">
      {/* TODO: temporary assessment playground. Remove this route before final polish if no longer useful. */}
      <Alert
        showIcon
        type="warning"
        message="Temporary playground"
        description="Sandbox page for validating new finance components during Milestone 3."
        className="mb-6"
      />

      <Paragraph type="secondary">
        This page is intentionally isolated from product routes and can be removed once the dashboard components are
        integrated.
      </Paragraph>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12} xl={8}>
          <FinanceSummaryCard />
        </Col>
        <Col xs={24} md={12} xl={8}>
          <TransactionHistory transactions={demoTransactions} />
        </Col>
        <Col xs={24} xl={12}>
          <TransactionTrendChart data={trendData} range={trendRange} onRangeChange={setTrendRange} />
        </Col>
        <Col xs={24} md={12} xl={8}>
          <TransactionForm
            categories={demoTransactionCategories}
            submitLabel="Add transaction"
            onSubmit={values => Promise.resolve(values)}
          />
        </Col>
        <Col xs={24} md={12} xl={8}>
          <TransactionDetailTable transaction={demoTransactions[0]} categories={demoTransactionCategories} />
        </Col>
      </Row>
    </ContentPanel>
  );
};

export default ComponentPlayground;
