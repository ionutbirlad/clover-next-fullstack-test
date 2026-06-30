import { useState } from 'react';

import ContentPanel from '../components/core/layout/ContentPanel';

const Home = () => {
  const [loading] = useState(false);

  return (
    <ContentPanel title="Dashboard" loading={loading}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-6 bg-red-50 md:col-span-4">PROFILE INFO HERE</div>

        <div className="col-span-6 bg-amber-50 md:col-span-4">TOTAL BALANCE CARD HERE</div>

        <div className="col-span-6 col-start-4 bg-green-50 md:col-span-4 md:col-start-auto">QUICK ACTIONS HERE</div>

        <div className="col-span-12 bg-cyan-50 md:col-span-7">TRANSACTIONS HISTORY PREVIEW HERE</div>

        <div className="col-span-12 bg-blue-50 md:col-span-5">MOST RECURRENT EXPENSE HERE</div>
      </div>
    </ContentPanel>
  );
};

export default Home;
