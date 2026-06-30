const formatDate = ({ date, dateLabel, locale, showTime = false }) => {
  if (dateLabel) return dateLabel;
  if (!date) return '';

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return '';

  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...(showTime ? { hour: '2-digit', minute: '2-digit' } : {})
  }).format(parsedDate);
};

export default formatDate;
