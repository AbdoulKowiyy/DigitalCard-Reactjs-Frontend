import React, { Component, Fragment, useState,useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { getUserData } from '../redux/actions/dataActions';


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
import back1 from "../images/baha2.jpg";

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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

//Redux
import { uploadImage, logoutUser } from "../redux/actions/userActions";
import { KeyboardReturn } from "@material-ui/icons";
import { fontSize, padding, textAlign } from "@mui/system";
import StaticSocialKonlar from "./StaticSocialKonlar";
import StaticBankaKonlar from "./StaticBankaKonlar";
import StaticContactKonlar from "./StaticContactKonlar";

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
        color:"#272727",
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
      color: "#272727",
    },
    "& .positionpart": {
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      color: "#272727",
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
  margin:"30px 30px 30px 30px !important",
    // maxHeight:"330px",
    marginTop:"30px !important",
    marginBottom:"30px !important",
    
    "& .cardBilgi": {
      margin: "30px",
    },
    "& .infoTitle": {
      fontSize: "1rem",
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      letterSpacing: "0.0075em",
    },"& .socialDiv ": {
      marginBottom:"30px", 
      overflow:"auto",
      height:"100% !important"
    },
    "& .icondiv": {
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
  footerProfile:{
     position: "absolute",
  right: "0px",
  bottom: "0px",
  left: "0px",
    boxShadow: "0 10px 10px -3px #27272717",
    background:"#fdfdfd",
    padding:"10px",
    borderRadius:"10px",
   
    "& .footerIcon":{
        textAlign:"center !important",
        alignItems:"center",
        justifyContent:"center"
    }
   
  },
  footerIkons:{
    cursor:"pointer"
  }
});

const StaticProfile=(props)=> {

  const [socailpart,setSocailPart]= useState(false)
  const [bankapart,setBankaPart]= useState(false)
  const [contactpart,setContactPart]= useState(false)

  const [socialTiklaCount,setSocialTiklaCount]= useState(0)
  const [bankaTiklaCount,setBankaTiklaCount]= useState(0)
  const [contactTiklaCount,setContactTiklaCount]= useState(0)

  const [defaultDta,setDefaultData]=useState()
  const [ defaultStaticYazi,setdefaultStaticYazi]=useState("Sosyal Medya Bilgileri")


  useEffect(() => {
    // your code here
    setDefaultData(recentCrier)
 }, [])
    
  


 const SocialKismigetir=()=>{

  setDefaultData(recentCrier)
  setdefaultStaticYazi("Sosyal Medya Bilgileri")
  }

  const BankaKismiGetir=()=>{
    


setDefaultData(bankaInfoKons)
setdefaultStaticYazi("Banka Bilgileri")
    }

    const contactKismiGetir=()=>{
    

    setDefaultData(contactsInfoKons)
    setdefaultStaticYazi("İletişim Bilgileri")
      }

  
 
    const {
        classes,
        profile: {  userHandle,
            company,
            position,
            profileUrl,
            bio,
            email,
            nameSurname,
            phoneNumber,
            firmaUnvani,
            location,
            ofisMaili,
            ofistelefonu,
            vergiNumarasi,
            vergidairesi,
            adsoyad,
            website,
            allname, },

            Icons:{
                socialkonlar, bankaKonlar, loading, iletisimKonlar
            }
      } = props;

     


      let recentCrier= !loading ? (
        socialkonlar.map((screm,id)=><StaticSocialKonlar key={screm.ikonId} ikon={screm} idx={id} person={userHandle}/>
        
        )
      ) : ( <p> İkonunuz Bulunmamaktadır...</p> );

      let bankaInfoKons= !loading ? (
        bankaKonlar.map((screm,id)=><StaticBankaKonlar key={screm.ikonId} ikon={screm} idx={id} person={userHandle}/>
        )
      ) : ( <p>İkonunuz Bulunmamaktadır...</p> );


      let contactsInfoKons= !loading ? (
        iletisimKonlar.map((screm,id)=><StaticContactKonlar key={screm.ikonId} ikon={screm} idx={id} person={userHandle}/>
        )
      ) : ( <p>İkonunuz Bulunmamaktadır...</p> );

    return (

        <div>

<Grid container className={classes.profile} xs={12} style={{width:"100% !important"}}>
        <Grid className={classes.cardBack} xs={12} style={{width:"100% !important"}}>
          <div className="backgroundPart" >
           
              {/* <div style={{paddingTop:"-10px !important"}}>
              <h4 className="writeIcon" >Profil</h4>
              </div> */}
              
          
            {/* <div className="IconButton IconStyle">
              <Link to="/">
                <MyButton tip="Bildirim" className="settingButton">
                  <NotificationsIcon className="classIcon" />
                </MyButton>
              </Link>
            </div> */}
          </div>
        </Grid>
        <Grid xs={12} className={classes.profilKismi}>
          <Grid item className={classes.profil}>
            <img
              src={profileUrl}
              alt="HibrtMedya"
              className={classes.proimage}
            />

            <div className="titleName">
              <h5 className="isimSoyisim">
                {nameSurname}
                <br />
                <span className="positionpart">{company} / {position}</span>
              </h5>
            </div>
            <div className="ProfilShareButtons">
               
                  <ShareIcon className="classIcon"  onClick={() => {
                    navigator.clipboard.writeText( `https://hibritcard/${window.location.pathname}`);
                  }} />
              
                  <QrCodeIcon className="classIcon" />
               
              
            </div>
          </Grid>
        </Grid>

        

        <Grid item xs={12} md={12} sm={12}  className={classes.cartPartSocial}
          // marginLeft={{xs:"5px !important", md:"30px !important", sm:"30px !important", lg:"30px !important" }}
          // marginRight={{xs:"5px !important", md:"30px !important", sm:"30px !important", lg:"30px !important" }}
          >
        <div className="cardBilgi" >
            <span>
              <h6 className="infoTitle">  {defaultStaticYazi}</h6>
            </span>
          </div>
          <div className="socialDiv" >
          <Grid container >
              {defaultDta}
             
</Grid>
             
            </div>
        </Grid>


       

        
          </Grid>

          <Grid className={classes.footerProfile} container xs={12} sm={12} md={12} lg={12}>
                <Grid item xs={4} md={4} sm={4} lg={4} className="footerIcon" >
                <div onClick={() => SocialKismigetir()} className={classes.footerIkons}>
                <ThumbUpIcon className="classIcon" /><br />
                  <span>Social</span>
                </div>
                </Grid>
                <Grid  item xs={4} md={4} sm={4}  lg={4} className="footerIcon">
                <div onClick={() => BankaKismiGetir()} className={classes.footerIkons}>
                <AccountBalanceIcon className="classIcon" /><br />
                  <span>Banka</span>
                </div>
                </Grid>
                <Grid  item xs={4} md={4} sm={4} lg={4} className="footerIcon">
                <div onClick={() => contactKismiGetir()} className={classes.footerIkons}>
                <LocalPhoneIcon className="classIcon" /><br />
                  <span>iletişim</span>
                </div>
                </Grid>
            </Grid>


        
        </div>
      
    );
  
}

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);


