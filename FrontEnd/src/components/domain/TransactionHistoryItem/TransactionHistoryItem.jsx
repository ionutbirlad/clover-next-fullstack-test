import { Button, Popconfirm, Space, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import TransactionCategoryIcon from '../TransactionCategoryIcon';

import { classNames } from '../../../helpers/core/utils';
import formatCurrency from '../../../helpers/core/formatCurrency';
import formatDate from '../../../helpers/core/formatDate';
import styles from './TransactionHistoryItem.module.css';

const { Text } = Typography;

const getAmountLabel = ({ amount, type, currency, locale }) => {
  const normalizedAmount = Math.abs(Number(amount) || 0);
  const prefix = type === 'income' ? '+' : '-';

  return `${prefix} ${formatCurrency({ value: normalizedAmount, currency, locale })}`;
};

const TransactionHistoryItem = ({
  transaction,
  currency = 'USD',
  locale = 'en-US',
  onDelete,
  onSelect,
  deleteLoading = false,
  className = ''
}) => {
  const { t } = useTranslation();
  const isIncome = transaction.type === 'income';
  const isSelectable = Boolean(onSelect);

  const handleSelect = () => {
    if (onSelect) onSelect(transaction);
  };

  const handleKeyDown = event => {
    if (!isSelectable) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect();
    }
  };

  return (
    <div
      key={transaction.id}
      role={isSelectable ? 'button' : undefined}
      tabIndex={isSelectable ? 0 : undefined}
      onClick={isSelectable ? handleSelect : undefined}
      onKeyDown={handleKeyDown}
      className={classNames(
        'flex items-center gap-3',
        isSelectable && 'cursor-pointer rounded-xl transition-colors hover:bg-[rgb(47_126_121_/_6%)]',
        className
      )}
    >
      <span
        className={classNames(styles['icon-box'], isIncome ? styles['icon-box-income'] : styles['icon-box-expense'])}
      >
        <TransactionCategoryIcon category={transaction.category} />
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

        {onDelete ? (
          <Popconfirm
            placement="left"
            title={t('components.transactionsByTypeTabs.delete.confirmTitle')}
            okText={t('common.yes')}
            cancelText={t('common.no')}
            onConfirm={() => onDelete(transaction)}
          >
            <Button
              type="text"
              size="small"
              loading={deleteLoading}
              aria-label={t('components.transactionsByTypeTabs.delete.ariaLabel')}
              className="!text-secondary hover:!text-error"
              icon={<FontAwesomeIcon icon={faTrashAlt} />}
              onClick={event => event.stopPropagation()}
              onKeyDown={event => event.stopPropagation()}
            />
          </Popconfirm>
        ) : null}
      </Space>
    </div>
  );
};

export default TransactionHistoryItem;
