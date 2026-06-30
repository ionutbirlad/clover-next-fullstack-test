import { Select } from 'antd';

import { classNames } from '../../../helpers/core/utils';

const TransactionCategorySelect = ({
  categories = [],
  type,
  value,
  onChange,
  placeholder = 'Select category',
  disabled = false,
  allowClear = true,
  className = '',
  ...props
}) => {
  const filteredCategories = type ? categories.filter(category => category.type === type) : categories;
  const options = filteredCategories.map(category => ({
    value: category.value,
    label: category.label
  }));

  return (
    <Select
      showSearch
      allowClear={allowClear}
      disabled={disabled}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      optionFilterProp="label"
      notFoundContent="No categories available"
      className={classNames('w-full', className)}
      {...props}
    />
  );
};

export default TransactionCategorySelect;
