import SelectSearch from 'react-select-search';
import React, { Component } from "react";
import Select from "react-select";
import Button from '@mui/material/Button';



class DivideTicket extends React.Component {

constructor(props){
    super(props)
    this.state = {
      data : this.props.data,
      nickname: '',
      selectedUser: null,
      selectedItem: null,
      counters: 0,
      userItems: {},
      loaded: false,
    }

    this.rows = null;
    this.llista = [];
    this.Divide = this.Divide.bind(this)
    this.MapData = this.MapData.bind(this)
    console.log('props',this.props)
  }

  MapData(){
    console.log('data',this.state.data) //loaded not array
    return this.state.data.map(el => ({value:el.Item, label:el.Item}))
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
    let a = this.state.userItems
    let b = []

    for (var k=0; k<Object.keys(this.state.data).length;k++){
        if (!(this.state.selectedItem.map(el=>(el.value)).includes(this.state.data[k].Item))){
          b.push(this.state.data[k])
        }
    }


    for (var i=0; i<this.state.selectedUser.length; i++){
      for (var j=0; j<this.state.selectedItem.length; j++){
        console.log('bucle',i,j)
        if (this.state.selectedUser[i].value in a){
          a[this.state.selectedUser[i].value].push(this.state.selectedItem[j].value)
        }
        else{
          a[this.state.selectedUser[i].value]=[this.state.selectedItem[j].value]
        }
      }
    }
    console.log('a',a)
    console.log('b',b)
    this.setState({userItems: a, data: b})

    console.log('user Items', this.state.userItems)
    console.log('selected user', this.state.selectedUser)
  }

  async YourFriends() {
    console.log('group_iddd', this.props.group_value)
      await fetch('/friends_group?group_id='+ this.props.group_value, {
        method: 'GET',
      }).then(resp => {
        resp.json().then((resp)=>{
          console.log(resp);
          this.rows = resp.Friends;
          console.log(this.rows);
          this.setState({loaded: 'loaded'});
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
     
    } else if (this.state.data.length > 0){
      console.log('holaa', this.rows)
      console.log('i', this.rows.map(el => ({value:el, label:el})))
      console.log('products', this.props.data.map(el => ({value:el.Item, label:el.Item})))
      
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
              options={this.MapData()}
              value={this.state.selectedItem}
              onChange={this.handleChange_item}
              closeMenuOnSelect={false}
            />
          </React.Fragment>
          <Button onClick={this.Divide}>
            Continue
          </Button>
          </div>
        
        </div>
      );
    } else {
      //ficrho tot BD

      this.props.view('final')
    }
}
}
export default DivideTicket;
