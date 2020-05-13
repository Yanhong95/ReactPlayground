import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
  return {
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: name
  };
};

export const removeIngredient = ( name ) => {
  return {
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: name
  };
};

// 正确的 async 方法:
export const setIngredients = ( ingredients ) => {
  return {
      type: actionTypes.SET_INGREDIENTS,
      ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
      type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

// export const initIngredients = () => {
//   return dispatch => {
//       axios.get( 'https://my-project-react-my-burger.firebaseio.com/ingredients.json' )
//           .then( response => {
//              dispatch(setIngredients(response.data));
//           } )
//           .catch( error => {
//               dispatch(fetchIngredientsFailed());
//           } );
//   };
// };

export const initIngredients = () => {
  return {
      type: actionTypes.INIT_INGREDIENTS
  };
};