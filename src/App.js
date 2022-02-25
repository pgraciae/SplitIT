import React, { useState, useEffect } from 'react';
import Webcam from "react-webcam";
import 'react-html5-camera-photo/build/css/index.css';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableX from './Components/Table.js';
import NavBarCustom from './Components/NavBar';
import { ThumbUpSharp } from '@material-ui/icons';
import inputFile from './Components/uploadFile';
import ProfileView from './Profile';

class App extends React.Component {


  constructor(props){
    super(props);
    this.state = {currentTime: 0, View: 'Home', selectedFile:null, webcamEnabled: false}
    this.go = this.move.bind(this)
    this.loadedImage = this.loadImage.bind(this)
    this.enableWebcam = this.enableWebcam.bind(this)
  }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log("here")
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);
  
    const Upload = async() => {
      await fetch('/upload', {
        method: 'POST',
        body: formData
      }).then(resp => {
        resp.json().then(data => {console.log(data)})
      })
    }
    Upload();
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
    enableWebcam (){
      console.log(this.state.webcamEnabled)
      this.setState({webcamEnabled: !this.state.webcamEnabled});
      console.log(this.state.webcamEnabled)
    }
  
  button_test(){
    console.log('Testing .... ')
  }
  render(){

    if (this.state.View === 'Home'){
      const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };
    return(
    <div className="App">
        <header className="App-header">
        <NavBarCustom view={this.go}></NavBarCustom>
        <Stack direction="row" spacing={2}>
      <form onSubmit = {this.handleSubmit}  >
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={(event) => this.loadImage(event)}
      />
    <label htmlFor="raised-button-file">
      <Button variant="contained" component="span" style = {{position: "absolute", top: '10vw', left: '35vw', width: '10vw', height: '5vw'}} >
        Upload
      </Button>
    </label>

      <Button variant="contained" onClick ={this.button_test} style = {{position: "absolute", top: '10vw', left: '45vw', width: '10vw', height: '5vw'}}>
        NO SABIA SI PODIA TREURE
      </Button>
      {this.state.webcamEnabled &&
      <Webcam
          audio={false}
          height={200}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />}
      <Button variant ="contained" onClick={this.enableWebcam} style = {{position: "absolute", top: '10vw', left: '55vw', width: '10vw', height: '5vw'}}>
        Camera
      </Button>
      <Button variant ="contained" type="submit" style = {{position: "absolute", top: '20vw', left: '45vw', width: '10vw', height: '5vw'}}>
        Submit File
      </Button>
      </form>
    </Stack>
    <div style = {{position: 'absolute', width: '70vw', left: '22vw', top:'60vw'}}>
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
      <ProfileView></ProfileView>
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