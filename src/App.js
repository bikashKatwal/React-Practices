import React, { Component } from 'react';
import './App.css';
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
      const inlineStyle={
        backgroundColor:'green',
          color:'white',
          font:'inherit',
          border: '1px solid blue',
          padding: '8px',
          cursor: 'pointer'
      };

      let persons=null;
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
          inlineStyle.backgroundColor='red';
      }

      const classes=[];
      if(this.state.persons.length<= 2){
          classes.push('red');// classes=['red']
      }
      if(this.state.persons.length<= 1){
          classes.push('bold');// classes=['red','bold']
      }

    return (
      <div className="App">
        <h2>Hi, I'm React App</h2>
          <p className={classes.join(' ')}>This is really working</p>
          <button
              style={inlineStyle}
              onClick={this.togglePersonHandler}>Toggle Person</button>
          {persons}
      </div>
    );
  }
}
export default App;
