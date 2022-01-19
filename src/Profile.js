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


function createData(item, value) {
    return { item,value };
  }
  
const rows = [ //aqui accedirem a les daades de la db
createData('Username', 'User0'),
createData('Name', 'Name1'),
createData('e-mail', 'example @example'),
createData('UserID', 1),
createData('Total spend', 80),
];


function ProfileView(props){
    //const = això agafara dades del usuari de la BD
    return ( 
    <TableContainer component={Paper}>
      <Table style={{background: '#282c34'}} sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableBody>
          {rows.map((row) => (
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
  }
  


export default ProfileView;