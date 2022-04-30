import React, { Component } from "react";
import { useState } from "react";


class Groups extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        data : null
      }
      this.groups = null;
      this.llista = {};
    }

    async YourGroups() {
        await fetch('/groups?email='+ this.props.Email, {
          method: 'GET',
        }).then(resp => {
          resp.json().then((resp)=>{
            console.log(resp);
            this.groups = resp.Groups;
            console.log(this.groups);
            this.setState({data: 'loaded'})

          })
        })
      }
    
    componentDidMount(){
      this.YourGroups();
      console.log(this.state)
      this.groups = [];
    }

  
    render(){
      if (this.groups === null) {
       return ( <a>Retrieving data...</a> )
       
      } else {
        
        console.log(this.groups);}
        return(
          <React.Fragment>
          <ul>
            <b>Your Groups</b>
            {this.groups.map(listitem => (
              <li>
                {listitem}
              </li>
            ))}
          </ul>
        </React.Fragment>

        );}
}

export default Groups;