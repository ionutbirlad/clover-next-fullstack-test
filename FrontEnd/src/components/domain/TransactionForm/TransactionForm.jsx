import { useEffect, useMemo, useRef } from 'react';
import { DatePicker, Form, Input, Typography } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

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
  onSubmit,
  disabled = false,
  currency,
  className = ''
}) => {
  const { t } = useTranslation();
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
          {t('components.transactionForm.title')}
        </Title>
        <Text className="!text-secondary !text-xs">{t('components.transactionForm.subtitle')}</Text>
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
          label={t('components.transactionForm.typeSelection.label')}
          name="type"
          rules={[{ required: true, message: t('components.transactionForm.typeSelection.errorMessage') }]}
          className="mb-4"
        >
          <TransactionTypeSegmented />
        </Form.Item>

        <Form.Item
          label={t('components.transactionForm.categorySelection.label')}
          name="category"
          rules={[{ required: true, message: t('components.transactionForm.categorySelection.errorMessage') }]}
          className="mb-4"
        >
          <TransactionCategorySelect
            categories={categories}
            type={selectedType}
            placeholder={t('components.transactionForm.categorySelection.placeholder')}
          />
        </Form.Item>

        <Form.Item
          label={t('components.transactionForm.name.label')}
          name="title"
          rules={[
            { required: true, message: t('components.transactionForm.name.errors.required') },
            { max: 80, message: t('components.transactionForm.name.errors.exceed') }
          ]}
          className="mb-4"
        >
          <Input placeholder={t('components.transactionForm.name.placeholder')} />
        </Form.Item>

        <Form.Item
          label={t('components.transactionForm.amount.label')}
          name="amount"
          rules={[{ required: true, message: t('components.transactionForm.amount.errorMessage') }]}
          className="mb-4"
        >
          <CostInput
            className="w-full"
            controls={false}
            centsBased={false}
            placeholder={t('components.transactionForm.amount.placeholder')}
            currency={currency}
          />
        </Form.Item>

        <Form.Item
          label={t('components.transactionForm.date.label')}
          name="date"
          rules={[{ required: true, message: t('components.transactionForm.date.errorMessage') }]}
          className="mb-6"
        >
          <DatePicker
            className="w-full"
            format="ddd, DD MMM YYYY"
            placeholder={t('components.transactionForm.date.placeholder')}
          />
        </Form.Item>

        <SubmitButton ref={submitButtonRef} type="primary" block>
          {t('components.transactionForm.submit.label')}
        </SubmitButton>
      </WrapperForm>
    </div>
  );
};

export default TransactionForm;
