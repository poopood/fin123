import {HYDRATE} from 'next-redux-wrapper';

const transactionsReducerDefaultState = {
    transactions: []
};

const TransactionsReducer = ( state = transactionsReducerDefaultState.transactions, action) => {
    switch (action.type) {
        case 'HYDRATE':
            return action.transactions
        case 'ADD_TRANSACTION':
            return [
                ...state,
                action.transaction
            ];
        case 'EDIT_TRANSACTION':
            return [
                ...state,
                action.transaction
            ];
        case 'REMOVE_TRANSACTION':
            return state.filter((transaction) => transaction.id !== action.id)
        default:
            return state;
    }
}; 

export default TransactionsReducer;