import { useContext, useEffect, useMemo, useState } from 'react';
import { Badge, Button, Card, Empty, message, Modal, Progress, Spin, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChartArea, faPlus, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ContentPanel from '../components/core/layout/ContentPanel';
import AuthContext from '../helpers/core/AuthContext';

import FinanceSummaryCard from '../components/domain/FinanceSummaryCard';
import TransactionHistory from '../components/domain/TransactionHistory';
import TransactionDetailTable from '../components/domain/TransactionDetailTable';
import UserPic from '../components/core/user/UserPic';
import TransactionCategoryIcon from '../components/domain/TransactionCategoryIcon';
import QuickActionsCard from '../components/domain/QuickActionsCard';
import transactionsApi from '../api/transactions/transactionsApi';
import { buildMostRecurringExpenses, buildTransactionsSummary } from '../api/transactions/transactionsAggregations';
import formatCurrency from '../helpers/core/formatCurrency';
import demoTransactionCategories from './demoTransactionCategories';

const { Text, Title } = Typography;

const getUserDisplayName = user =>
  user?.fullname || [user?.name, user?.lastname].filter(Boolean).join(' ') || user?.email || 'User';

const formatCategoryLabel = category =>
  category
    ? category
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [isTransactionDetailModalOpen, setIsTransactionDetailModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isTransactionDetailLoading, setIsTransactionDetailLoading] = useState(false);
  const { logged } = useContext(AuthContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const transactionsSummary = useMemo(() => buildTransactionsSummary({ transactions }), [transactions]);
  const mostRecurringExpenses = useMemo(() => buildMostRecurringExpenses({ transactions }), [transactions]);

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

  const quickActions = [
    {
      key: 'add',
      label: t('components.quickActions.actions.add'),
      to: '/wallet?action=add',
      icon: faPlus
    },
    {
      key: 'wallet',
      label: t('components.quickActions.actions.wallet'),
      to: '/wallet',
      icon: faWallet
    },
    {
      key: 'stats',
      label: t('components.quickActions.actions.stats'),
      to: '/statistics',
      icon: faChartArea
    }
  ];

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

  return (
    <ContentPanel title="Dashboard" loading={loading}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-6 md:col-span-4">
          <Card
            bordered={false}
            className="h-full overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-info)_100%)] shadow-[0_12px_32px_rgb(47_126_121_/_10%)]"
            styles={{ body: { height: '100%', padding: 0 } }}
          >
            <div className="relative flex h-full min-h-[148px] items-center justify-between gap-4 px-5 py-[18px] text-white">
              <div className="pointer-events-none absolute -right-10 -top-14 h-32 w-32 rounded-full bg-white/10" />
              <div className="pointer-events-none absolute -bottom-16 left-12 h-36 w-36 rounded-full bg-white/5" />

              <div className="relative min-w-0">
                <Text className="block !text-xs !font-medium !text-white/90">Good afternoon,</Text>
                <Title level={4} className="!mb-0 !mt-2 truncate !text-lg !font-bold !leading-tight !text-white">
                  {getUserDisplayName(logged)}
                </Title>
              </div>

              <div className="relative flex shrink-0 items-center gap-3">
                <UserPic user={logged} size={42} link={false} />
                <Badge dot color="var(--color-warning)" offset={[-4, 4]}>
                  <Button
                    type="text"
                    shape="circle"
                    aria-label="Notifications"
                    className="h-11 w-11 bg-white/10 !text-white hover:!bg-white/20 hover:!text-white"
                    icon={<FontAwesomeIcon icon={faBell} />}
                  />
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-span-6 md:col-span-4">
          <FinanceSummaryCard
            balance={transactionsSummary.balance}
            income={transactionsSummary.income}
            expenses={transactionsSummary.expenses}
          />
        </div>

        <div className="col-span-6 col-start-4 md:col-span-4 md:col-start-auto">
          <QuickActionsCard title={t('components.quickActions.title')} actions={quickActions} />
        </div>

        <div className="col-span-12 md:col-span-7">
          <TransactionHistory
            transactions={transactions}
            onSeeAll={() => navigate('/wallet')}
            onSelect={handleOpenTransactionDetail}
          />
        </div>

        <div className="col-span-12 md:col-span-5">
          <Card
            bordered={false}
            className="h-full rounded-[18px] shadow-[0_12px_32px_rgb(47_126_121_/_10%)]"
            styles={{ body: { height: '100%', padding: 20 } }}
          >
            <div className="flex h-full min-h-[248px] flex-col gap-5">
              <div>
                <Title level={5} className="!m-0 !text-base !font-bold">
                  {t('components.mostRecurringExpenses.title')}
                </Title>
                <Text className="!text-secondary !text-xs">{t('components.mostRecurringExpenses.subtitle')}</Text>
              </div>

              {mostRecurringExpenses.length > 0 ? (
                <div className="space-y-4">
                  {mostRecurringExpenses.map(expense => (
                    <div key={expense.category} className="flex items-center gap-3">
                      <span className="text-error flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgb(255_56_60_/_8%)]">
                        <TransactionCategoryIcon category={expense.category} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <Text className="block truncate !text-sm !font-semibold">
                              {formatCategoryLabel(expense.category)}
                            </Text>
                            <Text className="!text-secondary block truncate !text-xs">
                              {t('components.mostRecurringExpenses.count', { count: expense.count })}
                            </Text>
                          </div>

                          <Text className="shrink-0 !text-sm !font-bold">
                            {formatCurrency({ value: expense.total, currency: 'USD', locale: 'en-US' })}
                          </Text>
                        </div>

                        <Progress
                          percent={expense.percentage}
                          showInfo={false}
                          strokeColor="var(--color-error)"
                          trailColor="rgb(255 56 60 / 8%)"
                          className="m-0"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={t('components.mostRecurringExpenses.empty')}
                  className="mb-0 mt-4"
                />
              )}
            </div>
          </Card>
        </div>
      </div>

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
            categories={demoTransactionCategories}
            className="shadow-none"
          />
        </Spin>
      </Modal>
    </ContentPanel>
  );
};

export default Home;
