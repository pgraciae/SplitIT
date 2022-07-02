import SelectSearch from 'react-select-search';
import React, { Component } from "react";


class DivideTicket extends React.Component {

constructor(props){
    super(props)
    this.state = {
      data : null,
      nickname: '',
    }
    this.rows = null;
    this.llista = {};

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
    // Ticket elements en una estructura
  }

  render(){
    console.log(this.state.friend, 'friend_status')
    if (this.rows === null) {
     return ( <a>Retrieving data...</a> )
     
    } 
    else {
      console.log(this.rows)}
      return(
        <div>
          {/* <React.Fragment>
          <ul>
            <b>friends</b>
            {this.rows.map(listitem => (
              <li>
                {listitem}
              </li>
            ))}
          </ul>
        </React.Fragment> */}
      <SelectSearch
          options={this.rows}

          placeholder="friends"
      />
        </div>
      );
    }
}

export default DivideTicket;
