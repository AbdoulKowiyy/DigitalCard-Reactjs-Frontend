import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from "prop-types";
import hibritLo from "../images/hibritcon.png";
import {Link} from "react-router-dom";

//MUI PART
import {Grid} from "@mui/material"
import  Typography  from '@mui/material/Typography';
import { TextField } from '@material-ui/core';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import { RemoveRedEye } from '@material-ui/icons';
import back1 from "../images/baha2.jpg";

//Redux 
import {connect} from "react-redux"
import {signUpUser} from "../redux/actions/userActions"
import FooterMain from '../components/FooterMain';


const styles={
  form:{
   
    height:"100%",
    overflow:"hidden",
    background:"#ffff"
  },
  middleStuf:{
    textAlign:"center"
  },
  image:{
    margin: "20px auto 20px auto"
  },
  pageTitle:{
    margin: "20px auto 20px auto"
  },
  textField:{
    margin:"10px auto 10px auto"
  },
  button:{
    marginTop:20,
    position:"relative"
  },
  customError:{
    color:"red",
    fontSize:"0.8rem"
  },
  progress:{
    position:"absolute"
  },
  eye: {
    cursor: 'pointer',
  },
  secondPartBack:{
    backgroundImage: `url(${back1})`,
   height:"98vh",
   width:"100vh",
   backgroundRepeat:"no-repeat",
   backgroundSize:"auto 100%",
   backgroundPosition:"center",

 }
}



export class uyeol extends Component {


constructor(){
  super()
  this.state={
    email:"",
    password:"",
    nameSurname:"",
    confirmPassword:"",
    userHandle:"",
    passwordIsMasked: true,
    passwordIsMaskedTwo:true,
    error:{}
  }
}

componentWillReceiveProps(nextProps) {
  if (nextProps.UI.errors) {
    this.setState({ error: nextProps.UI.errors });
  }
}
//only alphabet
onChangeOnly=(e) => {
  let value = e.target.value

  value = value.replace(/[^a-zA-Z0-9]/g, '')


  this.setState({
    [e.target.name]:value
  })
}



//show the password
togglePasswordMask = () => {
  this.setState(prevState => ({
    passwordIsMasked: !prevState.passwordIsMasked,
  }));
};

togglePasswordMask2=()=>{
  this.setState(prevState => ({
    passwordIsMaskedTwo: !prevState.passwordIsMaskedTwo,
  }));
}

handleSubmit=(event)=>{
  event.preventDefault();
  this.setState({
    loading:true
  });
  const newkullaniciData= {
    email:this.state.email,
    nameSurname:this.state.nameSurname,
    password:this.state.password,
    confirmPassword:this.state.confirmPassword,
    userHandle:this.state.userHandle
  };
 this.props.signUpUser(newkullaniciData,this.props.history)
}
handleChange=(event)=>{
  
  this.setState({
    [event.target.name]:event.target.value
  })
}

