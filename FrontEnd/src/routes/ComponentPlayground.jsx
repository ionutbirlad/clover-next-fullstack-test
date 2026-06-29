import { Alert, Col, Row, Typography } from 'antd';

import ContentPanel from '../components/core/layout/ContentPanel';
import FinanceSummaryCard from '../components/domain/FinanceSummaryCard';
import TransactionHistory from '../components/domain/TransactionHistory';

const { Paragraph } = Typography;

const ComponentPlayground = () => (
  <ContentPanel title="Component Playground">
    {/* TODO: temporary assessment playground. Remove this route before final polish if no longer useful. */}
    <Alert
      showIcon
      type="warning"
      message="Temporary playground"
      description="Sandbox page for validating new finance components during Milestone 3."
      className="mb-6"
    />

    <Paragraph type="secondary">
      This page is intentionally isolated from product routes and can be removed once the dashboard components are
      integrated.
    </Paragraph>

    <Row gutter={[24, 24]}>
      <Col xs={24} md={12} xl={8}>
        <FinanceSummaryCard />
      </Col>
      <Col xs={24} md={12} xl={8}>
        <TransactionHistory />
      </Col>
    </Row>
  </ContentPanel>
);

export default ComponentPlayground;
