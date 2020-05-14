import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import IngredientsUsingCustomHook from './components/Ingredients/IngredientsUsingCustomHook';
import Auth from './components/Auth';
import { AuthContext } from './context/auth-context';

const App = props => {
  const authContext = useContext(AuthContext);

  let content = <Auth />;
  if (authContext.isAuth) {
    // content = <Ingredients />;
    content = <IngredientsUsingCustomHook />
  }

  return content;
};

export default App;
