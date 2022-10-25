import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import hibritLo from "../images/hibritcon.png";
import { Link } from "react-router-dom";
import back1 from "../images/baha2.jpg"

//MUI PART
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { TextField } from "@material-ui/core";
import { Button } from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import { RemoveRedEye } from "@material-ui/icons";
import Box from '@mui/material/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//Redux stuff
import {connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import { height, width } from "@mui/system";
import FooterMain from "../components/FooterMain";








const styles = {
  form: {
    height:"100%",
    overflow:"hidden",
    background:"#ffff"
  
  },
  middleStuf: {
    textAlign: "center",
   
   
    
  },
  image: {
    margin: "20px auto 20px auto",
  },
  pageTitle: {
    margin: "20px auto 20px auto",
  },
  textField: {
    margin: "10px auto 10px auto",

  },
  button: {
    marginTop: 20,
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
  },
  progress: {
    position: "absolute",
  },
  eye: {
    cursor: "pointer",
  },
  botomTitle:{
    
  },
  seconPartAll:{
    
   
  },

  secondPartBack:{
     backgroundImage: `url(${back1})`,
     height:"98vh",
     width:"150vh",
     backgroundRepeat:"no-repeat",
     backgroundSize:"auto 100%",
     backgroundPosition:"center",
  }
  
};


export class girisyap extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      hatalar: {},
      passwordIsMasked: true,
      open:false,
      resetEmail:"",
      hatakisigiris:{},
      parolEmail:""
    };
  }

  handleOpen = () => {
            this.setState({ open: true });
          };
          handleClose = () => {
              
            this.setState({ open: false });
            
          };

  //show the password
  togglePasswordMask = () => {
    this.setState((prevState) => ({
      passwordIsMasked: !prevState.passwordIsMasked,
    }));
  };

  
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if(nextProps.UI.errors==="email yada parola  yanlış"){
      this.setState({parolEmail: nextProps.UI.errors})
    }

  }


  handleSubmit = (event) => {
    event.preventDefault();
    
    var veriData = {
      email: this.state.email,
      password: this.state.password,
    };
    
   this.props.loginUser(veriData,this.props.history);
  };


parolaChangeArayuz=()=>{

 var veriData={
    email:this.state.resetEmail
  }

  axios
  .post("/resetparola",veriData)
  .then((res) => {
  this.handleClose()

  })
  .catch((err) => {
    console.log("hata burada: ",err.response.data.err)
     
     if(err.response.data.err=="auth/user-not-found"){
      this.setState({
        hatakisigiris:err.response.data.err
      })
     }else{
      this.setState({
        hatakisigiris:err.response.data.hatakisigiris
      })
     }
  }
    );
}


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes , UI:{loading}} = this.props;
    const { errors, hatalar, passwordIsMasked,hatakisigiris, hata} = this.state;
   
    return (
      <Grid container className={classes.form} marginTop={{xs:"30%" , md:"0" , sm:"0" , lg:"0"}}>
      <Grid item xs={12} sm={4} md={5} className={classes.middleStuf} >

      <Grid container paddingLeft={{xs:"20px" , md:"0" , sm:"0" , lg:"0"}} paddingRight={{xs:"20px" , md:"0" , sm:"0" , lg:"0"}}>
        
        <Grid item xs={12} sm={12} md={12} margin={{xs:"0" , md:"100px" , sm:"0" , lg:"100px"}} >
        <Typography variant="h6" className={classes.pageTitle} style={{marginTop:"35px"}} >
                  Giriş Yap
                </Typography>
                <form noValidate onSubmit={this.handleSubmit}>

                <TextField id="email"
                    name="email"
                    type="email"
                    label="E-Posta"
                    className={classes.textField}
                    helpertext={errors.email}
                    error={errors.email ? true : false || errors=="auth/too-many-requests" ? true :false || errors=="Lütfen yanlış bilgileri girildi tekrar deneyiniz!!" ? true :false}
                    value={this.state.email}
                    onChange={this.handleChange}
                    fullWidth variant="outlined" />


<TextField id="password" name="password" type={passwordIsMasked ? 'password' : 'text'} label="Parola" 
          value={this.state.password} onChange={this.handleChange} fullWidth
          helperText={errors.password || errors=="email yada parola  yanlış" ? "E-Posta yada Parola Yanlış" :"" || errors=="auth/too-many-requests" ? "Çok Fazla Denediniz, Bir süre sonra Tekrar Deneyiniz! Yada Şifremi Unuttum basın." :"" || errors=="Lütfen yanlış bilgileri girildi tekrar deneyiniz!!" ? "Bu hesap sistemimizde kayıtlı değildir." :""  }
           error={errors.password? true: false || errors=="auth/too-many-requests" ? true :false ||  errors=="email yada parola  yanlış" ? true :false || errors=="Lütfen yanlış bilgileri girildi tekrar deneyiniz!!" ? true :false}
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
                 
                 <small style={{color:"#2181ff", float:"right", marginBottom:"15px", marginRight:"15px", cursor:"pointer" }} onClick={ this.handleOpen }>
                    
                    Şifremi Unuttum.
                  </small>
        
                  <br />
                  <br />
                  {hatalar && (
                    <Typography variant="body2" className={classes.cutomError}>
                      {hatalar.hata}
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    className={classes.button}
                    disabled={loading}
                    fullWidth
                    style={{background:"linear-gradient(45deg, rgba(177,180,215,1) 0%, rgba(240,251,255,1) 25%, rgba(240,251,255,1) 75%, rgba(242,180,244,1) 100%)", color:"black"}}
                  >
                    GİRİŞ YAP
                    {loading && (
                      <CircularProgress
                        size={30}
                        color="inherit"
                        className={classes.progress}
                      />
                    )}
                  </Button>
                  <br />
                  <br />
                  <small className={classes.botomTitle}>
                    {" "}
                    Üye değilseniz, <Link to="/register" style={{color:"#2181ff"}}>Üye Olun.</Link>{" "}
                  </small>
                </form>

        </Grid>

        
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
       E-Posta Adresi Giriniz
   </DialogTitle>
   <DialogContent>
   <form>

  
              
              <TextField
 name="resetEmail"
 type="email"
 className={classes.textField}
 onChange={this.handleChange}
 fullWidth
 value={this.state.resetEmail}
 placeholder='örn:info@hibricard.com'

                    helpertext={hatakisigiris.email ||  hatakisigiris=="auth/user-not-found" ? "Bu Email'in Kayıt Bulunmuyor!!" : ""}
                    error={hatakisigiris.email ? true : false || hatakisigiris=="auth/user-not-found" ? true : false }
              />
              
            
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.parolaChangeArayuz} color="primary">
           Gönder
       </Button>
   </DialogActions>

          </Dialog>
          
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
    
    );
  }
}

girisyap.protoTypes = {
  classes: PropTypes.object.isRequired,
  loginUser:PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};


const mapStateToProps=(state)=>({
  user:state.user,
  UI: state.UI
})

const mapActionsToProps={
  loginUser

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(girisyap));



// <TextField
// id="email"
// name="email"
// type="email"
// label="Email"
// className={classes.textField}
// helperText={errors.email}
// error={errors.email ? true : false}
// value={this.state.email}
// onChange={this.handleChange}
// fullWidth
// variant="filled"
// />


// <TextField
// id="fullWidth"
// name="password"
// type="password"
// label="Parola"
// value={this.state.password}
// onChange={this.handleChange}
// fullWidth
// helperText={errors.password}
// error={errors.password ? true : false}
// variant="filled"
// />