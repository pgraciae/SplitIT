
import React,{Component} from 'react';
import Button from '@mui/material/Button';
//import input from '@mui/material/input';


function inputFile(props){

    return (
    <input onChange ={(event)=>props.img(event)} type="file"> Gallery </input>
        )
}

export default inputFile;