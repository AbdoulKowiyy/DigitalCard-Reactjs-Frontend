import { Grid } from '@mui/material'
import React, { Component } from 'react'
import axios from "axios"
import Scream from "../components/Scream"
import Profile from "../components/Profile"
import Navbar from '../components/Navbar'


//to send the request to the server and show it on the content
//npm install --save axios
//to show the date as 1 day ago or 2 day ago we use //npm i --save dayjs
class anasayfa extends Component {
  state={
    crier:null
  }
  componentDidMount(){

    axios.get("/crier").then((res)=>{
      this.setState({
        crier:res.data
      })
    }).catch(err =>{

      console.log("Hata var: " ,err)
      
    })

  }
  render() {
    let recentCrier=this.state.crier ? (

      this.state.crier.map((screm)=><Scream key={screm.crierId} screm={screm}/>)

    ) : (<p>Yükleniyor...</p>);
    return (
      <Grid container 
      
      >
        
        <Grid item xs={12}>
          <Profile/>
        </Grid>
      </Grid>
    )
  }
}

export default anasayfa
