const colorsLight = {
  // Brand / semantic colors
  colorPrimary: '#2F7E79',
  colorSuccess: '#25A969',
  colorWarning: '#FFAB7B',
  colorError: '#FF383C',
  colorInfo: '#438883',

  // Base surfaces/text
  colorBgBase: '#ffffff',
  colorTextBase: '#222222',

  // Secondary surfaces/text
  colorBgElevated: '#F4F6F6',
  colorTextSecondary: '#666666',

  // Other colors
  colorBgLayout: '#ffffff',
  colorBorder: '#DDDDDD',
  colorTextLightSolid: '#ffffff'
};

const colorsDark = {
  // Brand / semantic colors
  colorPrimary: '#5FB8B2',
  colorSuccess: '#4FD28A',
  colorWarning: '#FFB985',
  colorError: '#FF6B6E',
  colorInfo: '#9DBBFF',

  // Base surfaces/text
  colorBgBase: '#111716',
  colorTextBase: '#F3FAF8',

  // Secondary surfaces/text
  colorBgElevated: '#1E2A28',
  colorTextSecondary: '#AABDBA',

  // Other colors
  colorBgLayout: '#0F1514',
  colorBgContainer: '#17201F',
  colorBorder: '#2A3A38',
  colorBorderSecondary: '#22302E',
  colorTextLightSolid: '#ffffff'
};

const tokens = {
  light: {
    ...colorsLight,

    // Typography
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,

    // Shape
    borderRadius: 8,

    // Controls
    // controlHeight: 36,

    // Borders / motion
    lineWidth: 1,
    motion: true
  },
  componentsLight: {
    Button: {
      borderRadius: 23,
      borderRadiusSM: 23,
      borderRadiusLG: 23,
      primaryShadow: '0 4px 10px rgb(47 126 121 / 14%)'
    },
    Input: {
      activeShadow: 'none',
      lineWidth: 2
    },
    InputNumber: {
      activeShadow: 'none',
      lineWidth: 2
    },
    Select: {
      lineWidth: 2,
      controlOutlineWidth: 0,
      controlOutline: 'transparent'
    },
    Menu: {
      itemSelectedBg: colorsLight.colorPrimary,
      itemSelectedColor: colorsLight.colorTextLightSolid,
      itemActiveBg: colorsLight.colorPrimary,
      itemHoverColor: colorsLight.colorPrimary,
      itemHoverBg: colorsLight.colorBgElevated
    }
  },
  dark: {
    ...colorsDark,

    // Typography
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,

    // Shape
    borderRadius: 8,

    // Controls
    controlHeight: 36,

    // Borders / motion
    lineWidth: 1,
    motion: true
  },
  componentsDark: {
    Button: {
      borderRadius: 23,
      borderRadiusSM: 23,
      borderRadiusLG: 23,
      primaryShadow: '0 4px 12px rgb(95 184 178 / 24%)'
    },
    Input: {
      activeShadow: 'none',
      lineWidth: 2
    },
    InputNumber: {
      activeShadow: 'none',
      lineWidth: 2
    },
    Select: {
      lineWidth: 2,
      controlOutlineWidth: 0,
      controlOutline: 'transparent'
    },
    Menu: {
      itemSelectedBg: colorsLight.colorPrimary,
      itemSelectedColor: colorsDark.colorTextLightSolid,
      itemActiveBg: colorsLight.colorPrimary,
      itemHoverColor: colorsDark.colorPrimary,
      itemHoverBg: colorsDark.colorBgElevated
    }
  }
};

export default tokens;
