import { Button, Card, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import { classNames } from '../../../helpers/core/utils';

const { Text, Title } = Typography;

const QuickActionsCard = ({ title, actions = [], className = '' }) => {
  const navigate = useNavigate();

  const handleActionClick = action => {
    if (action.onClick) return action.onClick(action);
    if (action.to) return navigate(action.to);
    return undefined;
  };

  return (
    <Card
      bordered={false}
      className={classNames('h-full rounded-[18px] shadow-[0_12px_32px_rgb(47_126_121_/_10%)]', className)}
      styles={{ body: { height: '100%', padding: 20 } }}
    >
      <div className="flex h-full min-h-[108px] flex-col justify-center gap-4">
        <Title level={5} className="!m-0 !text-center !text-sm !font-bold">
          {title}
        </Title>

        <div className="grid grid-cols-3 gap-2">
          {actions.map(action => (
            <div key={action.key || action.label} className="min-w-0 text-center">
              <Button
                shape="circle"
                size="large"
                aria-label={action.label}
                disabled={action.disabled}
                onClick={() => handleActionClick(action)}
                className="border-primary !text-primary hover:!border-primary hover:!bg-primary mx-auto flex h-11 w-11 items-center justify-center hover:!text-white"
                icon={<FontAwesomeIcon icon={action.icon} />}
              />
              <Text className="!text-secondary mt-2 block truncate !text-xs">{action.label}</Text>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default QuickActionsCard;
