import React, { Component } from 'react';
import SuperMarioReact from './react-super-mario';
import StartScreen from './react-super-mario/components/StartScreen';

class App extends Component {
  render() {
	  
	  let isGameStarted=false;
    	if (isGameStarted) {
		return (
	      <SuperMarioReact />
        );
	    } 
     else {
		    return <StartScreen/>
	    }
    
  }
}

export default App;
