import * as actionTypes from '../actions';

const initialState = {
    results: []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                // 注意这里value由于分开了reducer的缘故 我们不能获得globle redux state, 只能从component了传过来
                results: state.results.concat({id: new Date(), value: action.result})
            }
        case actionTypes.DELETE_RESULT:
            // const id = 2;
            // const newArray = [...state.results]; 这个是浅拷贝也不行
            // newArray.splice(id, 1) splice 会改变原来的array
            // filer会把所有合格的拷贝,组成新的.
            const updatedArray = state.results.filter(result => result.id !== action.resultElId);
            return {
                ...state,
                results: updatedArray
            }
    }
    return state;
};

export default reducer;