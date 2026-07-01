import { useEffect, useMemo, useState } from 'react';
import { Card, Modal, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { faChartArea, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

import ContentPanel from '../components/core/layout/ContentPanel';
import QuickActionsCard from '../components/domain/QuickActionsCard';
import TransactionForm from '../components/domain/TransactionForm';
import TransactionsByTypeTabs from '../components/domain/TransactionsByTypeTabs';
import { buildTransactionsSummary } from '../api/transactions/transactionsAggregations';
import formatCurrency from '../helpers/core/formatCurrency';
import demoTransactionCategories from './demoTransactionCategories';
import demoTransactions from './demoTransactions';

const { Text, Title } = Typography;

const WalletPage = () => {
  const [loading] = useState(false);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const transactionsSummary = useMemo(() => buildTransactionsSummary({ transactions: demoTransactions }), []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.get('action') === 'add') {
      setIsAddTransactionModalOpen(true);
    }
  }, [location.search]);

  const openAddTransactionModal = () => setIsAddTransactionModalOpen(true);

  const closeAddTransactionModal = () => {
    setIsAddTransactionModalOpen(false);

    const searchParams = new URLSearchParams(location.search);

    if (searchParams.get('action') === 'add') {
      navigate('/wallet', { replace: true });
    }
  };

  const handleCreateTransaction = values =>
    Promise.resolve(values).then(() => {
      closeAddTransactionModal();
    });

  const walletActions = [
    {
      key: 'add',
      label: t('components.walletActions.actions.add'),
      onClick: openAddTransactionModal,
      icon: faPlus
    },
    {
      key: 'filters',
      label: t('components.walletActions.actions.filters'),
      to: '/wallet?panel=filters',
      icon: faFilter
    },
    {
      key: 'stats',
      label: t('components.walletActions.actions.stats'),
      to: '/statistics',
      icon: faChartArea
    }
  ];

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

        <div className="col-span-12 md:col-span-6">
          <QuickActionsCard title={t('components.walletActions.title')} actions={walletActions} />
        </div>

        <div className="col-span-12 md:col-span-12">
          <TransactionsByTypeTabs transactions={demoTransactions} />
        </div>
      </div>

      <Modal
        title={t('components.addTransactionModal.title')}
        open={isAddTransactionModalOpen}
        onCancel={closeAddTransactionModal}
        footer={null}
        destroyOnClose
        width={520}
      >
        <TransactionForm
          categories={demoTransactionCategories}
          currency="USD"
          onSubmit={handleCreateTransaction}
          className="shadow-none"
        />
      </Modal>
    </ContentPanel>
  );
};

export default WalletPage;
