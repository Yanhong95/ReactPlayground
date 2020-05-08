import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility.js';

const initialState = {
    results: []
};

const oldVersionReducer = ( state = initialState, action ) => {
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

const deleteResult = ( state, action ) => {
    const updatedArray = state.results.filter( 
        result => result.id !== action.resultElId );
    return updateObject( state, { results: updatedArray } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.STORE_RESULT : 
            return updateObject( state, { results: state.results.concat( { id: new Date(), value: action.result * 2 } ) } );
        case actionTypes.DELETE_RESULT : 
            return deleteResult(state, action);
    }
    return state;
};

export default reducer;