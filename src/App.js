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
import ProfileView from './Components/Profile';
import Login from "./Components/Login.js";
import Register from "./Components/Registration.js";
import Forgot from "./Components/Forgot.js";
import Friends from "./Components/Friends.js"
import Groups from "./Components/Groups.js"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import cookie from 'react-cookies';
import ChooseGroup from "./Components/ChooseGroup.js"

class App extends React.Component {

  
  constructor(props){
    super(props);
    
    this.state = {currentTime: 0, View: 'Login', selectedFile:null, webcamEnabled: false, email: '', choosed_group: null}
    this.go = this.move.bind(this)
    this.loadedImage = this.loadImage.bind(this)
    this.enableWebcam = this.enableWebcam.bind(this)
    this.login = this.login.bind(this)
    this.email = this.email.bind(this)
    this.email_value = this.email_value.bind(this)
    this.friends = this.friends.bind(this)
    this.groups = this.groups.bind(this)
    this.chooseGroup = this.chooseGroup.bind(this)
    this.choosedGroup_ = this.choosedGroup.bind(this)
    this.choosedGroup_value_ = this.choosedGroup_value.bind(this)
    this.move0_ = this.move0.bind(this)

  }
  

  handleSubmit = (e) => {
    e.preventDefault()
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
    this.setState({View:'Uploaded'}); //sota d'Upload()
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
  move0(name){
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

  login(){
    this.setState({View: 'Home'});
  }

  chooseGroup(){
    this.setState({View: 'chooseGroup'})
  }

  choosedGroup(value){
    this.setState({choosed_group: value})
  }

  choosedGroup_value(){
    return this.state.choosed_group
  }

  friends(){
    this.setState({View: 'Friends'})
  }

  groups(){
    this.setState({View: 'Groups'})
  }

  email(value){
    console.log(value);
    this.setState({email: value});
  }

  email_value(){
    return this.state.email
  }

  render(){
    if (this.state.View === 'Login'){
      return(
        <Router>
        <Routes>
          <Route path="/login" element={<Login Login={this.login} Email={this.email} />} />
          <Route path="/register" element={<Register Login={this.login} Email={this.email}/>} />
          <Route path="/forgot-password" element={<Forgot/>} />
          <Route path="/" element={<Login  Login={this.login} Email={this.email} />} />
        </Routes>
      </Router>
      );
      };

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
        Submit ticket image
      </Button>
      </form>
    </Stack>
      </header>

    </div>
    )
  }

  else if (this.state.View === 'Uploaded'){
    console.log(this.email_value());
    console.log('no enttra')
    return (
      <div className="App">
      <header className="App-header">
      <div>
        <NavBarCustom view={this.go}></NavBarCustom>
      </div>
      <TableX></TableX>
      <div>
      <Button variant ="contained" onClick={this.chooseGroup}>
        Continue
      </Button>

      </div>
      </header>
      </div>
    )
  }
  else if (this.state.View === 'chooseGroup'){
    console.log('entra')
    return(
      <div className="App">
      <header className="App-header">
      <div>
        <NavBarCustom view={this.go}></NavBarCustom>
      </div>
      <ChooseGroup Email={this.email_value()} group_value={this.choosedGroup_} view={this.move0_}></ChooseGroup>
      </header>

      </div>
    )
      }
      
  else if (this.state.View ==='repartir'){
    console.log(this.choosedGroup_value())
    return (
      <div className="App">
      <header className="App-header">
      <div>
        <NavBarCustom view={this.go}></NavBarCustom>
      </div>
      hoa
      </header>

      </div>
    )
  }
  
  else if (this.state.View === 'Profile'){
    console.log(this.email_value());

    return(
      <div className="App">
      <header className="App-header">
      <div>
        <NavBarCustom view={this.go}></NavBarCustom>
      </div>
      <ProfileView Email={this.email_value()} />
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
  else if (this.state.View === 'Friends'){
    return(
      <div className="App">
      <header className="App-header">
      <div>
        <NavBarCustom view={this.go}></NavBarCustom>
      </div>
      <Friends Email={this.email_value()}/>
      </header>

      </div>
    )
  }
  else if (this.state.View === 'Groups'){
    return(
      <div className="App">
      <header className="App-header">
      <div>
        <NavBarCustom view={this.go}></NavBarCustom>
      </div>
      <Groups Email={this.email_value()} />
      </header>

      </div>
    )
  }
}

}



export default App;