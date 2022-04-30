import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';





class ProfileView extends React.Component{

  constructor(props){
    super(props)
    this.state = {
    
    data : null
    }
    this.rows = null;
    this.tu = {};
  }
  createData(item, value) {
    return { item,value };
  }
  

  async ProfileData() {
    await fetch('/profile?email='+ this.props.Email, {
      method: 'GET',
    }).then(resp => {
      resp.json().then((resp)=>{
        console.log(resp.Nickname, resp.Name, resp.email, resp.Total_spend);

        this.tu['Nickname'] = resp.Nickname;
        this.tu['Name'] = resp.Name;
        this.tu['email'] = resp.email;
        this.tu['Total_spend'] = resp.Total_spend;

        this.setState({data: 'loaded'})

      })
    })
  }


  componentDidMount(){
    this.ProfileData();
    console.log(this.state)
    this.rows = [];
  }


  render (){


    if (this.rows === null) {
        // Render loading state ...
       return ( <a>Retrieving data...</a> )
       
      } else {
      
    console.log(this.rows)
    console.log(this.state)
    console.log(this.tu)
    
    this.rows = [ 
    this.createData('Nickname', this.tu["Nickname"]),
    this.createData('Name', this.tu['Name']),
    this.createData('e-mail', this.tu['email']),
    this.createData('Total spend', this.tu['Total_spend']),
    ];
    return ( 
    <TableContainer component={Paper}>
      <Table style={{background: '#282c34'}} sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableBody>
          {this.rows.map((row) => (
            <TableRow
              key={row.item}
            >
              <TableCell component="th" scope="row" style={{color: 'white'}}>
                {row.item}
              </TableCell>
              <TableCell style={{color: 'white'}}>{row.value}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
          }}
  }
  


export default ProfileView;
