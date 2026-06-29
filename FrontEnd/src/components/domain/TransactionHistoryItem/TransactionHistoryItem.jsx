import { Space, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { classNames } from '../../../helpers/core/utils';
import formatCurrency from '../../../helpers/core/formatCurrency';
import formatDate from '../../../helpers/core/formatDate';
import getTransactionCategoryIcon from './transactionCategoryUi';
import styles from './TransactionHistoryItem.module.css';

const { Text } = Typography;

const getAmountLabel = ({ amount, type, currency, locale }) => {
  const normalizedAmount = Math.abs(Number(amount) || 0);
  const prefix = type === 'income' ? '+' : '-';

  return `${prefix} ${formatCurrency({ value: normalizedAmount, currency, locale })}`;
};

const TransactionHistoryItem = ({ transaction, currency = 'USD', locale = 'en-US', className = '' }) => {
  const isIncome = transaction.type === 'income';

  return (
    <div key={transaction.id} className={classNames('flex items-center gap-3', className)}>
      <span
        className={classNames(styles['icon-box'], isIncome ? styles['icon-box-income'] : styles['icon-box-expense'])}
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
};

export default TransactionHistoryItem;
