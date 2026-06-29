import { Card, Empty, Typography } from 'antd';

import TransactionHistoryItem from '../TransactionHistoryItem/TransactionHistoryItem';

import { classNames } from '../../../helpers/core/utils';
import styles from './TransactionHistory.module.css';

const { Text, Title } = Typography;

const TransactionHistory = ({
  title = 'Transactions History',
  transactions = [],
  maxItems = 5,
  seeAllLabel = 'See all',
  onSeeAll,
  currency = 'USD',
  locale = 'en-US',
  className = ''
}) => {
  const visibleTransactions = transactions.slice(0, maxItems);

  return (
    <Card
      bordered={false}
      className={classNames(styles.card, 'w-full', 'h-fit', className)}
      styles={{ body: { padding: 0 } }}
    >
      <div className="flex items-center justify-between gap-4">
        <Title level={5} className="!m-0 !text-base !font-bold">
          {title}
        </Title>

        {seeAllLabel && onSeeAll ? (
          <button type="button" className={styles['see-all-button']} onClick={onSeeAll}>
            {seeAllLabel}
          </button>
        ) : (
          <Text className="!text-secondary !text-xs">{seeAllLabel}</Text>
        )}
      </div>

      {visibleTransactions.length > 0 ? (
        <div className="mt-5 space-y-4">
          {visibleTransactions.map(transaction => (
            <TransactionHistoryItem
              key={transaction.id}
              transaction={transaction}
              currency={currency}
              locale={locale}
            />
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No transactions yet" className="mb-0 mt-6" />
      )}
    </Card>
  );
};

export default TransactionHistory;
