import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableX from './Components/Table.js';
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

  button_test(){
    console.log('Testing .... ')
  }
  render(){
    
    return(
    <div className="App">
        <header className="App-header">
        <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick ={this.button_test} style = {{position: "absolute", top: '10vw', left: '45vw', width: '10vw', height: '5vw'}}>Gallery</Button>
      <Button variant="contained" onClick ={this.button_test} style = {{position: "absolute", top: '10vw', left: '55vw', width: '10vw', height: '5vw'}} href="#contained-buttons">
        CAMERA
      </Button>
    </Stack>
    <div style = {{position: 'absolute', width: '70vw', left: '22vw', top:'20vw'}}>
      <TableX></TableX>
      </div>

      </header>
    </div>
    )
  }

}



export default App;