import React, { Component } from 'react';
import classes from './App.css';
import  Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
    state={
      persons:[
          {id:'1', name: 'Bikash', age: 29},
          {id:'2', name: 'Susmita', age: 23},
          {id:'3', name: 'Deepa', age: 23}
      ],
        showPersons: false
    };

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
        this.setState({
            showPersons:!this.state.showPersons
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


      if(this.state.showPersons) {
          persons=<Persons
              persons={this.state.persons}
              clicked={this.deletePersonHandler}
              changed = {this.nameChangedHandler}/>;
      }

    return (
          <div className={classes.App}>
              <Cockpit
                  showPersons={this.state.showPersons}
                  persons={this.state.persons}
                  clicked={this.togglePersonHandler}  />
              {persons}
          </div>
    );
  }
}
export default App;
