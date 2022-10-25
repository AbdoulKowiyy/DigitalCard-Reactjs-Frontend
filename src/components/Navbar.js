import React, { Component,Fragment } from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import MyButton from '../util/MyButton';

//Icons
import AddIcon from "@material-ui/icons/Add"
import HomeIcon from "@material-ui/icons/Home"
import Notifications from "@material-ui/icons/Notifications"


//MUI material
import  AppBar  from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';


class Navbar extends Component {
  render() {
    const {authenticated}= this.props
    return (
        <AppBar>
<Toolbar className='Nav-container'>
    
 {
authenticated ? (

<Fragment>
  <MyButton tip="Post a scream!">
<AddIcon color='primary'/>
  </MyButton>
  <Link to="/">
  <MyButton tip="Home">
<HomeIcon color='primary'/>
  </MyButton>
  </Link>

<MyButton tip="Bildirim">
  <Notifications  color='primary'/>
</MyButton>

</Fragment>
):(
  <Fragment>
  <Button color="inherit" component={Link} to="/" >Kişisel Bilgiler</Button> 
 
  
  </Fragment>
)

 }
 
</Toolbar>
        </AppBar>
        
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
