import { useEffect, useMemo, useState } from 'react';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

import ContentPanel from '../components/core/layout/ContentPanel';

import TransactionTrendChart from '../components/domain/TransactionTrendChart';
import TopTransactionsCard from '../components/domain/TopTransactionsCard';

import buildTransactionTrendData from '../api/transactions/transactionsAggregations';
import transactionsApi from '../api/transactions/transactionsApi';

const StatisticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [trendRange, setTrendRange] = useState('day');
  const [trendMetric, setTrendMetric] = useState('expense');
  const { t } = useTranslation();

  useEffect(() => {
    let shouldUpdate = true;

    const fetchTransactions = async () => {
      setLoading(true);

      const res = await transactionsApi.getTransactions();

      if (!shouldUpdate) return;

      if (res.ok) {
        setTransactions(res.data);
      } else {
        message.error(res.errorMessage || t('components.transactionsHistory.loadError'));
      }

      setLoading(false);
    };

    fetchTransactions().catch(error => {
      if (!shouldUpdate) return;

      message.error(error.message || t('components.transactionsHistory.loadError'));
      setLoading(false);
    });

    return () => {
      shouldUpdate = false;
    };
  }, [t]);

  const trendData = useMemo(
    () => buildTransactionTrendData({ transactions, range: trendRange }),
    [transactions, trendRange]
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
          <TopTransactionsCard transactions={transactions} type={trendMetric} />
        </div>
      </div>
    </ContentPanel>
  );
};

export default StatisticsPage;
