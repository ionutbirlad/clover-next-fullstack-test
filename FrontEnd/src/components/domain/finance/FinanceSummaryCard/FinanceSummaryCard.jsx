import { Button, Card, Space, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faChevronUp, faEllipsis } from '@fortawesome/free-solid-svg-icons';

import styles from './FinanceSummaryCard.module.css';

const { Text, Title } = Typography;

const formatCurrency = ({ value, currency, locale }) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);

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
    <Card bordered={false} className={`${styles.card} ${className}`} styles={{ body: { height: '100%', padding: 0 } }}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Space size={4} className={styles['title-group']}>
            <Text className={styles.label}>{title}</Text>
            <FontAwesomeIcon icon={faChevronUp} className={styles['title-icon']} />
          </Space>

          <Button
            type="text"
            size="small"
            aria-label="More finance summary actions"
            className={styles['action-button']}
            icon={<FontAwesomeIcon icon={faEllipsis} />}
          />
        </div>

        <Title level={2} className={styles.balance}>
          {amountFormatter(balance)}
        </Title>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <Space size={6} className={styles['metric-label']}>
              <span className={styles['icon-badge']}>
                <FontAwesomeIcon icon={faArrowDown} />
              </span>
              <Text className={styles['metric-text']}>Income</Text>
            </Space>
            <Text className={styles['metric-value']}>{amountFormatter(income)}</Text>
          </div>

          <div className={styles.metric}>
            <Space size={6} className={styles['metric-label']}>
              <span className={styles['icon-badge']}>
                <FontAwesomeIcon icon={faArrowUp} />
              </span>
              <Text className={styles['metric-text']}>Expenses</Text>
            </Space>
            <Text className={styles['metric-value']}>{amountFormatter(expenses)}</Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FinanceSummaryCard;
