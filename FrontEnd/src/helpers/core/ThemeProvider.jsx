import { useContext } from 'react';
import { ConfigProvider, theme, App } from 'antd';

import AppContext from '../AppContext';
import { light, dark } from '../../theme/ant.config';
import tokens from '../../styles/core/tokens/tokens';

const { defaultAlgorithm, darkAlgorithm } = theme;

const cssColorVariables = {
  '--color-primary': 'colorPrimary',
  '--color-success': 'colorSuccess',
  '--color-warning': 'colorWarning',
  '--color-error': 'colorError',
  '--color-info': 'colorInfo',
  '--color-secondary': 'colorTextSecondary'
};

const applyCssColorVariables = themeTokens => {
  Object.entries(cssColorVariables).forEach(([cssVariable, tokenName]) => {
    document.body.style.setProperty(cssVariable, themeTokens[tokenName]);
  });
};

const ThemeProvider = ({ children }) => {
  const { darkMode } = useContext(AppContext);
  const selectedTheme = darkMode ? dark : light;
  const selectedTokens = darkMode ? tokens.dark : tokens.light;

  if (darkMode) document.body.classList.add('dark');
  else document.body.classList.remove('dark');

  applyCssColorVariables(selectedTokens);

  return (
    <ConfigProvider theme={{ algorithm: darkMode ? darkAlgorithm : defaultAlgorithm, ...selectedTheme }}>
      <App>{children}</App>
    </ConfigProvider>
  );
};

export default ThemeProvider;
