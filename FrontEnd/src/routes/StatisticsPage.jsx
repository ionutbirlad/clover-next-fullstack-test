import { useState } from 'react';

import ContentPanel from '../components/core/layout/ContentPanel';

const StatisticsPage = () => {
  const [loading] = useState(false);

  return (
    <ContentPanel title="Dashboard" loading={loading}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 bg-red-50 md:col-span-7">STATISTICS CHART HERE</div>

        <div className="col-span-12 bg-amber-50 md:col-span-5">TOP SPENDING TRANSACTIONS HERE</div>
      </div>
    </ContentPanel>
  );
};

export default StatisticsPage;
