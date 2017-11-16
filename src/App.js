import React, { Component } from 'react';
import classes from './App.css';
import  Person from './Person/Person';

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
      let btnClass='';


      if(this.state.showPersons) {
          persons=(
              <div>
                  {this.state.persons.map((person, index)=>{
                      return <Person
                          key={person.id}
                          click={this.deletePersonHandler.bind(this, index)}
                          name={person.name}
                          age={person.age}
                          changed = {(event) => this.nameChangedHandler(event, person.id) }/>
                  })}
              </div>
          );
          btnClass=classes.Red;
      }

      const assignedClasses=[];
      if(this.state.persons.length<= 2){
          assignedClasses.push(classes.red);// assignedClasses=['red']
      }
      if(this.state.persons.length<= 1){
          assignedClasses.push(classes.bold);// assignedClasses=['red','bold']
      }

    return (
          <div className={classes.App}>
            <h2>Hi, I'm React App</h2>
              <p className={assignedClasses.join(' ')}>This is really working</p>
              <button className={btnClass}
                  onClick={this.togglePersonHandler}>Toggle Person</button>
              {persons}
          </div>
    );
  }
}
export default App;
