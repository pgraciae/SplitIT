import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableX from './Components/Table.js';
import NavBarCustom from './Components/NavBar';
import { ThumbUpSharp } from '@material-ui/icons';
import inputFile from './Components/uploadFile';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {currentTime: 0, View: 'Home', selectedFile:null}
    this.go = this.move.bind(this)
    this.loadedImage = this.loadImage.bind(this)
  }

  componentDidMount(){
    fetch('/time').then(res => res.json()).then(data => {

      this.setState({currentTime: data.time})
      console.log(this.state.currentTime);
    });
  }

  move(event, name) {
    event.preventDefault()
    this.setState({View: name})
  }

  loadImage(event) {
      
      //event.preventDefault()
      console.log(event.target.files)
      // Update the state
      this.setState({ selectedFile: event.target.files[0] }, () => console.log(this.state.selectedFile))

    }
  

  button_test(){
    console.log('Testing .... ')
  }
  render(){

    if (this.state.View === 'Home'){
  
    return(
    <div className="App">
        <header className="App-header">
      <NavBarCustom view={this.go}></NavBarCustom>
        <Stack direction="row" spacing={2}>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={(event) => this.loadImage(event)}
      />
    <label htmlFor="raised-button-file">
      <Button variant="raised" component="span" style = {{position: "absolute", top: '10vw', left: '45vw', width: '10vw', height: '5vw'}} >
        Upload
      </Button>
    </label>

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
  else if (this.state.View === 'Profile'){
    return(
      <div className="App">
      <header className="App-header">
      <div>
        <NavBarCustom view={this.go}></NavBarCustom>
      </div>
      </header>
      </div>
    )
  }
  else if (this.state.View === 'Tickets'){
    return(
      <div className="App">
      <header className="App-header">
      <div>
        <NavBarCustom view={this.go}></NavBarCustom>
      </div>
      </header>
      </div>
    )
  }
}

}



export default App;