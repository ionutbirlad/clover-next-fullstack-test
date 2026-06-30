import { useState } from 'react';

import ContentPanel from '../components/core/layout/ContentPanel';

const WalletPage = () => {
  const [loading] = useState(false);

  return (
    <ContentPanel title="Dashboard" loading={loading}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 bg-red-50 md:col-span-6">TOTAL BALANCE HERE</div>

        <div className="col-span-12 bg-amber-50 md:col-span-6">WALLET ACTIONS HERE</div>

        <div className="col-span-12 bg-green-50 md:col-span-12">INCOMES AND EXPENSES TAB HERE</div>
      </div>
    </ContentPanel>
  );
};

export default WalletPage;
