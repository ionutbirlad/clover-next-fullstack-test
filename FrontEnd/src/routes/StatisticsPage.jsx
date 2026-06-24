import { useState } from 'react';
import { Result } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';

import ContentPanel from '../components/core/layout/ContentPanel';

const StatisticsPage = () => {
  const [loading] = useState(false);

  return (
    <ContentPanel title="Statistics Page" loading={loading}>
      <Result
        icon={<FontAwesomeIcon icon={faChartArea} size="4x" className="text-primary" />}
        title="Expense and Income Diary"
        subTitle="STATISTICS PAGE HERE"
      />
    </ContentPanel>
  );
};

export default StatisticsPage;
