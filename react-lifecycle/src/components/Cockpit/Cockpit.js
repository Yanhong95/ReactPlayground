import React, { useEffect , useRef, useContext} from 'react';
import classes from './Cockpit.css'
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {


    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);
    console.log(authContext.authenticated);

    useEffect(()=>{
        console.log('[Cockpit.js] useEffect');
        // Http request...
        // setTimeout(()=>{
        //     alert('Saved date to cloud!');
        // },1000);
        toggleBtnRef.current.click();
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        }
    },[]);

    useEffect(() =>{
        console.log('[Cockpit.js] 2nd useEffect');
        return () =>{
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        };
    });

    const assignedlasses = [];
    let btnClass = ''; 
    if(props.showPersons){
        btnClass = classes.Red;
    }
   
    if(props.personslength <= 2){
      assignedlasses.push(classes.red);// classes = ['red']
    }
    if(props.personslength <= 1){
      assignedlasses.push(classes.bold);//classes = ['bold','red']
    }


    return (
        <div className = {classes.Cockpit}>
        <h1>{props.title}</h1>
        <p className={assignedlasses.join(' ')}>This is really working!</p>
        <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>Toggle Person</button>
        <button onClick={authContext.login}>Log in</button>
        {/* <AuthContext.Consumer>
            {context => <button onClick={context.login}>Log in</button> }
        </AuthContext.Consumer> */}
        </div>
    );
};

export default React.memo(cockpit);