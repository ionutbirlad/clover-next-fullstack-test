import { useState } from 'react';
import { Card, Empty, Segmented, Select, Typography, theme } from 'antd';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTranslation } from 'react-i18next';

import { classNames } from '../../../helpers/core/utils';
import formatCurrency from '../../../helpers/core/formatCurrency';

const { Text, Title } = Typography;
const { useToken } = theme;

const ChartTooltip = ({ active, payload, label, currency, locale }) => {
  if (!active || !payload?.length) return null;

  const [{ value }] = payload;

  return (
    <div className="min-w-24 rounded-[10px] border border-[var(--ant-color-border-secondary)] bg-[var(--ant-color-bg-container)] px-2.5 py-2 shadow-[0_10px_24px_rgb(47_126_121_/_14%)]">
      <Text className="!text-primary block !text-xs !font-semibold">{label}</Text>
      <Text className="block !text-sm !font-bold">
        {formatCurrency({
          value,
          currency,
          locale
        })}
      </Text>
    </div>
  );
};

const TransactionTrendChart = ({
  data = [],
  defaultRange = 'day',
  range,
  onRangeChange,
  defaultMetric = 'expense',
  metric,
  onMetricChange,
  currency = 'USD',
  locale = 'en-US',
  className = ''
}) => {
  const { token } = useToken();
  const [internalRange, setInternalRange] = useState(defaultRange);
  const [internalMetric, setInternalMetric] = useState(defaultMetric);

  const selectedRange = range || internalRange;
  const selectedMetric = metric || internalMetric;

  const { t } = useTranslation();

  const metricOptions = [
    { label: t('components.transactionsTrendChart.metricOptions.expense'), value: 'expense' },
    { label: t('components.transactionsTrendChart.metricOptions.income'), value: 'income' }
  ];

  const rangeOptions = [
    { label: t('components.transactionsTrendChart.rangeOptions.day'), value: 'day' },
    { label: t('components.transactionsTrendChart.rangeOptions.week'), value: 'week' },
    { label: t('components.transactionsTrendChart.rangeOptions.month'), value: 'month' },
    { label: t('components.transactionsTrendChart.rangeOptions.year'), value: 'year' }
  ];

  const handleRangeChange = value => {
    if (!range) setInternalRange(value);
    onRangeChange?.(value);
  };

  const handleMetricChange = value => {
    if (!metric) setInternalMetric(value);
    onMetricChange?.(value);
  };

  return (
    <Card
      bordered={false}
      className={classNames('h-fit w-full rounded-[18px] p-5 shadow-[0_12px_32px_rgb(47_126_121_/_10%)]', className)}
      styles={{ body: { padding: 0 } }}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Title level={5} className="!m-0 !text-base !font-bold">
              {t('components.transactionsTrendChart.title')}
            </Title>
            <Text className="!text-secondary !text-xs">{t('components.transactionsTrendChart.subtitle')}</Text>
          </div>

          <Select
            size="middle"
            value={selectedMetric}
            options={metricOptions}
            onChange={handleMetricChange}
            className="w-full sm:w-[118px]"
          />
        </div>

        <Segmented
          block
          size="large"
          value={selectedRange}
          options={rangeOptions}
          onChange={handleRangeChange}
          className="bg-transparent p-1"
        />

        {data.length > 0 ? (
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 20, right: 8, bottom: 4, left: 8 }}>
                <defs>
                  <linearGradient id="transaction-trend-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={token.colorPrimary} stopOpacity={0.24} />
                    <stop offset="95%" stopColor={token.colorPrimary} stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: token.colorTextSecondary, fontSize: 11 }}
                  dy={8}
                />
                <YAxis hide domain={['dataMin - 120', 'dataMax + 120']} />
                <Tooltip
                  cursor={{ stroke: token.colorPrimary, strokeDasharray: '4 4', strokeWidth: 1 }}
                  content={<ChartTooltip currency={currency} locale={locale} />}
                />
                <Area
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={token.colorPrimary}
                  strokeWidth={2}
                  fill="url(#transaction-trend-gradient)"
                  activeDot={{
                    r: 6,
                    fill: token.colorPrimary,
                    stroke: token.colorBgContainer,
                    strokeWidth: 4
                  }}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No trend data yet" className="mb-0 mt-4" />
        )}
      </div>
    </Card>
  );
};

export default TransactionTrendChart;
