import { Card, Empty, Typography } from 'antd';

import { useTranslation } from 'react-i18next';

import TransactionHistoryItem from '../TransactionHistoryItem';

import { classNames } from '../../../helpers/core/utils';
import styles from './TransactionHistory.module.css';

const { Text, Title } = Typography;

const TransactionHistory = ({
  transactions = [],
  maxItems = 5,
  onSeeAll,
  onSelect,
  currency = 'USD',
  locale = 'en-US',
  className = ''
}) => {
  const { t } = useTranslation();
  const visibleTransactions = transactions.slice(0, maxItems);

  return (
    <Card
      bordered={false}
      className={classNames(styles.card, 'w-full', 'h-fit', className)}
      styles={{ body: { padding: 0 } }}
    >
      <div className="flex items-center justify-between gap-4">
        <Title level={5} className="!m-0 !text-base !font-bold">
          {t('components.transactionsHistory.title')}
        </Title>

        {onSeeAll ? (
          <button type="button" className={styles['see-all-button']} onClick={onSeeAll}>
            {t('components.transactionsHistory.seeAll')}
          </button>
        ) : (
          <Text className="!text-secondary !text-xs">{t('components.transactionsHistory.seeAll')}</Text>
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
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={t('components.transactionsHistory.empty')}
          className="mb-0 mt-6"
        />
      )}
    </Card>
  );
};

export default TransactionHistory;
