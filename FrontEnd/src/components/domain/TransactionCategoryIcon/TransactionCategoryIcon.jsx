import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getTransactionCategoryIcon from './transactionCategoryUi';

const TransactionCategoryIcon = ({ category }) => <FontAwesomeIcon icon={getTransactionCategoryIcon(category)} />;

export default TransactionCategoryIcon;
