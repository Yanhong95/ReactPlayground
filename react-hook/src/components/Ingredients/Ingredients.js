import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null }
    case 'RESPONSE':
      return { ...curHttpState, loading: false }
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return { ...curHttpState, error: null }
    default:
      throw new Error('Should not be reached!');
  }
}

const Ingredients = () => {
  // 这里的useReducer(ingredientReducer, [])
  // ingredientReducer未上面的方法, [] 为initial state, 上面方法中会加.
  // dispath是方法 用来返回 type 和 参数
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null
  });
  // const [userIngredients, setUserIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  // useEffect(() => {
  //   fetch('https://my-project-react-hook.firebaseio.com/ingredients.json').then(
  //     response => response.json()
  //   ).then(responseData => {
  //     const loadedIngredients = [];
  //     for (const key in responseData) {
  //       loadedIngredients.push({
  //         id: key,
  //         title: responseData[key].title,
  //         amount: responseData[key].amount
  //       });
  //     }
  //     setUserIngredients(loadedIngredients);
  //   });
  // }, []);

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients);
  }, [userIngredients]);

  const filterIngredientsHandler = useCallback(filteredIngredients => {
    // setUserIngredients(filterdIngredients);
    dispatch({ type: 'SET', ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = useCallback(ingredient => {
    //  setIsLoading(true);
    dispatchHttp({ type: 'SEND' })
    fetch('https://my-project-react-hook.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      // console.log(response.json());
      // setIsLoading(false);
      dispatchHttp({ type: 'RESPONSE' })
      return response.json();
    }).then(responseData => {
      // setUserIngredients(prevIngredients => [
      //   ...prevIngredients,
      //   { id: responseData.name, ...ingredient }
      // ]);
      dispatch({
        type: 'ADD',
        ingredient: { id: responseData.name, ...ingredient }
      });
    }).catch(error => {
      // setError('Something went wrong!');
      // setIsLoading(false);
      dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
    });
  } , []);

  const removeIngredientHandler = useCallback(id => {
    //  setIsLoading(true);
    dispatchHttp({ type: 'SEND' })
    fetch(`https://my-project-react-hook.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE',
    }).then(response => {
      // setIsLoading(false);
      dispatchHttp({ type: 'RESPONSE' })
      // setUserIngredients(prevIngredients => [
      //   ...prevIngredients.filter(ingredient => ingredient.id !== id)
      // ]);
      dispatch({ type: 'DELETE', id: id });
    }).catch(error => {
      // setError('Something went wrong!');
      // setIsLoading(false);
      dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
    });
  }, []);

  const clearError = useCallback(() => {
    // setError(null);
    dispatchHttp({type: 'CLEAR'});
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
      ingredients={userIngredients}
      onRemoveItem={removeIngredientHandler}
    />
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />
      <section>
        <Search
          onLoadIngredients={filterIngredientsHandler}
        />
      {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
