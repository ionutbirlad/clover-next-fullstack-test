import { Card, Empty, Space, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { classNames } from '../../../helpers/core/utils';
import formatCurrency from '../../../helpers/core/formatCurrency';
import formatDate from '../../../helpers/core/formatDate';
import getTransactionCategoryIcon from './transactionCategoryUi';
import styles from './TransactionHistory.module.css';

const { Text, Title } = Typography;

const getAmountLabel = ({ amount, type, currency, locale }) => {
  const normalizedAmount = Math.abs(Number(amount) || 0);
  const prefix = type === 'income' ? '+' : '-';

  return `${prefix} ${formatCurrency({ value: normalizedAmount, currency, locale })}`;
};

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
          {visibleTransactions.map(transaction => {
            const isIncome = transaction.type === 'income';

            return (
              <div key={transaction.id} className="flex items-center gap-3">
                <span
                  className={classNames(
                    styles['icon-box'],
                    isIncome ? styles['icon-box-income'] : styles['icon-box-expense']
                  )}
                >
                  <FontAwesomeIcon icon={getTransactionCategoryIcon(transaction.category)} />
                </span>

                <div className="min-w-0 flex-1">
                  <Text className="block truncate !text-sm !font-semibold !leading-tight">{transaction.title}</Text>
                  <Text className="!text-secondary block truncate !text-xs !leading-tight">
                    {formatDate({ date: transaction.date, dateLabel: transaction.dateLabel, locale })}
                  </Text>
                </div>

                <Space size={4} className="shrink-0">
                  <Text className={classNames('!text-sm !font-bold', isIncome ? '!text-success' : '!text-error')}>
                    {getAmountLabel({ amount: transaction.amount, type: transaction.type, currency, locale })}
                  </Text>
                </Space>
              </div>
            );
          })}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No transactions yet" className="mb-0 mt-6" />
      )}
    </Card>
  );
};

export default TransactionHistory;
