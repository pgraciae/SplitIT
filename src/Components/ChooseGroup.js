import React, { Component } from "react";
import Button from '@mui/material/Button';

class ChooseGroup extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        group: 'false',
        group_value : null,
      }
      this.groups = null;
      this.llista = {};
      this.continue = this.continue.bind(this)
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
    
    setGroup(value){
        this.setState({group_value : value})
    }
    ret_group(){
        return this.state.group_value
    }

    componentDidMount(){
      this.YourGroups();
      console.log(this.state)
      this.groups = [];
    }

    continue(){
        if (this.ret_group() != null){
            console.log(this.props)
            console.log(this.ret_group())
            this.props.group_value(this.ret_group())
            this.props.view('repartir')
    }
    }


    render(){
      if (this.groups === null) {
       return ( <a>Retrieving data...</a> )
       
      } 
      else {
        console.log(this.groups);}
        return(
          <div>
            <React.Fragment>
            <ul>
              <b>Select Group</b>
              <select
                    id="gender"
                    name="gender"
                    value={this.state.group_value}
                    placeholder="Groups"
                    onChange={(e) => this.setGroup(e.target.value)}
                  >
                    {this.groups.map(listitem => (
                <option>
                  {listitem}
                </option>
                ))}
                  </select>

            </ul>
            </React.Fragment>
        <div>
        <Button variant ="contained" onClick={this.continue}>
            Continue
        </Button>
        </div>
        </div>

        );}
}

export default ChooseGroup;
