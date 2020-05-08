import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const saveResult = ( res ) => {
    // const updatedResult = res * 2;
    return {
        type: actionTypes.STORE_RESULT,
        result: res
    };
}

// 这里在模拟一个asynchronous方法, 相当于再storeResult方法里,
// 我们先截取可以立即执行的saveResult()的dispatch action
// 然后我们用 setTimeout() 来模拟一个async的方法, 这个时候可以用ajax等去数据库获取数据,
// 等待这个过程成功后再与当前数据加工后随着dispatch action一起传到reducer去,

// export const storeResult = ( res ) => {
//     return (dispatch, getState) => {
//         setTimeout( () => {
//             // const oldCounter = getState().ctr.counter;
//             // console.log(oldCounter);
//             dispatch(saveResult(res));
//         }, 2000 );
//     }
// };

export const storeResult = ( res ) => {
    return (dispatch, getState) => {
        axios.get('/ingredients.json')
            .then(response => {
                const fetchedIngredient = [];
                for (let key in response.data) {
                    fetchedIngredient.push(response.data[key]);
                }
                // 这样就能call site effec 了
                console.log(fetchedIngredient[0]);
                // dispatch(saveResult(fetchedIngredient[0]));
                dispatch(saveResult(res));
            })
            .catch(err => {
                console.log(err);
            });
    }
};

export const deleteResult = ( resElId ) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: resElId
    };
};