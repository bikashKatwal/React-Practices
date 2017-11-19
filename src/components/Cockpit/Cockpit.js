import React from 'react';
import classes from './Cockpit.css';
import Hoc from '../../hoc/Hoc';

const cockpit =(props)=>{
    const assignedClasses=[];
    let btnClass=classes.Button;
    if(props.showPersons){
        btnClass=[classes.Button,classes.Red].join(' ');
    }

    if(props.persons.length<= 2){
        assignedClasses.push(classes.red);// assignedClasses=['red']
    }
    if(props.persons.length<= 1){
        assignedClasses.push(classes.bold);// assignedClasses=['red','bold']
    }

    return(
        <Hoc>
            <h2>{props.appTitle}</h2>
            <p className={assignedClasses.join(' ')}>This is really working</p>
            <button className={btnClass}
                    onClick={props.clicked}>Toggle Person</button>
        </Hoc>
    );


};
export default cockpit;