import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {createWrapper} from 'next-redux-wrapper';
import FormStateReducer from '../reducers/FormStateReducer';
import TransactionsReducer from '../reducers/TransactionsReducer';
import UserReducer from '../reducers/userReducer';
import AccountsReducer from '../reducers/AccountsReducer';





// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;





const configureStore = () => {
    const store = createStore(
        combineReducers({
            transactions : TransactionsReducer,
            formState : FormStateReducer,
            userState : UserReducer,
            accounts : AccountsReducer
        }),
        applyMiddleware(thunk),
        
    );
    
    return store;
}



export default configureStore;
export const wrapper = createWrapper(configureStore);

