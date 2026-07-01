import { useState, useMemo } from 'react';

import ContentPanel from '../components/core/layout/ContentPanel';

import TransactionTrendChart from '../components/domain/TransactionTrendChart';
import TopTransactionsCard from '../components/domain/TopTransactionsCard';

import buildTransactionTrendData from '../api/transactions/transactionsAggregations';
import demoTransactions from './demoTransactions';

const StatisticsPage = () => {
  const [loading] = useState(false);

  const [trendRange, setTrendRange] = useState('day');
  const [trendMetric, setTrendMetric] = useState('expense');

  const trendData = useMemo(
    () => buildTransactionTrendData({ transactions: demoTransactions, range: trendRange }),
    [trendRange]
  );

  return (
    <ContentPanel title="Dashboard" loading={loading}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-7">
          <TransactionTrendChart
            data={trendData}
            range={trendRange}
            onRangeChange={setTrendRange}
            metric={trendMetric}
            onMetricChange={setTrendMetric}
          />
        </div>

        <div className="col-span-12 md:col-span-5">
          <TopTransactionsCard transactions={demoTransactions} type={trendMetric} />
        </div>
      </div>
    </ContentPanel>
  );
};

export default StatisticsPage;
