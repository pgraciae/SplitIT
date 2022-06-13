import React, { Component } from "react";
import { useState } from "react";
import AddFriend from "./AddFriend";
import NavBarCustom from './NavBar';



class Friends extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        data : null,
        friend: 'false',
        nickname: '',
      }
      this.rows = null;
      this.llista = {};
      this.addFriend = this.addFriend.bind(this);
      this.addFriend_value = this.addFriend_value.bind(this);
      this.addedFriend = this.addedFriend.bind(this);
    }

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
    }

    addFriend(){
      this.setState({friend:'true'})
    }

    addFriend_value(value){
      console.log(value)
      this.setState({friend: value})
      console.log("friend_restatus", this.state.friend)
    }

    addedFriend(){
      this.setState({friend:'false'})
    }



    render(){
      console.log(this.state.friend, 'friend_status')
      if (this.rows === null) {
       return ( <a>Retrieving data...</a> )
       
      } 
      if (this.state.friend === 'true'){
        return(
          <div>
            <AddFriend Email={this.props.Email} Nickname={this.state.nickname} Friend_status={this.addFriend_value} addedFriend={this.addedFriend} />
          </div>
        )
      }
      else {
        console.log(this.rows)}
        return(
          <div>
            <React.Fragment>
            <ul>
              <b>Your Friends</b>
              {this.rows.map(listitem => (
                <li>
                  {listitem}
                </li>
              ))}
            </ul>
          </React.Fragment>
          <button className='Home-button' type='submit' onClick={this.addFriend}>
              Add Friend
          </button>
          </div>
        );
      }

      
}

export default Friends;