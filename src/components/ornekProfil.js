import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import EditDetails from "./EditDetails";
import IconPage from "./IconPage";

//MUI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { Grid, IconButton } from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@mui/material/Tooltip";
import { TextField } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import back1 from "../images/curved-6.jpg";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import instagram from "../images/instagram.png";
import addicon from "../images/add-image.png";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ShareIcon from '@mui/icons-material/Share';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ModeIcon from '@mui/icons-material/Mode';

import MyButton from "../util/MyButton";

//Icons
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from '@material-ui/icons/Notifications';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

//Redux
import { uploadImage, logoutUser } from "../redux/actions/userActions";
import { KeyboardReturn } from "@material-ui/icons";
import { fontSize, padding, textAlign } from "@mui/system";

const styles = (theme) => ({
  paper: {
    padding: 190,
  },
  proimage: {
    width: 70,
    height: 70,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "20%",
    marginTop: "18px",
  },
  profile: {
    maxWidth:"1200px",
    marginLeft:"auto",
    marginRight:"auto",
    marginBottom:"100px",
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 100,
      height: 100,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },

    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  cardBack: {
    textAlign: "center",
    "& .backgroundPart": {
      backgroundImage: `url(${back1})`,

      minHeight: "200px",
      borderRadius: "20px",
    },
    "& .writeIcon": {
      color: "#fff !important",
      float: "left ",
      marginLeft: "20px",
      paddingLeft:"20px"
    },
    "& .IconButton":{
      float:"right"
    },
    "& .IconStyle":{
      paddingRight:"20px",
      paddingTop:"10px"

    }
    ,"& .classIcon":{
      color:"#fdfdfd",
    }
  },
  profil: {
    display: "flex",
    padding: "20px",
    
    "& .ProfilShareButtons":{
      position:"absolute",
      right:"0",
      paddingRight:"3px",
      marginRight:"20px",
      "& .classIcon":{
        color:"#344767",
        fontSize:"large",
        paddingRight:"3px",
        paddingLeft:"3px",
      }

    },
    "& .titleName": {
      marginLeft: "22px",
    },
    "& .isimSoyisim": {
      fontSize: "1.25rem",
      lineHeight: 1.375,
      opacity: "1",
      fontWeight: 700,
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      color: "#344767",
    },
    "& .positionpart": {
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      color: "#67748e",
      fontSize: "0.875rem",
    },
  },
  
  profilKismi: {
    display: "flex",
    margin: "0px 30px",
    marginTop: "-60px !important",
    borderRadius: "10px",
    backdropFilter:"saturate(200%) blur(30px);",
    boxShadow: "0 10px 10px -3px #27272717",
    background:"#fdfdfdad",
    "&::before":{
      boxShadow: "inset 0 0 2000px rgba(255, 255, 255, .5)",
      filter:" blur(1px)",
    }
  },
  button: {
    textAlign: "center",
    "& a": {
      margin: "50px",
    },
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  backcard: {},
  setting: {
    float: "right !important",
    marginLeft: "auto",
    marginRight: "20px",
    marginTop: "50px",
  },
  cartPartSocial:{
    borderRadius: "10px",
    boxShadow: "0 10px 10px -3px #27272717",
    background:"#fdfdfd",
  margin:"30px 30px 00px 30px !important",
    height: "100%",
    "& .cardBilgi": {
      margin: "30px",
    },
    "& .infoTitle": {
      fontSize: "1rem",
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      letterSpacing: "0.0075em",
    },"& .socialDiv ": {
      display: "flex",
      marginLeft:"20px !important",
      marginBottom:"30px",
      marginRight:"20px",
      width:"100%"
    },
    "& .icondiv": {
      margin: "10px",
      cursor:"pointer !important"
    },
    "& .iconlar": {
      maxHeight: "50px",
      maxWidth: "50px",
      margin:"0px 5px !important",
      textAlign:"center",
      filter:"grayscale(100%)",
    },
    " & .iconlariki":{
      maxHeight: "50px",
      maxWidth: "50px",
      margin:"0px 5px !important",
      textAlign:"center",
      filter:"saturate(3)",
    },
    "& socialButtonlar": {
      boder: "1px #9E9E9E",
      textAlign: "center",
      
    },
  },
 
 
  cardPart: {
    borderRadius: "10px",
    boxShadow: "0 10px 10px -3px #27272717",
    background:"#fdfdfd",
    marginTop:"30px",
    marginLeft:"30px",
    marginRight:"30px",
    height: "100%",
    "& .cardBilgi": {
      margin: "30px",
    },
    "& .infoTitle": {
      fontSize: "1rem",
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      letterSpacing: "0.0075em",
    },
    "& .bioBilgileri": {
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      fontSize: "0.875rem",
      opacity: 1,
      color: "#67748e",
      lineHeight: "1.5",
      letterSpacing: "0.02857em",
      fontWeight: "400",
    },
    "& .KisiBilgileri": {
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      color: "#344767",
      fontSize: "0.875rem",
      lineHeight: "1.5",
      fontWeight: 700,
      margin: "0",
      opacity: "1",
    },
    "& .secondBilgi": {
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      fontSize: "0.875rem",
      lineHeight: "1.5",
      fontWeight: 400,
      color: "#67748e",
    },
    "& .socialDiv ": {
      display: "flex",
    },
    "& .icondiv": {
      margin: "10px",
    },
    "& .iconlar": {
      maxHeight: "50px",
      maxWidth: "50px",
    },
    "& socialButtonlar": {
      boder: "1px #9E9E9E",
      textAlign: "center",
    },
  },
});

class ornekProfil extends Component {


  constructor() {
    super();
    this.state = {
      email: " ",
      password: " ",
      errors: {},
      hatalar: {},
      ikonRengi:false
    };
  }


  //change the icon color
  handleIkonColor=()=>{
    this.setState({
      ikonRengi:true
    })
  }

  //hidden button show

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  //Logout
  // handleLogout = () => {
  //   this.props.logoutUser();
  //   window.location.reload(false);
  // };

  render() {
    const {
      classes,
      user: {
        credentials: {
          userHandle,
          createdAt,
          profileUrl,
          bio,
          website,
          location,
        },
        loading,
        authenticated,
      },
    } = this.props;
    const { errors, hatalar, passwordIsMasked } = this.state;

    return (
      <Grid container className={classes.profile} xs={12}>
        <Grid className={classes.cardBack} xs={12}>
          <div className="backgroundPart">
           
              <div style={{paddingTop:"-10px !important"}}>
              <h4 className="writeIcon" >Profil</h4>
              </div>
              
          
            <div className="IconButton IconStyle">
              <Link to="/">
                <MyButton tip="Çıkış Yap" className="settingButton">
                  <MeetingRoomIcon className="classIcon" />
                  <span style={{color:"#fdfdfd", fontSize:"15px",paddingLeft:"5px",fontWeight:"700"}}>Çıkış Yap</span>
                </MyButton>
              </Link>
              <Link to="/">
                <MyButton tip="Ayar" className="settingButton">
                  <SettingsIcon className="classIcon" />
                </MyButton>
              </Link>
              <Link to="/">
                <MyButton tip="Bildirim" className="settingButton">
                  <NotificationsIcon className="classIcon" />
                </MyButton>
              </Link>
            </div>
          </div>
        </Grid>
        <Grid xs={12} className={classes.profilKismi}>
          <Grid item className={classes.profil}>
            <img
              src="https://blog.snappa.com/wp-content/uploads/2022/01/facebook-cover-photo-size.jpg"
              alt=""
              className={classes.proimage}
            />

            <div className="titleName">
              <h5 className="isimSoyisim">
                Abdoul Kowyou YACOUBOU
                <br />
                <span className="positionpart">Hibrit Medya Reklam A.Ş. / CEO</span>
              </h5>
            </div>
            <div className="ProfilShareButtons">
            <Link to="/">
               
                  <ShareIcon className="classIcon" />

              </Link>
              <Link to="/">
               
                  <QrCodeIcon className="classIcon" />
               
              </Link>
              <Link to="/">
                
                  <ModeIcon className="classIcon" />
                
              </Link>
            </div>
          </Grid>
        </Grid>

        <Grid xs={12} className={classes.cardPart}>
          <div className="cardBilgi">
            <span>
              <h6 className="infoTitle">Kişisel Bilgiler</h6>
            </span>
            <span className="bioBilgileri">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              debitis?
            </span>

            <hr />
            <div>
              <div>
                <span className="KisiBilgileri">İsim Soyisim: </span>
                <span className="secondBilgi">Abdoul Kowyou YACOUBOU</span>
              </div>
              <div>
                <span className="KisiBilgileri">Firma: </span>
                <span className="secondBilgi">Hibritmedya</span>
              </div>
              <div>
                <span className="KisiBilgileri">Pozisyon: </span>
                <span className="secondBilgi">CEO</span>
              </div>
              <div>
                <span className="KisiBilgileri">E-Posta: </span>
                <span className="secondBilgi">abdoul.kowi@hibritmedya.com.tr</span>
              </div>
            </div>
          </div>
        </Grid>
        
       
        <Grid  xs={12} md={12} sm={12}  className={classes.cartPartSocial}>
        <div className="cardBilgi">
            <span>
              <h6 className="infoTitle">Sosyal Medya Bilgileri</h6>
            </span>
          </div>
         
        </Grid>

        <Grid item xs={12} md={12} sm={12}  className={classes.cartPartSocial}>
        <div className="cardBilgi">
            <span>
              <h6 className="infoTitle">Sosyal Medya Bilgileri</h6>
            </span>
          </div>

          <div className="socialDiv" >
              <div className="socialButtonlar">
                <div className="icondiv">
                  <img src={instagram} alt="" className="iconlar" />
                </div>
              </div>
              <div className="socialButtonlar">
                <div className="icondiv">
                  <img src={instagram} alt="" className="iconlar" />
                </div>
              </div>
              <div className="socialButtonlar">
                <div className="icondiv">
                  <img src={addicon} alt="" className="iconlar" />
                </div>
              </div>
            </div>
        </Grid>

        <Grid item xs={12} md={12} sm={12} className={classes.cartPartSocial} >
        <div className="cardBilgi">
            <span>
              <h6 className="infoTitle">Sosyal Medya Bilgileri</h6>
            </span>
          </div>
      
          <div className="socialDiv">
              <div className="socialButtonlar">
                <div className="icondiv">
                  <img src={instagram} alt="" className="iconlar" />
                </div>
              </div>
              <div className="socialButtonlar">
                <div className="icondiv">
                  <img src={instagram} alt="" className="iconlar" />
                </div>
              </div>
              <div className="socialButtonlar">
                <div className="icondiv">
                  <img src={addicon} alt="" className="iconlar" />
                </div>
              </div>
            </div>
        </Grid>

      
       
        
       

        
        
          </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = { logoutUser, uploadImage };

ornekProfil.protoType = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,

  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ornekProfil));

// <Typography variant="body2" align="center">
//             Profile bulunamadı, Lütfen giriş yapınız!!!
//           </Typography>
//           <div className={classes.button}>
//             <Button
//               variant="contained"
//               color="primary"
//               component={Link}
//               to="/girisyap"
//             >
//               GirisYap
//             </Button>

//             <Button
//               variant="contained"
//               color="secondary"
//               component={Link}
//               to="/uyeol"
//             >
//               Üye Ol
//             </Button>
//           </div>





{/* <Grid xs={12} className={classes.DivideIcons}>
          <Grid item xs={4} className={classes.cardPart}>
        <div className="cardBilgi">
            <span>
              <h6 className="infoTitle">Sosyal Medya Bilgileri</h6>
            </span>
          </div>
      
          <div className="socialDiv">
              <div className="socialButtonlar">
                <div className="icondiv">
                  <img src={instagram} alt="" className="iconlar" />
                </div>
              </div>
              <div className="socialButtonlar">
                <div className="icondiv">
                  <img src={instagram} alt="" className="iconlar" />
                </div>
              </div>
              <div className="socialButtonlar">
                <div className="icondiv">
                  <img src={addicon} alt="" className="iconlar" />
                </div>
              </div>
            </div>
            </Grid>
            <Grid item xs={4} className={classes.cardPart}>
        <div className="cardBilgi">
            <span>
              <h6 className="infoTitle">Sosyal Medya Bilgileri</h6>
            </span>
          </div>
      
          <div className="socialDiv">
              <div className="socialButtonlar">
                <div className="icondiv">
                  <img src={instagram} alt="" className="iconlar" />
                </div>
              </div>
              <div className="socialButtonlar">
                <div className="icondiv">
                  <img src={instagram} alt="" className="iconlar" />
                </div>
              </div>
              <div className="socialButtonlar">
                <div className="icondiv">
                  <img src={addicon} alt="" className="iconlar" />
                </div>
              </div>
            </div>
            </Grid>
            <Grid xs={4} item className={classes.cardPart}>
        <div className="cardBilgi">
            <span>
              <h6 className="infoTitle">Sosyal Medya Bilgileri</h6>
            </span>
          </div>
      
          <div className="socialDiv">
              <div className="socialButtonlar">
                <div className="icondiv">
                  <img src={instagram} alt="" className="iconlar" />
                </div>
              </div>
              <div className="socialButtonlar">
                <div className="icondiv">
                  <img src={instagram} alt="" className="iconlar" />
                </div>
              </div>
              <div className="socialButtonlar">
                <div className="icondiv">
                  <img src={addicon} alt="" className="iconlar" />
                </div>
              </div>
            </div>
            </Grid>

          </Grid> */}
