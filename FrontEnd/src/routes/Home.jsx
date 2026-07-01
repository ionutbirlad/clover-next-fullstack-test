import { useContext, useState } from 'react';
import { Badge, Button, Card, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import ContentPanel from '../components/core/layout/ContentPanel';
import AuthContext from '../helpers/core/AuthContext';

import FinanceSummaryCard from '../components/domain/FinanceSummaryCard';
import TransactionHistory from '../components/domain/TransactionHistory';
import UserPic from '../components/core/user/UserPic';

const { Text, Title } = Typography;

const getUserDisplayName = user =>
  user?.fullname || [user?.name, user?.lastname].filter(Boolean).join(' ') || user?.email || 'User';

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
  const { logged } = useContext(AuthContext);

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
