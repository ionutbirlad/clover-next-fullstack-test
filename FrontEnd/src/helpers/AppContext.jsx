import { useState, createContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartArea, faWallet } from '@fortawesome/free-solid-svg-icons';

import useLocalStorage from '../hooks/core/useLocalStorage';

import config from '../config';
import useOnResize from '../hooks/core/useOnResize';

const AppContext = createContext({});
export default AppContext;

const MacroMenu = {
  Home: 1
};

export const AppProvider = props => {
  const { t } = useTranslation();

  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  const [defaultCurrency] = useState(config.defaultCurrency);
  const [itemXpage] = useState(config.itemXpage);

  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [macroMenuSelection, setMacroMenuSelection] = useState(MacroMenu.Home);

  const menuItems = {
    [MacroMenu.Home]: [
      {
        label: <Link to="/">{t('common.home')}</Link>,
        key: 'home',
        icon: <FontAwesomeIcon icon={faHome} />,
        authorizedRoles: ['admin', 'designer', 'manufacturer', 'owner']
      },
      {
        label: <Link to="/wallet">{t('navigation.pages.wallet')}</Link>,
        key: 'walletPage',
        icon: <FontAwesomeIcon icon={faWallet} />,
        authorizedRoles: ['admin', 'designer', 'manufacturer', 'owner']
      },
      {
        label: <Link to="/statistics">{t('navigation.pages.statistics')}</Link>,
        key: 'statisticsPage',
        icon: <FontAwesomeIcon icon={faChartArea} />,
        authorizedRoles: ['admin', 'designer', 'manufacturer', 'owner']
      }
    ]
  };

  /* Mobile Management */
  useOnResize(() => setIsMobile(window.innerWidth < 768));

  const exportedValue = useMemo(
    () => ({
      isMobile,
      darkMode,
      setDarkMode,
      defaultCurrency,
      itemXpage,
      menuItems,
      MacroMenu,
      setSelectedMenuItem,
      selectedMenuItem,
      macroMenuSelection,
      setMacroMenuSelection
    }),
    [isMobile, darkMode, defaultCurrency, itemXpage, menuItems, MacroMenu, selectedMenuItem, macroMenuSelection]
  );

  return <AppContext.Provider value={exportedValue}>{props.children}</AppContext.Provider>;
};
