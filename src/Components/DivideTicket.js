import SelectSearch from 'react-select-search';
import React, { Component } from "react";
import Select from "react-select";
import Button from '@mui/material/Button';



class DivideTicket extends React.Component {

constructor(props){
    super(props)
    this.state = {
      data : null,
      nickname: '',
      selectedUser: null,
      selectedItem: null,
      counters: 0,
      userItems: {},

    }
    this.rows = null;
    this.llista = [];
    this.Divide = this.Divide.bind(this)


  }

  handleChange_user = selectedUser => {
    this.setState({ selectedUser: selectedUser });
    // Option selected: { value: "rojo", label: "rojo" }
    console.log("remain: ", this.rows)
    console.log("Option selected:", selectedUser);
  };

  handleChange_item = selectedItem => {
    this.setState({ selectedItem: selectedItem });
    // Option selected: { value: "rojo", label: "rojo" }
    console.log("remain: ", this.props.data)
    console.log("Option selected:", selectedItem);
  };
  
  Divide(){
    // this.setState({counters: this.state.counters+1})
    // console.log(this.rows)
    let a = {}
    let b = {}
    for (var i=0; i<this.state.selectedUser.lenght; i++){
      for (var j; j<this.state.selectedItem.lenght; j++){
        if (this.state.selectedUser[i] in a){
          a[this.state.selectedUser[i]].push(this.state.selectedItem[j])
        }
        else{
          a[this.state.selectedUser[i]]=[this.state.selectedItem[j]]
        }
        if (i == 0){
          
        }
      }
    }
    console.log(a)
    this.setState({userItems: a})
    console.log(this.state.userItems)
    console.log(this.state.selectedUser)
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
      console.log('products', this.props.data.map(el => ({value:el.Item, label:el.Item})))
      // let rows_list = this.rows.length > 0
    	// && this.rows.map((item, i) => {
      // return (
      //   <option key={i} value={item}>{item}</option>
      //   )
      //  }, this);
      
      return(
        <div>
          <div>
          <React.Fragment>
            <Select
              isMulti
              options={this.rows.map(el => ({value:el, label:el }))}
              value={this.state.selectedUser}
              onChange={this.handleChange_user}
              closeMenuOnSelect={false}
            />
          </React.Fragment>
          </div>
          <div>

          
          <React.Fragment>
            <Select
              isMulti
              options={this.props.data.map(el => ({value:el.Item, label:el.Item}))}
              value={this.state.selectedItem}
              onChange={this.handleChange_item}
              closeMenuOnSelect={false}
            />
          </React.Fragment>
          <Button onClick={this.Divide}>
            Continue
          </Button>
          </div>
        
        
        
    {/* <h2>USERS: </h2>
    <select options={rows_list}
            placeholder='Select user/s'
            value={this.state.selectedOption}
            onChange={this.handleChange}
            isSearchable={true}
    />
    <br /><br />
    <b>Selected:</b>
    <pre>{JSON.stringify(this.state.selectedOption)}</pre> */}
  {/* <SelectSearch
      options={this.rows.map(el => ({name:el, value:el}))}
      multiple
      search
      placeholder="Friends"
      // onChange={this.handleChange}
    /> */}
        </div>
      );
    }
}

export default DivideTicket;
