import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer =  setTimeout(() => {
      // 这里设置了一个timmer, enteredFilter被卡在这里他是timmer开始的时候的userInput的值
      // inputRef在外面. inputRef.current.value 是当前用户输入的值.
      // timmer 5毫秒的, 检查现在用户输入的值是不是等于5毫秒之前的值, 如果想等, 说明没变
      // 说明用户暂停了, 所以这个时候向server发送featch请求.
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ''
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        fetch('https://my-project-react-hook.firebaseio.com/ingredients.json' + query)
          .then(response => response.json())
          .then(responseData => {
            const loadedIngredients = [];
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount
              });
            }
            // 我们在这里只是onLoadIngredients来改变父组件的内容, 
            // 如果我们在下面的dependency里不加上这个onLoadIngredients()
            // 在第一次在serch里面输入的时候会render这个useEffect();
            // 但是后来如果父组件重新render了, 再次传进来prop的onLoadIngredients()方法
            // 但是由于我们没有把这个function作为这个useEffect的dependecy,
            // 由于useState的特性,这个enteredFilter是不变的.
            // 那么这个useEffect 是不会rerender的, 我么要把这个function作为dependency
            onLoadIngredients(loadedIngredients);
          });
        // 只有在enteredFilter改变, 或者props传过来的onLoadIngredients改变, 这个useEffect才会re-render
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onLoadIngredients, inputRef])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            calue={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
