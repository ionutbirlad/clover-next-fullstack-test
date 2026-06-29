import { useEffect, useMemo, useRef } from 'react';
import { DatePicker, Form, Input, Typography } from 'antd';
import dayjs from 'dayjs';

import CostInput from '../../core/controls/CostInput';
import SubmitButton from '../../core/controls/SubmitButton';
import WrapperForm from '../../core/controls/WrapperForm';
import { classNames } from '../../../helpers/core/utils';
import TransactionCategorySelect from '../TransactionCategorySelect';
import TransactionTypeSegmented from '../TransactionTypeSegmented';

const { Text, Title } = Typography;

const emptyInitialValues = {};

const normalizeInitialValues = initialValues => ({
  type: 'expense',
  ...initialValues,
  date: initialValues.date ? dayjs(initialValues.date) : undefined
});

const TransactionForm = ({
  categories = [],
  initialValues = emptyInitialValues,
  submitLabel = 'Save transaction',
  onSubmit,
  disabled = false,
  currency,
  className = ''
}) => {
  const [form] = Form.useForm();
  const submitButtonRef = useRef(null);

  const formInitialValues = useMemo(() => normalizeInitialValues(initialValues), [initialValues]);
  const selectedType = Form.useWatch('type', form) || formInitialValues.type;

  useEffect(() => {
    form.setFieldsValue(formInitialValues);
  }, [form, formInitialValues]);

  const handleValuesChange = changedValues => {
    if (Object.prototype.hasOwnProperty.call(changedValues, 'type')) {
      form.setFieldValue('category', undefined);
    }
  };

  const handleFinish = values => {
    const payload = {
      ...values,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined
    };

    return Promise.resolve(onSubmit?.(payload));
  };

  return (
    <div
      className={classNames('h-fit w-full rounded-[18px] p-5 shadow-[0_12px_32px_rgb(47_126_121_/_10%)]', className)}
    >
      <div className="mb-5">
        <Title level={5} className="!m-0 !text-base !font-bold">
          Transaction
        </Title>
        <Text className="!text-secondary !text-xs">Create or update a financial movement</Text>
      </div>

      <WrapperForm
        form={form}
        layout="vertical"
        initialValues={formInitialValues}
        onSubmit={handleFinish}
        onValuesChange={handleValuesChange}
        submitBtn={submitButtonRef}
        disabled={disabled}
      >
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: 'Select a transaction type' }]}
          className="mb-4"
        >
          <TransactionTypeSegmented />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Select a transaction category' }]}
          className="mb-4"
        >
          <TransactionCategorySelect categories={categories} type={selectedType} placeholder="Select category" />
        </Form.Item>

        <Form.Item
          label="Name"
          name="title"
          rules={[
            { required: true, message: 'Enter a transaction name' },
            { max: 80, message: 'Name cannot exceed 80 characters' }
          ]}
          className="mb-4"
        >
          <Input placeholder="Netflix" />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: 'Enter an amount' }]}
          className="mb-4"
        >
          <CostInput className="w-full" controls={false} placeholder="48.00" currency={currency} />
        </Form.Item>

        <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Select a date' }]} className="mb-6">
          <DatePicker className="w-full" format="ddd, DD MMM YYYY" />
        </Form.Item>

        <SubmitButton ref={submitButtonRef} type="primary" block>
          {submitLabel}
        </SubmitButton>
      </WrapperForm>
    </div>
  );
};

export default TransactionForm;
