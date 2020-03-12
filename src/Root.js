import React from 'react';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { createStore } from 'redux';
import App from './App';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);

const Root = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default Root;