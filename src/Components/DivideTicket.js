import SelectSearch from 'react-select-search';
import React, { Component } from "react";
import Select from "react-select";

class DivideTicket extends React.Component {

constructor(props){
    super(props)
    this.state = {
      data : null,
      nickname: '',
      selectedOption: null
    }
    this.rows = null;
    this.llista = {};


  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    // Option selected: { value: "rojo", label: "rojo" }
    console.log("Option selected:", selectedOption);
  };

  async YourFriends() {
      await fetch('/friends?email='+ this.props.Email, {
        method: 'GET',
      }).then(resp => {
        resp.json().then((resp)=>{
          console.log(resp);
          this.rows = resp.Friends;
          console.log(this.rows);
          this.setState({data: 'loaded'});
        })
      })
      await fetch('/profile?email='+ this.props.Email, {
        method: 'GET',
      }).then(resp => {
        resp.json().then((resp)=>{
          this.setState({nickname: resp.Nickname})
        })
      })
    }
  
  componentDidMount(){
    this.YourFriends();
    this.rows = [];
    // Ticket elements en una estructura igual que rows
  }

  render(){
    console.log(this.state.friend, 'friend_status')
    if (this.rows === null) {
     return ( <a>Retrieving data...</a> )
     
    } 
    else {
      console.log('holaa', this.rows)}
      console.log('i', this.rows.map(el => ({value:el, label:el})))
      return(
        <div>

{/* 
    <React.Fragment>
        <Select
          isMulti
          options={this.rows.map(el => ({value:el, label:el}))}
          value={this.state.selectedOption}
          onChange={this.handleChange}
          closeMenuOnSelect={false}
        />
      </React.Fragment> */}

  <SelectSearch
          options={this.rows.map(el => ({name:el, value:el}))}
          multiple
          search
          placeholder="Friends"
          onChange={this.handleChange}
    />

        </div>
      );
    }
}

export default DivideTicket;
