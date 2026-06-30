import { faBagShopping, faBriefcase, faReceipt, faUtensils } from '@fortawesome/free-solid-svg-icons';

const transactionCategoryIcons = {
  salary: faBriefcase,
  freelance: faBriefcase,
  food: faUtensils,
  bills: faReceipt,
  shopping: faBagShopping
};

const getTransactionCategoryIcon = category => transactionCategoryIcons[category] || faReceipt;

export default getTransactionCategoryIcon;
