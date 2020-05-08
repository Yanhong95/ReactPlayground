import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// 合并两个reducer并给他们分配key
const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});


// Rrdux thunk api 的作用就是能让你写异步方法与store交互.可以call siteEffect
// Middleware
const logger = store  => {
    return next => {
        return action => {
            // 这些可以在 action 到 reducer 中间执行所以叫 Middleware
            // 主要是来执行 asynchronous 代码来异步获取数据.
            console.log('[Middleware]',action);
            const result = next(action);
            console.log('[Middleware] next state ', store.getState());
            return result;
        }
    }
}

// 这个是为了能在浏览器上使用Redux DevTools 插件, 这个可以实时监听store的state.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
