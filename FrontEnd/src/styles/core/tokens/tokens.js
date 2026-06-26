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
const componentsLight = {
  components: {
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
  }
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
  ...componentsLight,
  dark: {
    // Brand / semantic colors
    colorPrimary: '#2563eb',
    colorSuccess: '#16a34a',
    colorWarning: '#f59e0b',
    colorError: '#dc2626',
    colorInfo: '#2563eb',

    // Base surfaces/text
    colorBgBase: '#ffffff',
    colorTextBase: '#111827',

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
  }
};

export default tokens;
