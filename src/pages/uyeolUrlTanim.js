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
import {signUpUserOnTanimUrl} from "../redux/actions/userActions"
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



export class uyeolUrlTanim extends Component {
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
    onurlLinkiId: "",
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
    loading:true,
  });
  const newkullaniciData= {
    email:this.state.email,
    nameSurname:this.state.nameSurname,
    password:this.state.password,
    confirmPassword:this.state.confirmPassword,
    userHandle:this.state.userHandle,
    onurlLinkiId:this.props.varolanUrl
  };
 this.props.signUpUserOnTanimUrl(newkullaniciData,this.props.history)
}
handleChange=(event)=>{
  this.setState({
    [event.target.name]:event.target.value
  })
}

  render() {
    const {classes, UI:{loading}, varolanUrl }=this.props
    const {error, passwordIsMasked,passwordIsMaskedTwo}=this.state
   const base1=`/id/${varolanUrl}/login`
    return (
      <Grid container className={classes.form} marginTop={{xs:"20%" , md:"0" , sm:"0" , lg:"0"}}>


<Grid item xs={12} sm={4} md={5} className={classes.middleStuf}>

<Grid conatiner paddingLeft={{xs:"20px" , md:"0" , sm:"0" , lg:"0"}} paddingRight={{xs:"20px" , md:"0" , sm:"0" , lg:"0"}}>
  <Grid item xs={12} sm={12} md={12} margin={{xs:"0" , md:"100px" , sm:"0" , lg:"100px"}}>
  <Typography variant='h6' className={classes.pageTitle} style={{marginTop:"35px"}}> ??ye Ol</Typography>

        <form noValidate onSubmit={this.handleSubmit}>
          <TextField id="email" name="email" type="email" label="E-Posta Adresiniz" 
          className={classes.textField} value={this.state.email} onChange={this.handleChange} fullWidth 
          helperText={error.email} error={error.email ? true: false} variant="outlined"/>

          <TextField id="namesurname" name="nameSurname" type="text" label="Ad Soayd??n??z" 
          className={classes.textField} value={this.state.nameSurname} onChange={this.handleChange} fullWidth 
          helperText={error.nameSurname} error={error.nameSurname ? true: false} variant="outlined"/>
           
           <TextField id="standard-adornment-password" name="password" type={passwordIsMasked ? 'password' : 'text'} label="Parola" 
          value={this.state.password} onChange={this.handleChange} fullWidth
          helperText={error.password || error=="Backend de yanl???? bir ??eyler gitti, L??tfen tekrar deneyiniz!!" ? "??ifre en az 6 karakter olmal??d??r!" :"" || error=="??ifre en az 6 karakter olmal??d??r!" ? " ??ifre en az 6 karakter olmal??d??r!" :"" } error={error.password? true: false || error=="Backend de yanl???? bir ??eyler gitti, L??tfen tekrar deneyiniz!!" ? true :false || error=="??ifre en az 6 karakter olmal??d??r!" ? true :  false}
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

<TextField id="confirmPassword" name="confirmPassword" type={passwordIsMaskedTwo ? 'password' : 'text'} label="Parolan??z?? Do??rulay??n" 
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
              label="Kullan??c?? Ad??"
              className={classes.textField}
              helperText={error.userHandle || error=="bu kullan??c?? zaten mevcut" ? "Bu kullan??c?? zaten mevcut, Ba??ka kullan??c?? ad?? se??iniz!" :"" }
              error={error.userHandle ? true : false || error=="bu kullan??c?? zaten mevcut" ? true :false}
              value={this.state.userHandle}
              onChange={(e)=>{this.handleChange(e); this.onChangeOnly(e)}}
              fullWidth
              variant="outlined"
            />
            
            <TextField
              id="onurlLinkiId"
              name="onurlLinkiId"
              type="text"
              className={classes.textField}
              value={varolanUrl}
              fullWidth
              variant="outlined"
              style={{display:"none"}}
            />
            
        

          { error.general && (
            <Typography variant='body2' className={classes.cutomError}>
              {error.general}
               </Typography>
          )}
<Button  variant='contained' type="submit" color="primary" className={classes.button} disabled={loading} fullWidth style={{background:"linear-gradient(45deg, rgba(177,180,215,1) 0%, rgba(240,251,255,1) 25%, rgba(240,251,255,1) 75%, rgba(242,180,244,1) 100%)", color:"black"}}>
  ??ye Ol
  {loading &&(
    <CircularProgress size={30} color="inherit" className={classes.progress}/>
  )
  }

</Button><br /><br />

<small> Hesab??n??z var ise, <Link to={base1} style={{color:"#2181ff"  }}>Giri?? Yap??n??z.</Link > </small>
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

uyeolUrlTanim.protoTypes={
  classes: PropTypes.object.isRequired,
  user:PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  logoutUser:PropTypes.func.isRequired,
  varolanUrl: PropTypes.string.isRequired,
  history:PropTypes.string.isRequired,

}

const mapStateToProps=(state)=>({
  user:state.user,
  UI: state.UI

})



export default connect(mapStateToProps, {signUpUserOnTanimUrl})(withStyles(styles)(uyeolUrlTanim))

