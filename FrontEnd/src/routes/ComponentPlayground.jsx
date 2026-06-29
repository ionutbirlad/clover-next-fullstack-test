import { useMemo, useState } from 'react';
import { Alert, Card, Col, Row, Typography } from 'antd';

import ContentPanel from '../components/core/layout/ContentPanel';
import FinanceSummaryCard from '../components/domain/FinanceSummaryCard';
import TransactionCategorySelect from '../components/domain/TransactionCategorySelect';
import TransactionHistory from '../components/domain/TransactionHistory';
import TransactionTrendChart from '../components/domain/TransactionTrendChart';
import TransactionTypeSegmented from '../components/domain/TransactionTypeSegmented';
import buildTransactionTrendData from '../components/domain/TransactionTrendChart/buildTransactionTrendData';

const { Paragraph, Text, Title } = Typography;

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
    dateLabel: 'Today',
    amount: 850,
    type: 'income',
    category: 'freelance'
  },
  {
    id: 'demo-transfer',
    title: 'Transfer',
    date: '2026-06-28T00:00:00.000Z',
    dateLabel: 'Yesterday',
    amount: 85,
    type: 'expense',
    category: 'salary'
  },
  {
    id: 'demo-paypal',
    title: 'Paypal',
    date: '2026-06-18T00:00:00.000Z',
    dateLabel: 'Jan 30, 2022',
    amount: 1406,
    type: 'income',
    category: 'food'
  },
  {
    id: 'demo-youtube',
    title: 'Youtube',
    date: '2026-05-30T00:00:00.000Z',
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
  const [transactionType, setTransactionType] = useState('expense');
  const [transactionCategory, setTransactionCategory] = useState();

  const trendData = useMemo(
    () => buildTransactionTrendData({ transactions: demoTrendTransactions, range: trendRange }),
    [trendRange]
  );

  const handleTransactionTypeChange = type => {
    setTransactionType(type);
    setTransactionCategory(undefined);
  };

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
          <Card
            bordered={false}
            className="h-fit w-full rounded-[18px] p-5 shadow-[0_12px_32px_rgb(47_126_121_/_10%)]"
            styles={{ body: { padding: 0 } }}
          >
            <div className="flex flex-col gap-4">
              <div>
                <Title level={5} className="!m-0 !text-base !font-bold">
                  Transaction Controls
                </Title>
                <Text className="!text-secondary !text-xs">Form-ready inputs for add/edit transaction flows</Text>
              </div>

              <TransactionTypeSegmented value={transactionType} onChange={handleTransactionTypeChange} />
              <TransactionCategorySelect
                categories={demoTransactionCategories}
                type={transactionType}
                value={transactionCategory}
                onChange={setTransactionCategory}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </ContentPanel>
  );
};

export default ComponentPlayground;
