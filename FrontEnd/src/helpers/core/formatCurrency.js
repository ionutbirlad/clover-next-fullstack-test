const formatCurrency = ({ value, currency, locale }) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);

export default formatCurrency;
