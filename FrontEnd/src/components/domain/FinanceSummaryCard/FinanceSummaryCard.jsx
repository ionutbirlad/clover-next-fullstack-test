import { Button, Card, Space, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faChevronUp, faEllipsis } from '@fortawesome/free-solid-svg-icons';

import { classNames } from '../../../helpers/core/utils';
import formatCurrency from '../../../helpers/core/formatCurrency';
import styles from './FinanceSummaryCard.module.css';

const { Text, Title } = Typography;

const FinanceSummaryCard = ({
  title = 'Total Balance',
  balance = 2548,
  income = 1840,
  expenses = 284,
  currency = 'USD',
  locale = 'en-US',
  className = ''
}) => {
  const amountFormatter = value => formatCurrency({ value, currency, locale });

  return (
    <Card
      bordered={false}
      className={classNames(styles.card, 'min-h-[148px] w-full overflow-hidden text-white', 'h-fit', className)}
      styles={{ body: { height: '100%', padding: 0 } }}
    >
      <div className="h-full px-5 py-[18px]">
        <div className="flex items-center justify-between gap-3">
          <Space size={4} className="text-inherit">
            <Text className="!text-xs !font-bold !leading-[1.2] !text-inherit">{title}</Text>
            <FontAwesomeIcon icon={faChevronUp} className="h-[9px] w-[9px] opacity-90" />
          </Space>

          <Button
            type="text"
            size="small"
            aria-label="More finance summary actions"
            className={classNames(styles['action-button'], 'h-6 w-7 p-0 !text-inherit')}
            icon={<FontAwesomeIcon icon={faEllipsis} />}
          />
        </div>

        <Title level={2} className="!mb-[22px] !mt-2 !text-[25px] !leading-[1.15] !text-inherit">
          {amountFormatter(balance)}
        </Title>

        <div className="grid grid-cols-2 gap-3.5">
          <div className="min-w-0">
            <Space size={6} className="mb-1 text-white/80">
              <span className="inline-flex h-[17px] w-[17px] items-center justify-center rounded-full bg-white/20 text-[9px] text-white">
                <FontAwesomeIcon icon={faArrowDown} />
              </span>
              <Text className="!text-xs !leading-[1.2] !text-inherit">Income</Text>
            </Space>
            <Text className="block !text-base !font-bold !leading-tight !text-white">{amountFormatter(income)}</Text>
          </div>

          <div className="min-w-0 text-right">
            <Space size={6} className="mb-1 text-white/80">
              <span className="inline-flex h-[17px] w-[17px] items-center justify-center rounded-full bg-white/20 text-[9px] text-white">
                <FontAwesomeIcon icon={faArrowUp} />
              </span>
              <Text className="!text-xs !leading-[1.2] !text-inherit">Expenses</Text>
            </Space>
            <Text className="block !text-base !font-bold !leading-tight !text-white">{amountFormatter(expenses)}</Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FinanceSummaryCard;