  render() {
    const {classes, UI:{loading} }=this.props
    const {error, passwordIsMasked,passwordIsMaskedTwo}=this.state
   
    return (
      <Grid container className={classes.form} marginTop={{xs:"20%" , md:"0" , sm:"0" , lg:"0"}}>


<Grid item xs={12} sm={4} md={5} className={classes.middleStuf} >

<Grid conatiner paddingLeft={{xs:"20px" , md:"0" , sm:"0" , lg:"0"}} paddingRight={{xs:"20px" , md:"0" , sm:"0" , lg:"0"}}>
  <Grid item xs={12} sm={12} md={12} margin={{xs:"0" , md:"100px" , sm:"0" , lg:"100px"}} >
  <Typography variant='h6' className={classes.pageTitle} style={{marginTop:"35px"}}>Üye Ol</Typography>

        <form noValidate onSubmit={this.handleSubmit}>
          <TextField id="email" name="email" type="email" label="E-Posta Adresi" 
          className={classes.textField} value={this.state.email} onChange={this.handleChange} fullWidth 
          helperText={error.email} error={error.email ? true: false} variant="outlined"/>

          <TextField id="namesurname" name="nameSurname" type="text" label="Ad Soyad" 
          className={classes.textField} value={this.state.nameSurname} onChange={this.handleChange} fullWidth 
          helperText={error.nameSurname} error={error.nameSurname ? true: false} variant="outlined"/>
           
          <TextField id="standard-adornment-password" name="password" type={passwordIsMasked ? 'password' : 'text'} label="Parola" 
          value={this.state.password} onChange={this.handleChange} fullWidth
          helperText={error.password || error=="Backend de yanlış bir şeyler gitti, Lütfen tekrar deneyiniz!!" ? "Şifre en az 6 karakter olmalıdır!" :"" || error=="Şifre en az 6 karakter olmalıdır!" ? " Şifre en az 6 karakter olmalıdır!" :"" } error={error.password? true: false || error=="Backend de yanlış bir şeyler gitti, Lütfen tekrar deneyiniz!!" ? true :false || error=="Şifre en az 6 karakter olmalıdır!" ? true :  false}
          className={classes.textField}
         
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <RemoveRedEye
                  className={classes.eye}
                  onClick={this.togglePasswordMask}
                />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          />

<TextField id="confirmPassword" name="confirmPassword" type={passwordIsMaskedTwo ? 'password' : 'text'} label="Parolanızı Doğrulayın" 
          value={this.state.confirmPassword} onChange={this.handleChange} fullWidth
          helperText={error.confirmPassword} error={error.confirmPassword? true: false}
          className={classes.textField}
          
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <RemoveRedEye
                  className={classes.eye}
                  onClick={this.togglePasswordMask2}
                />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          />

          <TextField
              id="userHandle"
              name="userHandle"
              type="text"
              label="Kullanıcı Adı"
              className={classes.textField}
              helperText={error.userHandle || error=="bu kullanıcı zaten mevcut" ? "Bu kullanıcı zaten mevcut, Başka kullanıcı adı seçiniz!" :"" }
              error={error.userHandle ? true : false || error=="bu kullanıcı zaten mevcut" ? true :false}
              value={this.state.userHandle}
              onChange={(e)=>{this.handleChange(e); this.onChangeOnly(e)}}
              fullWidth
              variant="outlined"
            />
            
        

          { error.general && (
            <Typography variant='body2' className={classes.cutomError}>
              {error.general}
               </Typography>
          )}
<Button  variant='contained' type="submit" style={{background:"linear-gradient(45deg, rgba(177,180,215,1) 0%, rgba(240,251,255,1) 25%, rgba(240,251,255,1) 75%, rgba(242,180,244,1) 100%)", color:"black"}} className={classes.button} disabled={loading} fullWidth>
  Üye Ol
  {loading &&(
    <CircularProgress size={30} color="inherit" className={classes.progress}/>
  )
  }

</Button><br /><br />
<small> Hesabınız var ise, <Link to="/login" style={{color:"#2181ff"  }}>Giriş Yapınız.</Link > </small>
        </form>



  </Grid >

</Grid>
<FooterMain/>
        </Grid>

        <Grid item  sm={8} md={7} className={classes.seconPartAll} display={{ xs: "none" ,sm:"block", md:"block"}}>
                
                <Grid container>
                  <Grid item xs={12} className={classes.secondPartBack}>
                
                  </Grid>
                
                </Grid>
                
                              </Grid>

      </Grid>
    )
  }
}

uyeol.protoTypes={
  classes: PropTypes.object.isRequired,
  user:PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  logoutUser:PropTypes.func.isRequired

}

const mapStateToProps=(state)=>({
  user:state.user,
  UI: state.UI

})



export default connect(mapStateToProps, {signUpUser})(withStyles(styles)(uyeol))

