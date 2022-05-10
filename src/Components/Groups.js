import React, { Component } from "react";
import AddGroup from './AddGroup';

class Groups extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        data : null,
        group: 'false',
      }
      this.groups = null;
      this.llista = {};
      this.addGroup = this.addGroup.bind(this);
      this.addGroup_value = this.addGroup_value.bind(this);
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

    addGroup(){
      this.setState({group: 'true'})
    }
  
    addGroup_value(value){
      console.log(value)
      this.setState({group: value})
      console.log("group_restatus", this.state.group)
    }

    render(){
      if (this.groups === null) {
       return ( <a>Retrieving data...</a> )
       
      } 
      
      if (this.state.group === 'true'){
        return(
          <div>
            <AddGroup Email={this.props.Email} Group_status={this.addGroup_value} />
          </div>
        )
      }

      else {
        console.log(this.groups);}
        return(
          <div>
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
            <button className='Home-button' type='submit' onClick={this.addGroup}>
              Add Group
            </button>
          </div>
        );}
}

export default Groups;