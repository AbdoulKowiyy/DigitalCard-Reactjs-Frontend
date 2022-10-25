import React, { Component,Fragment } from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import MyButton from '../util/MyButton';

//Icons
import AddIcon from "@material-ui/icons/Add"
import HomeIcon from "@material-ui/icons/Home"
import Notifications from "@material-ui/icons/Notifications"
import Typography from "@material-ui/core/Typography";


//MUI material
import  AppBar  from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";


class Navbar extends Component {
  render() {
    const {authenticated}= this.props
    return (
     <div>

     
<Toolbar className='Nav-container' style={{justifyContent:"center"}}>
<Fragment>
<Grid container xs={12} >
    <Grid xs={12} style={{float:"center", padding:"5px"}}>
        <Typography variant="h6" style={{color:"lightgray", fontSize:"14px"}} >
            © 2022 | Design and Development by <a href="https://hibritmedya.com.tr" target="_blank" style={{color:"#fdd140"}}> Hibrit Medya</a>
        </Typography>
        <Typography variant="h6" style={{color:"lightgray", fontSize:"14px"}}>
            <a href="#" target="_blank" style={{color:"lightgray"}}>Gizlilik Politikası</a> - <a href="#" target="_blank" style={{color:"lightgray"}}>Kullanım Sözleşmesi</a>
        </Typography>
    </Grid>
</Grid>
</Fragment>
</Toolbar>
</div>       
        
    )
  }
}

Navbar.propTypes={
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps= (state)=>({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)

{/* <Button color="inherit" component={Link} to="/uyeol">Kaydol</Button>
  
  <Button color="inherit" component={Link} to="/girisyap" >Giriş Yap</Button>
  <Button color="inherit" component={Link} to="/testLogin" >Test Login</Button> */}
