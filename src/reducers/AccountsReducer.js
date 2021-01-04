const AccountsReducerDefaultState = {
    accounts : []
}
const AccountsReducer = (state = AccountsReducerDefaultState.accounts) => {
    switch(action.type) {
        case 'ADD_ACCOUNT':
            return[
                ...state,
                actions.account
            ]
        case 'EDIT_TRANSACTION':
            return [
                ...state,
                action.account
            ];    
        case 'REMOVE_ACCOUNT':
            return state.filter((account) => account.id !== action.id)
        default:
            return state;
    }
}