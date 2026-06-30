import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getTransactionCategoryIcon from '../../../api/transactions/transactionsUiMapper';

const TransactionCategoryIcon = ({ category }) => <FontAwesomeIcon icon={getTransactionCategoryIcon(category)} />;

export default TransactionCategoryIcon;
