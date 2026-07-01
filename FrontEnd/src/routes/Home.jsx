import { useContext, useMemo, useState } from 'react';
import { Badge, Button, Card, Empty, Progress, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChartArea, faPlus, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ContentPanel from '../components/core/layout/ContentPanel';
import AuthContext from '../helpers/core/AuthContext';

import FinanceSummaryCard from '../components/domain/FinanceSummaryCard';
import TransactionHistory from '../components/domain/TransactionHistory';
import UserPic from '../components/core/user/UserPic';
import TransactionCategoryIcon from '../components/domain/TransactionCategoryIcon';
import { buildMostRecurringExpenses } from '../api/transactions/transactionsAggregations';
import formatCurrency from '../helpers/core/formatCurrency';

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
    category: 'shopping'
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
  },
  {
    id: 'demo-groceries',
    title: 'Groceries',
    date: '2026-05-27T00:00:00.000Z',
    createdAt: '2026-05-27T18:05:00.000Z',
    updatedAt: '2026-05-27T18:05:00.000Z',
    amount: 42.5,
    type: 'expense',
    category: 'food'
  },
  {
    id: 'demo-dinner',
    title: 'Dinner',
    date: '2026-05-23T00:00:00.000Z',
    createdAt: '2026-05-23T20:25:00.000Z',
    updatedAt: '2026-05-23T20:25:00.000Z',
    amount: 37.9,
    type: 'expense',
    category: 'food'
  },
  {
    id: 'demo-electricity',
    title: 'Electricity bill',
    date: '2026-05-20T00:00:00.000Z',
    createdAt: '2026-05-20T09:15:00.000Z',
    updatedAt: '2026-05-20T09:15:00.000Z',
    amount: 74.2,
    type: 'expense',
    category: 'bills'
  }
];

const Home = () => {
  const [loading] = useState(false);
  const { logged } = useContext(AuthContext);
  const { t } = useTranslation();
  const mostRecurringExpenses = useMemo(() => buildMostRecurringExpenses({ transactions: demoTransactions }), []);
  const quickActions = [
    {
      label: t('components.quickActions.actions.add'),
      to: '/wallet',
      icon: faPlus
    },
    {
      label: t('components.quickActions.actions.wallet'),
      to: '/wallet',
      icon: faWallet
    },
    {
      label: t('components.quickActions.actions.stats'),
      to: '/statistics',
      icon: faChartArea
    }
  ];

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

        <div className="col-span-6 bg-amber-50 md:col-span-4">
          <FinanceSummaryCard />
        </div>

        <div className="col-span-6 col-start-4 md:col-span-4 md:col-start-auto">
          <Card
            bordered={false}
            className="h-full rounded-[18px] shadow-[0_12px_32px_rgb(47_126_121_/_10%)]"
            styles={{ body: { height: '100%', padding: 20 } }}
          >
            <div className="flex h-full min-h-[108px] flex-col justify-center gap-4">
              <Title level={5} className="!m-0 !text-center !text-sm !font-bold">
                {t('components.quickActions.title')}
              </Title>

              <div className="grid grid-cols-3 gap-2">
                {quickActions.map(action => (
                  <Link key={action.label} to={action.to} className="group min-w-0 text-center">
                    <Button
                      shape="circle"
                      size="large"
                      aria-label={action.label}
                      className="border-primary !text-primary group-hover:!border-primary group-hover:!bg-primary mx-auto flex h-11 w-11 items-center justify-center group-hover:!text-white"
                      icon={<FontAwesomeIcon icon={action.icon} />}
                    />
                    <Text className="!text-secondary group-hover:!text-primary mt-2 block truncate !text-xs">
                      {action.label}
                    </Text>
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="col-span-12 bg-cyan-50 md:col-span-7">
          <TransactionHistory transactions={demoTransactions} />
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
    </ContentPanel>
  );
};

export default Home;
