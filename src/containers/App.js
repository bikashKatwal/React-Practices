import React, { PureComponent } from 'react';
import classes from './App.css';
import  Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Hoc from '../hoc/Hoc';
import withClass from '../hoc/withClass';

//Press Ctrl twice and without releasing up and down to write multiple

class App extends PureComponent {
    constructor(props){
        super(props);
        console.log('[App.js] Inside Constructor', props);
        this.state={
            persons:[
                {id:'1', name: 'Bikash', age: 29},
                {id:'2', name: 'Susmita', age: 23},
                {id:'3', name: 'Deepa', age: 23}
            ],
            showPersons: false,
            toggleClickCounter: 0
        };
    }

    /*state={
        persons:[
            {id:'1', name: 'Bikash', age: 29},
            {id:'2', name: 'Susmita', age: 23},
            {id:'3', name: 'Deepa', age: 23}
        ],
        showPersons: false
    };*/

    componentWillMount(){
        console.log('[App.js] Inside componentWillMount()');
    }

    componentDidMount(){
        console.log('[App.js] Inside componentDidMount()');
    }

    componentWillReceiveProps(nextProps){
        console.log('[UPDATE App.js] inside componentWillReceiveProps', nextProps);
    }

    /*shouldComponentUpdate(nextProps, nextState){
        console.log('[UPDATE App.js] inside shouldComponentUpdate', nextProps, nextState);
        return nextState.persons !== this.state.persons ||
            nextState.showPersons !== this.state.showPersons;
    }*/

    componentWillUpdate(nextProps, nextState){
        console.log('[UPDATE App.js] inside componentWillUpdate', nextProps, nextState);
    }

    componentDidUpdate(){
        console.log('[Persons.js] Inside componentDidUpdate');
    }


    nameChangedHandler =(event, id) =>{

        const personIndex= this.state.persons.findIndex(p =>{
            return p.id === id;
        });

        const person={
            ...this.state.persons[personIndex]
        };

        person.name=event.target.value;

        const persons=[...this.state.persons];
        persons[personIndex]=person;

        this.setState({persons});
    };

    togglePersonHandler =()=>{
        this.setState(( prevState, props)=>{
            return{
                showPersons:!prevState.showPersons,
                toggleClickCounter: prevState.toggleClickCounter + 1
            }
        });
    };

    deletePersonHandler=(personIndex)=>{
      //const persons=this.state.persons.slice();

      const persons=[...this.state.persons];//es6 spread operator
      persons.splice(personIndex, 1);// This removes the clicked object from the array
      this.setState({persons: persons})// update the remaining objects
    };

  render() {
      let persons=null;
      console.log('[App.js] Inside render()');
      if(this.state.showPersons) {
          persons=<Persons
              persons={this.state.persons}
              clicked={this.deletePersonHandler}
              changed = {this.nameChangedHandler}/>;
      }

    return (
        <Hoc>
            <button onClick={()=>{this.setState({showPersons: true})}}>Show Persons</button>
            <Cockpit
                appTitle={this.props.title}
                showPersons={this.state.showPersons}
                persons={this.state.persons}
                clicked={this.togglePersonHandler}  />
            {persons}
        </Hoc>
    );
  }
}
export default withClass(App, classes.App);
