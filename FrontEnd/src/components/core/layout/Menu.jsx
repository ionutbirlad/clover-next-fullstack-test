import { useContext } from 'react';
import { Menu, theme } from 'antd';
import { useLocation } from 'react-router-dom';
import AppContext from '../../../helpers/AppContext';

const { useToken } = theme;

const CpMenu = () => {
  const { menuItems, macroMenuSelection } = useContext(AppContext);
  const { token } = useToken();
  const location = useLocation();

  const selectedKey = menuItems[macroMenuSelection].find(item => item.path === location.pathname)?.key;

  return (
    <Menu
      mode="inline"
      style={{ backgroundColor: token.colorBgContainer, borderWidth: 0 }}
      items={menuItems[macroMenuSelection].map(e => {
        const tmpObj = { ...e };
        delete tmpObj?.authorizedRoles;
        delete tmpObj?.path;
        return tmpObj;
      })}
      selectedKeys={selectedKey ? [selectedKey] : []}
    />
  );
};

export default CpMenu;
