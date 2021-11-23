import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {currentTime: 0}
  }

  componentDidMount(){
    fetch('/time').then(res => res.json()).then(data => {

      this.setState({currentTime: data.time})
      console.log(this.state.currentTime);
    });
  }

  render(){
    
    return(
    <div className="App">
        <header className="App-header">

        <button>
          Upload Image
        </button>

        <p>The current time is {this.state.currentTime}.</p>
      </header>
    </div>
    )
  }

}



export default App;