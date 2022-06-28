import { createStore } from 'redux';
import colorReducer from '../SimonReducer/reducer';

export default () => {
    const store = createStore(
        colorReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
    
    return store;
};