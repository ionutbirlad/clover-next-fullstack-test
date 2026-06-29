import { Segmented } from 'antd';

import { classNames } from '../../../helpers/core/utils';

const transactionTypeOptions = [
  {
    value: 'income',
    label: (
      <span className="inline-flex items-center justify-center gap-2">
        <span className="bg-success h-2 w-2 rounded-full" />
        Income
      </span>
    )
  },
  {
    value: 'expense',
    label: (
      <span className="inline-flex items-center justify-center gap-2">
        <span className="bg-error h-2 w-2 rounded-full" />
        Expense
      </span>
    )
  }
];

const TransactionTypeSegmented = ({
  value,
  defaultValue = 'expense',
  onChange,
  disabled = false,
  block = true,
  className = '',
  ...props
}) => {
  const valueProps = value !== undefined ? { value } : { defaultValue };

  return (
    <Segmented
      {...valueProps}
      block={block}
      disabled={disabled}
      options={transactionTypeOptions}
      onChange={onChange}
      className={classNames('bg-transparent p-1', className)}
      {...props}
    />
  );
};

export default TransactionTypeSegmented;
