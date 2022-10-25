import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { getUserData } from '../redux/actions/dataActions';
import Scream from '../components/Scream';
import axios from 'axios';
import ProfileSkeleton from "../util/ProfileSkeleton"
import { getIkonlar,getBankaIkonlar,getIletisimIkonlar } from "../redux/actions/dataActions";

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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

//Redux
import { uploadImage, logoutUser } from "../redux/actions/userActions";
import { KeyboardReturn } from "@material-ui/icons";
import { fontSize, padding, textAlign } from "@mui/system";
import StaticProfile from "../components/StaticProfile";
import Girisyap from "./girisyap";
import  { Redirect } from 'react-router-dom'
import UyeolUrlTanim from "./uyeolUrlTanim";
import GirisyapUrlTanim from "./GirisyapUrlTanim";


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
    maxHeight:"330px",
    width:"100%",
    "& .cardBilgi": {
      margin: "30px",
    },
    "& .infoTitle": {
      fontSize: "1rem",
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      letterSpacing: "0.0075em",
    },"& .socialDiv ": {
      
      marginBottom:"30px",
     
      width:"100%",
      height:"170px",
      overflow:"auto",
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
  footerProfile:{
    position: "fixed",
    boxShadow: "0 10px 10px -3px #27272717",
    background:"#fdfdfd",
    bottom:"0px !important",
    padding:"10px",
    "& .footerIcon":{
        textAlign:"center !important",
        alignItems:"center",
        justifyContent:"center"
    }
   
  }
});

class UserTwo extends Component {


    state = {
        profile: null,
        screamIdParam: null,
        userYok:null,
        onLinkiBilgi:null
      };

 
      componentDidMount() {
        const handle = this.props.match.params.userHandle;
        const screamid = this.props.match.params.screamid;
         const screamId = this.props.match.params.userId;
        

    
         if (screamId) this.setState({ screamIdParam: screamId });
    
        this.props.getUserData(handle);


        //get url Tanımlı Linki
        axios
          .get(`/kullanicip/${screamid}`)
          .then((res) => {

            this.setState({
                onLinkiBilgi: res.data
            });
          })
          .catch((err) => {
            console.log(err.response.data)
          }
            );

            //get the profile Info
   
          
          this.props.getIkonlar()
          this.props.getBankaIkonlar()
          this.props.getIletisimIkonlar()

          
      }


  render() {
   
    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state;


    const screamid = this.props.match.params.screamid;

    //const displayNone= this.state.userYok !==null ? "none": ""

    return (
<Grid container style={{width:"100% !important" , height:"100%"}}>
          <Grid item  xs={12}>

          { this.state.onLinkiBilgi===null ? (
            <ProfileSkeleton/>
          ) :  this.state.onLinkiBilgi.onurlLinkiId===undefined ?
           <UyeolUrlTanim  varolanUrl={screamid} history={this.props.history}/>
          :(
             <StaticProfile profile={this.state.onLinkiBilgi} Icons={this.props.data} /> 
          ) }
          </Grid>
</Grid>
      
    );
  }
}

UserTwo.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    getIkonlar:PropTypes.func.isRequired,
    getBankaIkonlar:PropTypes.func.isRequired,
    getIletisimIkonlar:PropTypes.func.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data
  });
  
  export default connect(
    mapStateToProps,
    { getUserData,getIkonlar,getBankaIkonlar,getIletisimIkonlar }
  )(UserTwo);

