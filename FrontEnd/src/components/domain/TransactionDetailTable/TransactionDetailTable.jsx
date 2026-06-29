import { Card, Divider, Empty, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { classNames } from '../../../helpers/core/utils';
import formatCurrency from '../../../helpers/core/formatCurrency';
import formatDate from '../../../helpers/core/formatDate';
import TransactionCategoryIcon from '../TransactionCategoryIcon';

const { Text, Title } = Typography;

const humanize = value =>
  value
    ? value
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';

const getCategoryLabel = ({ category, categories }) =>
  categories.find(item => item.value === category)?.label || humanize(category);

const DetailRow = ({ label, value, valueClassName = '' }) => (
  <div className="flex items-start justify-between gap-6">
    <Text className="!text-secondary !text-sm">{label}</Text>
    <Text className={classNames('max-w-[60%] text-right !text-sm !font-medium', valueClassName)}>{value || '-'}</Text>
  </div>
);

const TransactionDetailTable = ({
  transaction,
  categories = [],
  currency = 'USD',
  locale = 'en-US',
  className = ''
}) => {
  if (!transaction) {
    return (
      <Card
        bordered={false}
        className={classNames('h-fit w-full rounded-[18px] p-5 shadow-[0_12px_32px_rgb(47_126_121_/_10%)]', className)}
        styles={{ body: { padding: 0 } }}
      >
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No transaction selected" className="mb-0" />
      </Card>
    );
  }

  const isIncome = transaction.type === 'income';
  const typeLabel = isIncome ? 'Income' : 'Expense';
  const amount = Math.abs(Number(transaction.amount) || 0);
  const typeColorClass = isIncome ? '!text-success' : '!text-error';
  const iconBoxClass = isIncome ? 'bg-[rgb(37_169_105_/_10%)] text-success' : 'bg-[rgb(255_56_60_/_8%)] text-error';
  const categoryLabel = getCategoryLabel({ category: transaction.category, categories });
  const detailRows = [
    { label: 'Status', value: typeLabel, valueClassName: typeColorClass },
    { label: 'Name', value: transaction.title },
    { label: 'Category', value: categoryLabel },
    { label: 'Transaction date', value: formatDate({ date: transaction.date, locale }) },
    { label: 'Created', value: formatDate({ date: transaction.createdAt, locale, showTime: true }) },
    { label: 'Updated', value: formatDate({ date: transaction.updatedAt, locale, showTime: true }) }
  ];

  return (
    <Card
      bordered={false}
      className={classNames('h-fit w-full rounded-[18px] p-5 shadow-[0_12px_32px_rgb(47_126_121_/_10%)]', className)}
      styles={{ body: { padding: 0 } }}
    >
      <div className="flex flex-col items-center text-center">
        <span
          className={classNames('mb-3 flex h-14 w-14 items-center justify-center rounded-full text-2xl', iconBoxClass)}
        >
          <TransactionCategoryIcon category={transaction.category} />
        </span>

        <Text
          className={classNames(
            'mb-1 rounded-full px-3 py-1 !text-xs !font-medium',
            isIncome ? '!text-success !bg-[rgb(37_169_105_/_10%)]' : '!text-error !bg-[rgb(255_56_60_/_8%)]'
          )}
        >
          {typeLabel}
        </Text>

        <Title level={3} className="!mb-0 !mt-0 !text-2xl !font-bold">
          {formatCurrency({ value: amount, currency, locale })}
        </Title>
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <Title level={5} className="!m-0 !text-base !font-semibold">
            Transaction details
          </Title>
          <FontAwesomeIcon icon={faChevronUp} className="text-secondary h-3 w-3" />
        </div>

        <div className="space-y-3">
          {detailRows.map(row => (
            <DetailRow key={row.label} label={row.label} value={row.value} valueClassName={row.valueClassName} />
          ))}
        </div>

        <Divider className="!my-5" />

        <DetailRow
          label="Total"
          value={formatCurrency({ value: amount, currency, locale })}
          valueClassName="!font-bold"
        />
      </div>
    </Card>
  );
};

export default TransactionDetailTable;
