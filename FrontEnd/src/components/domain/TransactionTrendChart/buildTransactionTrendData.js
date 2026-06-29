// TODO: move inside the transactions data layer when the frontend API layer is introduced.
const getWeekStart = date => {
  const weekStart = new Date(date);
  const day = weekStart.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  weekStart.setDate(weekStart.getDate() + diff);
  weekStart.setHours(0, 0, 0, 0);

  return weekStart;
};

const getPeriodConfig = ({ date, range, locale }) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return null;

  if (range === 'week') {
    const weekStart = getWeekStart(parsedDate);

    return {
      key: weekStart.toISOString().slice(0, 10),
      label: new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(weekStart),
      sortValue: weekStart.getTime()
    };
  }

  if (range === 'month') {
    const year = parsedDate.getFullYear();
    const month = parsedDate.getMonth();

    return {
      key: `${year}-${String(month + 1).padStart(2, '0')}`,
      label: new Intl.DateTimeFormat(locale, { month: 'short' }).format(parsedDate),
      sortValue: new Date(year, month, 1).getTime()
    };
  }

  if (range === 'year') {
    const year = parsedDate.getFullYear();

    return {
      key: String(year),
      label: String(year),
      sortValue: new Date(year, 0, 1).getTime()
    };
  }

  parsedDate.setHours(0, 0, 0, 0);

  return {
    key: parsedDate.toISOString().slice(0, 10),
    label: new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(parsedDate),
    sortValue: parsedDate.getTime()
  };
};

const buildTransactionTrendData = ({ transactions = [], range = 'day', locale = 'en-US' }) => {
  const groups = transactions.reduce((acc, transaction) => {
    const period = getPeriodConfig({ date: transaction.date, range, locale });

    if (!period || !['income', 'expense'].includes(transaction.type)) return acc;

    const current = acc.get(period.key) || {
      label: period.label,
      income: 0,
      expense: 0,
      sortValue: period.sortValue
    };

    current[transaction.type] += Math.abs(Number(transaction.amount) || 0);
    acc.set(period.key, current);

    return acc;
  }, new Map());

  return Array.from(groups.values())
    .sort((a, b) => a.sortValue - b.sortValue)
    .map(({ sortValue, ...item }) => item);
};

export default buildTransactionTrendData;
