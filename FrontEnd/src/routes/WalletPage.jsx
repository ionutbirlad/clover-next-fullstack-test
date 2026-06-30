import { useState } from 'react';
import { Result } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

import ContentPanel from '../components/core/layout/ContentPanel';

const WalletPage = () => {
  const [loading] = useState(false);

  return (
    <ContentPanel title="Wallet Page" loading={loading}>
      <Result
        icon={<FontAwesomeIcon icon={faWallet} size="4x" className="text-primary" />}
        title="Expense and Income Diary"
        subTitle="WALLET PAGE HERE"
      />
    </ContentPanel>
  );
};

export default WalletPage;
