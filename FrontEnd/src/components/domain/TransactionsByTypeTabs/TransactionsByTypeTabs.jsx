import { useMemo, useState } from 'react';
import { Card, Empty, Segmented } from 'antd';
import { useTranslation } from 'react-i18next';

import { classNames } from '../../../helpers/core/utils';
import TransactionHistoryItem from '../TransactionHistoryItem';

const getTransactionTime = transaction => {
  const parsedDate = new Date(transaction.date);
  return Number.isNaN(parsedDate.getTime()) ? 0 : parsedDate.getTime();
};

const TransactionsByTypeTabs = ({
  transactions = [],
  defaultType = 'income',
  currency = 'USD',
  locale = 'en-US',
  onDelete,
  deletingTransactionId,
  className = ''
}) => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState(defaultType);

  const segmentedOptions = [
    { label: t('components.transactionsByTypeTabs.tabs.income'), value: 'income' },
    { label: t('components.transactionsByTypeTabs.tabs.expense'), value: 'expense' }
  ];

  const visibleTransactions = useMemo(
    () =>
      transactions
        .filter(transaction => transaction.type === selectedType)
        .sort((a, b) => getTransactionTime(b) - getTransactionTime(a)),
    [transactions, selectedType]
  );

  return (
    <Card
      bordered={false}
      className={classNames('h-full rounded-[18px] shadow-[0_12px_32px_rgb(47_126_121_/_10%)]', className)}
      styles={{ body: { height: '100%', padding: 20 } }}
    >
      <div className="flex min-h-[264px] flex-col">
        <Segmented
          block
          size="large"
          value={selectedType}
          options={segmentedOptions}
          onChange={setSelectedType}
          className="rounded-full bg-[var(--ant-color-bg-layout)] p-1"
        />

        {visibleTransactions.length > 0 ? (
          <div className="mt-5 space-y-4">
            {visibleTransactions.map(transaction => (
              <TransactionHistoryItem
                key={transaction.id}
                transaction={transaction}
                currency={currency}
                locale={locale}
                onDelete={onDelete}
                deleteLoading={deletingTransactionId === transaction.id}
              />
            ))}
          </div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={t('components.transactionsByTypeTabs.empty')}
            className="mb-0 mt-8"
          />
        )}
      </div>
    </Card>
  );
};

export default TransactionsByTypeTabs;
