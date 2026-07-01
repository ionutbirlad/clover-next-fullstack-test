import { useMemo } from 'react';
import { Card, Empty, Progress, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import TransactionCategoryIcon from '../TransactionCategoryIcon';
import { buildTopTransactions } from '../../../api/transactions/transactionsAggregations';
import { classNames } from '../../../helpers/core/utils';
import formatCurrency from '../../../helpers/core/formatCurrency';
import formatDate from '../../../helpers/core/formatDate';

const { Text, Title } = Typography;

const TopTransactionsCard = ({
  transactions = [],
  type = 'expense',
  limit = 3,
  currency = 'USD',
  locale = 'en-US',
  className = ''
}) => {
  const { t } = useTranslation();
  const isIncome = type === 'income';
  const topTransactions = useMemo(
    () => buildTopTransactions({ transactions, type, limit }),
    [transactions, type, limit]
  );
  const accentColor = isIncome ? 'var(--color-success)' : 'var(--color-error)';
  const accentBg = isIncome ? 'rgb(37 169 105 / 10%)' : 'rgb(255 56 60 / 8%)';

  return (
    <Card
      bordered={false}
      className={classNames('h-full rounded-[18px] shadow-[0_12px_32px_rgb(47_126_121_/_10%)]', className)}
      styles={{ body: { height: '100%', padding: 20 } }}
    >
      <div className="flex h-full min-h-[248px] flex-col gap-5">
        <div>
          <Title level={5} className="!m-0 !text-base !font-bold">
            {t(`components.topTransactionsCard.title.${type}`)}
          </Title>
          <Text className="!text-secondary !text-xs">{t(`components.topTransactionsCard.subtitle.${type}`)}</Text>
        </div>

        {topTransactions.length > 0 ? (
          <div className="space-y-4">
            {topTransactions.map(transaction => {
              const amount = Math.abs(Number(transaction.amount) || 0);
              const amountPrefix = isIncome ? '+' : '-';

              return (
                <div key={transaction.id} className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: accentBg, color: accentColor }}
                  >
                    <TransactionCategoryIcon category={transaction.category} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <Text className="block truncate !text-sm !font-semibold">{transaction.title}</Text>
                        <Text className="!text-secondary block truncate !text-xs">
                          {formatDate({ date: transaction.date, dateLabel: transaction.dateLabel, locale })}
                        </Text>
                      </div>

                      <Text
                        className={classNames(
                          'shrink-0 !text-sm !font-bold',
                          isIncome ? '!text-success' : '!text-error'
                        )}
                      >
                        {amountPrefix} {formatCurrency({ value: amount, currency, locale })}
                      </Text>
                    </div>

                    <Progress
                      percent={transaction.percentage}
                      showInfo={false}
                      strokeColor={accentColor}
                      trailColor={accentBg}
                      className="m-0"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={t(`components.topTransactionsCard.empty.${type}`)}
            className="mb-0 mt-4"
          />
        )}
      </div>
    </Card>
  );
};

export default TopTransactionsCard;
