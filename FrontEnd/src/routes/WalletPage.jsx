import { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, message, Modal, Spin, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { faChartArea, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

import ContentPanel from '../components/core/layout/ContentPanel';
import QuickActionsCard from '../components/domain/QuickActionsCard';
import TransactionDetailTable from '../components/domain/TransactionDetailTable';
import TransactionForm from '../components/domain/TransactionForm';
import TransactionsByTypeTabs from '../components/domain/TransactionsByTypeTabs';
import transactionsApi from '../api/transactions/transactionsApi';
import { buildTransactionsSummary } from '../api/transactions/transactionsAggregations';
import formatCurrency from '../helpers/core/formatCurrency';

const { Text, Title } = Typography;

const WalletPage = () => {
  const [loading, setLoading] = useState(true);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [isTransactionDetailModalOpen, setIsTransactionDetailModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isTransactionDetailLoading, setIsTransactionDetailLoading] = useState(false);
  const [transactionCategories, setTransactionCategories] = useState([]);
  const [isTransactionCategoriesLoading, setIsTransactionCategoriesLoading] = useState(false);
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [deletingTransactionId, setDeletingTransactionId] = useState(null);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const transactionsSummary = useMemo(
    () => buildTransactionsSummary({ transactions: walletTransactions }),
    [walletTransactions]
  );

  const fetchWalletTransactions = useCallback(async () => {
    const res = await transactionsApi.getTransactions();

    if (!res.ok) throw new Error(res.errorMessage || t('components.transactionsHistory.loadError'));

    return res.data;
  }, [t]);

  const fetchTransactionCategories = useCallback(async () => {
    const res = await transactionsApi.getCategories();

    if (!res.ok) throw new Error(res.errorMessage || t('components.transactionCategories.loadError'));

    return res.data;
  }, [t]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.get('action') === 'add') {
      setIsAddTransactionModalOpen(true);
    }
  }, [location.search]);

  useEffect(() => {
    let shouldUpdate = true;

    const fetchTransactions = async () => {
      setLoading(true);

      const transactions = await fetchWalletTransactions();

      if (!shouldUpdate) return;

      setWalletTransactions(transactions);

      setLoading(false);
    };

    fetchTransactions().catch(error => {
      if (!shouldUpdate) return;

      message.error(error.message);
      setLoading(false);
    });

    return () => {
      shouldUpdate = false;
    };
  }, [fetchWalletTransactions]);

  useEffect(() => {
    if (!isAddTransactionModalOpen || transactionCategories.length > 0) return undefined;

    let shouldUpdate = true;

    const loadCategories = async () => {
      setIsTransactionCategoriesLoading(true);

      const categories = await fetchTransactionCategories();

      if (!shouldUpdate) return;

      setTransactionCategories(categories);
      setIsTransactionCategoriesLoading(false);
    };

    loadCategories().catch(error => {
      if (!shouldUpdate) return;

      message.error(error.message);
      setIsTransactionCategoriesLoading(false);
    });

    return () => {
      shouldUpdate = false;
    };
  }, [fetchTransactionCategories, isAddTransactionModalOpen, transactionCategories.length]);

  const openAddTransactionModal = () => setIsAddTransactionModalOpen(true);

  const closeAddTransactionModal = () => {
    setIsAddTransactionModalOpen(false);

    const searchParams = new URLSearchParams(location.search);

    if (searchParams.get('action') === 'add') {
      navigate('/wallet', { replace: true });
    }
  };

  const handleCreateTransaction = async values => {
    const res = await transactionsApi.createTransaction(values);

    if (!res.ok) throw new Error(res.errorMessage || t('components.addTransactionModal.error'));

    const transactions = await fetchWalletTransactions();

    setWalletTransactions(transactions);
    closeAddTransactionModal();
  };

  const closeTransactionDetailModal = () => {
    setIsTransactionDetailModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleOpenTransactionDetail = async transaction => {
    setIsTransactionDetailModalOpen(true);
    setSelectedTransaction(null);
    setIsTransactionDetailLoading(true);

    try {
      const res = await transactionsApi.getTransactionById(transaction.id);

      if (!res.ok) throw new Error(res.errorMessage || t('components.transactionDetailModal.error'));

      setSelectedTransaction(res.data);
    } catch (error) {
      message.error(error.message || t('components.transactionDetailModal.error'));
    } finally {
      setIsTransactionDetailLoading(false);
    }
  };

  const handleDeleteTransaction = async transaction => {
    setDeletingTransactionId(transaction.id);

    try {
      const res = await transactionsApi.deleteTransaction(transaction.id);

      if (!res.ok) throw new Error(res.errorMessage || t('components.transactionsByTypeTabs.delete.error'));

      setWalletTransactions(currentTransactions =>
        currentTransactions.filter(currentTransaction => currentTransaction.id !== transaction.id)
      );
    } catch (error) {
      message.error(error.message || t('components.transactionsByTypeTabs.delete.error'));
    } finally {
      setDeletingTransactionId(null);
    }
  };

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
          <TransactionsByTypeTabs
            transactions={walletTransactions}
            onDelete={handleDeleteTransaction}
            onSelect={handleOpenTransactionDetail}
            deletingTransactionId={deletingTransactionId}
          />
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
        <Spin spinning={isTransactionCategoriesLoading}>
          <TransactionForm
            categories={transactionCategories}
            currency="USD"
            disabled={isTransactionCategoriesLoading}
            onSubmit={handleCreateTransaction}
            className="shadow-none"
          />
        </Spin>
      </Modal>

      <Modal
        title={t('components.transactionDetailModal.title')}
        open={isTransactionDetailModalOpen}
        onCancel={closeTransactionDetailModal}
        footer={null}
        destroyOnClose
        width={520}
      >
        <Spin spinning={isTransactionDetailLoading}>
          <TransactionDetailTable
            transaction={selectedTransaction}
            categories={transactionCategories}
            className="shadow-none"
          />
        </Spin>
      </Modal>
    </ContentPanel>
  );
};

export default WalletPage;
