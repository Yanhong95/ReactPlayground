import React,{Component} from 'react';
import ProTypes from 'prop-types' ;
import classes from "./Person.css";
import withClass from '../../../hoc/withClass'
import Aux from '../../../hoc/Aux';
import AuthContext from '../../../context/auth-context';

class Person extends Component{

    constructor(props){
        super(props);
        this.inputElementRef = React.createRef();
    }
    
    static contextType = AuthContext;

    componentDidMount(){
        //this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated)
    }

    render() {
        console.log('[Person.js] rendering');
        return (
            //<div className={classes.Person} >
            //<React.Fragment>
            <Aux>
                {/* <AuthContext.Consumer>
                    {context =>
                        context.authenticated ? ( <p>Authenticated!</p> ) : ( <p>Please log in</p> )
                    }
                </AuthContext.Consumer> */}
                
                {this.context.authenticated ? ( <p>Authenticated!</p> ) : ( <p>Please log in</p> )}

                <p onClick={this.props.click}>I'm a {this.props.name} and {this.props.age} years old.</p>
                <p>{this.props.children}</p>
                <input
                    //ref={(inputEl)=>{this.inputElement = inputEl}}
                    ref={this.inputElementRef}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name}
                />
            </Aux>
            //<React.Fragment>
            //</div>              
        );
    }
}

Person.propTypes = {
    click: ProTypes.func,
    name: ProTypes.string,
    age: ProTypes.number,
    change: ProTypes.func   
};

export default withClass(Person, classes.Person);
