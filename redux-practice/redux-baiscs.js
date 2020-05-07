const redux = require('redux');
const createStore = redux.createStore;

// 首先最先要有原始的state
const initialState = {
    counter: 0
}

// Reducer 然后用reducer来制定规则, 在什么type的情况下做对应的action
// 总的reducer只有一个 但是可以将很多小的reducer汇总
const rootReducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        return {
            ...state,
            counter: state.counter + 1
        };
    }
    if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        };
    }
    return state;
};

// Store reducer的规则制定好了,然后用这个规则作为参数创建store
const store = createStore(rootReducer);
console.log(store.getState());
 
// Subscription 每当state更新的时候 这个subscribe就会被触发, 然后提供新的state
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});

// Dispatching Action dispatching就像是在触发reducer,给予你要的操作和参数, 来让reducer更新store里的state
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
// store.dispatch({type: 'ADD_COUNTER', payload : {value: 10}}); 可以用payload然后加上对应的Object参数
console.log(store.getState());
