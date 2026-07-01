import { useMemo, useState } from 'react';
import { Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import ContentPanel from '../components/core/layout/ContentPanel';
import { buildTransactionsSummary } from '../api/transactions/transactionsAggregations';
import formatCurrency from '../helpers/core/formatCurrency';
import demoTransactions from './demoTransactions';

const { Text, Title } = Typography;

const WalletPage = () => {
  const [loading] = useState(false);
  const { t } = useTranslation();
  const transactionsSummary = useMemo(() => buildTransactionsSummary({ transactions: demoTransactions }), []);

  return (
    <ContentPanel title="Dashboard" loading={loading}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-6">
          <Card
            bordered={false}
            className="h-full rounded-[18px] shadow-[0_12px_32px_rgb(47_126_121_/_10%)]"
            styles={{ body: { height: '100%', padding: 20 } }}
          >
            <div className="flex h-full min-h-[108px] flex-col justify-center">
              <Text className="!text-secondary !text-sm">{t('components.walletBalance.title')}</Text>
              <Title level={2} className="!mb-0 !mt-2 !text-[28px] !leading-tight">
                {formatCurrency({ value: transactionsSummary.balance, currency: 'USD', locale: 'en-US' })}
              </Title>
            </div>
          </Card>
        </div>

        <div className="col-span-12 bg-amber-50 md:col-span-6">WALLET ACTIONS HERE</div>

        <div className="col-span-12 bg-green-50 md:col-span-12">INCOMES AND EXPENSES TAB HERE</div>
      </div>
    </ContentPanel>
  );
};

export default WalletPage;
