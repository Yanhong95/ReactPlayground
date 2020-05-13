import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js constructor]');
    this.state = {
      persons: [
        { id: 'qqq', name: 'Max', age: 24 },
        { id: 'www', name: 'Manu', age: 29 },
        { id: 'eee', name: 'Stephanie', age: 19 }
      ],
      otherState: 'nihao',
      showPersons: false,
      showCockpit: true,
      changeCounter: 0,
      authenticated: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }
  // componentWillMount(){
  //   console.log('[App.js] componentWillMount')
  // }
  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }
  // state = {
  //   persons:[
  //     {id:'qqq',name:'Max',age:24},
  //     {id:'www',name:'Manu',age:29}, 
  //     {id:'eee',name:'Stephanie',age:19}
  //   ],
  //   otherState:'nihao',
  //   showPersons: false
  // }
  // modern express

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })
    const person = {
      ...this.state.persons[personIndex]
    }
    // const person = Object.assign({},this.state.persons[personIndex])

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  };

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons })
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  loginHandler = () => {
    this.setState({ authenticated: true });
  }

  
  render() {
    console.log('[App.js] render');
    let persons = null;
    if (this.state.showPersons) {
      persons =
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated} />
      //key element must in the outer compoment in a map function}
    }

    return (
      //<WithClass classes={classes.App}>
      <Aux>
        <button
          onClick={() => {
            this.setState({ showCockpit: false });
          }}> Remove Cockpit</button>
        <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
          {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonHandler} />) : null}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App);


// import React, { useState } from 'react';
// import './App.css';
// import Person from './Person/Person';
// //React Hook
// const app = () => {

//     const [personState, setPersonState] = useState({
//       persons:[
//         {name:'Max',age:24},
//         {name:'Manu',age:29},
//         {name:'Stephanie',age:19}
//       ],
//       otherState:'nihao'
//     });

// const switchNameHandler = () =>{
//   //console.log('Was clicked!')
//   setPersonState({
//     persons:[
//       {name:'Yanhong',age:25},
//       {name:'chunchun',age:25},
//       {name:'Stephanie',age:19}
//     ]
//   })
//   }

//     return (
//       <div className="App">
//         <h1>Hi, I'm a React App</h1>
//         <button onClick={switchNameHandler}>Switch Name</button>
//         <Person name={personState.persons[0].name} age={personState.persons[0].age}/>  
//         <Person name={personState.persons[1].name} age={personState.persons[1].age}>My hobbies :Racing </Person>  
//         <Person name={personState.persons[2].name} age={personState.persons[2].age}/>   
//       </div>
//     );
//   }


// export default app;


