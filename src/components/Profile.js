import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import EditDetails from "./EditDetails";
import IconPage from "./IconPage";
import ScreamSkeleton from "../util/ScreamSkeleton";
import {getIkonlar} from "../redux/actions/dataActions";
import {getBankaIkonlar} from "../redux/actions/dataActions";
import {getIletisimIkonlar,getSocialKkonsUrl} from "../redux/actions/dataActions";
import { loginUser } from "../redux/actions/userActions";

import InputAdornment from "@mui/material/InputAdornment";
import { RemoveRedEye } from "@material-ui/icons";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import sitedevam from "../images/devam.jpg"


//MUI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { Grid, IconButton } from "@mui/material";
import EditIcon from "@material-ui/icons/Edit";
import { TextField } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import back1 from "../images/baha2.jpg";
import ShareIcon from '@mui/icons-material/Share';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ModeIcon from '@mui/icons-material/Mode';
import Tooltip from '@mui/material/Tooltip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import instagram from "../images/instagram.png";
import addicon from "../images/add-image.png";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import MyButton from "../util/MyButton";
import ProfileSkeleton from '../util/ProfileSkeleton';

//Icons
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from '@material-ui/icons/Notifications';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import axios from "axios";
import { ExternalLink } from "react-external-link";

//Redux
import { uploadImage, logoutUser } from "../redux/actions/userActions";
import { KeyboardReturn } from "@material-ui/icons";
import { fontSize, padding, textAlign } from "@mui/system";
import SettingPage from "./SettingPage";
import FaturaBilgileri from "./FaturaBilgileri";
import KisiselBilgiler from "./KisiselBilgiler";
import Konlar from "./Konlar";
import BankaKonlar from "./BankaKonlar";
import ContactKons from "./ContactKons";
import FooterHa from "./FooterHa";
import FooterMain from "./FooterMain";
import CloseIcon from '@material-ui/icons/Close';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  middleInfoo:{
    margin:"30px"
  },
  cardBack: {
    textAlign: "center",
    "& .backgroundPart": {
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
        cursor:"pointer"
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
      color: "#0f0f0f",
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
    paddingRight:"20px !important",
  margin:"30px 30px 00px 30px !important",
    height: "100%",
    "& .cardBilgi": {
      margin: "30px",
    },
    "& .infoTitle": {
      fontSize: "1rem",
      fontFamily: "'Poppins', sans-serif;",
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
     
    },
    "& .iconlarr":{
      maxHeight: "50px",
      maxWidth: "50px",
      margin:"0px 5px !important",
      textAlign:"center",
      filter:"saturate(3)"
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
    marginTop:"70px !important",
    marginLeft:"40px !important",
    marginRight:"40px !important",
    height: "100%",
    "& .cardBilgi": {
      margin: "30px",
    },
    "& .infoTitle": {
      fontSize: "1rem",
      fontFamily: "'Poppins', sans-serif",
      letterSpacing: "0.0075em",
    },
    "& .bioBilgileri": {
      fontFamily: "'Poppins', sans-serif;",
      fontSize: "0.875rem",
      opacity: 1,
      color: "#67748e",
      lineHeight: "1.5",
      letterSpacing: "0.02857em",
      fontWeight: "400",
    },
    "& .KisiBilgileri": {
      fontFamily: "'Poppins', sans-serif;",
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

  cardPart1: {
    borderRadius: "10px",
    boxShadow: "0 10px 10px -3px #27272717",
    background:"#fdfdfd",
    marginTop:"30px !important",
    marginRight:"30px !important",
    overflow:"hidden",
    marginLeft:"30px !important",
    height: "100%",
    "& .cardBilgi": {
      margin: "30px",
    },
    "& .infoTitle": {
      fontSize: "1rem",
      fontFamily: "'Poppins', sans-serif",
      letterSpacing: "0.0075em",
    },
    "& .bioBilgileri": {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "0.875rem",
      opacity: 1,
      overflow:"hidden",
      display:"block",
      color: "#272727",
      lineHeight: "1.5",
      letterSpacing: "0.02857em",
      fontWeight: "400",
    },
    "& .KisiBilgileri": {
      fontFamily: "'Poppins', sans-serif",
      color: "#272727",
      fontSize: "0.875rem",
      lineHeight: "1.5",
      fontWeight: 700,
      margin: "0",
      opacity: "1",
    },
    "& .secondBilgi": {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "0.875rem",
      lineHeight: "1.5",
      fontWeight: 400,
      color: "#0f0f0f",
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
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1) !important',
    marginBottom: 20 
},
  cardPart2: {
    borderRadius: "10px",
    boxShadow: "0 10px 10px -3px #27272717",
    background:"#fdfdfd",
    marginTop:"30px !important",
    marginLeft:"30px !important",
    marginRight:"30px !important",
    height: "100%",
    "& .cardBilgi": {
      margin: "30px",
    },
    "& .infoTitle": {
      fontSize: "1rem",
      fontFamily: "'Poppins', sans-serif",
      letterSpacing: "0.0075em",
    },
    "& .bioBilgileri": {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "0.875rem",
      opacity: 1,
      color: "#67748e",
      lineHeight: "1.5",
      letterSpacing: "0.02857em",
      fontWeight: "400",
    },
    "& .KisiBilgileri": {
      fontFamily: "'Poppins', sans-serif",
      color: "#272727",
      fontSize: "0.875rem",
      lineHeight: "1.5",
      fontWeight: 700,
      margin: "0",
      opacity: "1",
    },
    "& .secondBilgi": {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "0.875rem",
      lineHeight: "1.5",
      fontWeight: 400,
      color: "#0f0f0f",
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


  //here for giriş yap
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
    

  //  transform: "skew(-20deg)",
  //   webkitTransform:"skew(-20deg)"

  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    cursor:"pointer",
    marginTop:"10px"
  }
});


class Profile extends Component {


  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      hatalar: {},
      ikonRengi:false,
      passwordIsMasked: true,
      showAllIkonss: false,
      controlCount:0,
      showBankaIkons:false,
      controlBakanCount:0,
      open:false,
      resetEmail:"",
      hatakisigiris:{},
      firstLodOpen:true,

    };
  }

  //Giriş yapma olayı var
  
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.UI.errors) {
  //     this.setState({ errors: nextProps.UI.errors });
  //   }
  // }


  handleFirstLoadClose=()=>{
    this.setState({
      firstLodOpen:false
    })
  }

  //Tüm Ikomnlar Göster
  TumIkonlariGor=()=>{
    this.setState({
      controlCount:this.state.controlCount+1
    })
    if(this.state.controlCount % 2==0){
      this.setState({
        showAllIkonss:true,
      })
    }else{
      this.setState({
        showAllIkonss:false,
      })
    }
  }


  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
      
    this.setState({ open: false });
    
  };
  //Yukarı kısmı gör
  KismiIkonlar=()=>{
    this.setState({
      showAllIkonss:false,
      controlCount:this.state.controlCount+1

    })
  }

  //show some and all banka ikons

  TumBankakonlariGor=()=>{
    this.setState({
      controlBakanCount:this.state.controlBakanCount+1
    })
    if(this.state.controlBakanCount % 2==0){
      this.setState({
        showBankaIkons:true,
      })
    }else{
      this.setState({
        showBankaIkons:false,
      })
    }
  }

  //Yukarı kısmı gör
  KismiBankaIkonlar=()=>{
    this.setState({
      showBankaIkons:false,
      controlBakanCount:this.state.controlBakanCount+1

    })
  }



  componentDidMount(){
    this.props.getIkonlar()
    this.props.getBankaIkonlar()
    this.props.getIletisimIkonlar()

  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.UI.errors) {
    //   this.setState({ errors: nextProps.UI.errors });
    // }

    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if(nextProps.UI.errors==="email yada parola  yanlış"){
      this.setState({parolEmail: nextProps.UI.errors})
    }
    

  }

  //change the icon color
  handleIkonColor=()=>{
    
    this.setState({
      ikonRengi:true
    })
    
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    
    var veriData = {
      email: this.state.email,
      password: this.state.password,
    };
   this.props.loginUser(veriData,this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };



    

parolaChangeArayuz=()=>{

  var veriData={
     email:this.state.resetEmail
   }
 
   axios
   .post("/resetparola",veriData)
   .then((res) => {
     if(this.state.resetEmail!==""){
 
   }
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

    //hidden button show

    handleEditPicture=()=>{
        const fileInput=document.getElementById("imageInput");

        fileInput.click();
    }

    //Logout
    handleLogout=()=>{
        this.props.logoutUser();
        window.location.reload(false);
        
    }

    //check the password
    togglePasswordMask = () => {
      this.setState((prevState) => ({
        passwordIsMasked: !prevState.passwordIsMasked,
      }));
    };


  render() {
//ikon getir



const {
  classes,
  user: {
    credentials:{
      userHandle,
      company,
      position,
      profileUrl,
      bio,
      email,
      nameSurname,
      phoneNumber,
      firmaUnvani,
      backgorundImage,
      location,
      ofisMaili,
      ofistelefonu,
      vergiNumarasi,
      vergidairesi,
      adsoyad,
      geceModu,
      website,
      userId
    },
    
    authenticated,

  }

} = this.props;



const ColorGece= geceModu=="true" ? "black !important" : ""
const colorGece2= geceModu=="true" ? "#0a263e"  : ""

const { errors, hatalar, passwordIsMasked,hatakisigiris} = this.state;


const {socialkonlar, bankaKonlar, iletisimKonlar,loading,
   }=this.props.data

   var onizle=`/${userId}/${userHandle}`

   //kontrol the how many Ikon will get out
   const size=6
    var someIkons=socialkonlar.slice(0, 12)

    let recentcrier1=!loading ? (
      someIkons.map((screm,id)=><Konlar key={screm.ikonId} ikon={screm} idx={id} />
      )
    ) : <ScreamSkeleton/>;
   
    let recentCrier= !loading ? (
      socialkonlar.map((screm,id)=><Konlar key={screm.ikonId} ikon={screm} idx={id} />
      )
    ) : <ScreamSkeleton/>;

//banka ikonlar
var somebankaIkons=bankaKonlar.slice(0,12)

let bankaInfo1=!loading ? (
  somebankaIkons.map((screm,id)=><BankaKonlar key={screm.ikonId} ikon={screm} idx={id} />
  
  )
) : <ScreamSkeleton/>;

    let bankaInfo= !loading ? (
      bankaKonlar.map((screm,id)=><BankaKonlar key={screm.ikonId} ikon={screm} idx={id} />
      
      )
    ) : <ScreamSkeleton/>;

    let contactInfo= !loading ? (
      iletisimKonlar.map((screm,id)=><ContactKons key={screm.ikonId} ikon={screm} idx={id} />
      
      )
    ) : <ScreamSkeleton/>;
    

   
    let profileMarkup = !loading ? (
      authenticated ? (
        <div style={{background : ColorGece}}>
        <Grid container className={classes.profile} xs={12} style={{background : ColorGece}}>
        <Grid className={classes.cardBack} xs={12}>
          <div className="backgroundPart" style={{ backgroundImage: `url(${backgorundImage})`}}>
              <div style={{paddingTop:"-10px !important"}}>
              <h4 className="writeIcon" >Profil</h4>
              </div>
              
          
            <div className="IconButton IconStyle">
             
               
              
              {/* <Link to="/">
                <MyButton tip="Ayar" className="settingButton">
                  <SettingsIcon className="classIcon" />
                </MyButton>
              </Link> */}

{/* <ExternalLink href={onizle}>
<MyButton tip="Bildirim" className="settingButton">
                  <NotificationsIcon className="classIcon" />
                </MyButton>

</ExternalLink> */}
               <Link to={onizle} target="_blank">
                <MyButton tip="Önİzle" className="settingButton">
                  <VisibilityIcon className="classIcon" />
                </MyButton>
              </Link>
              <SettingPage   userHandle={userHandle} openDialog={this.props.openDialog} />
              <Link to="/">
                <MyButton tip="Bildirim" className="settingButton">
                  <NotificationsIcon className="classIcon" />
                </MyButton>
              </Link>
              <MyButton tip="Çıkış Yap" className="settingButton" onClick={this.handleLogout}>
               
               <MeetingRoomIcon className="classIcon"  />
               <span style={{color:"#fdfdfd", fontSize:"15px",paddingLeft:"5px",fontWeight:"700"}}>Çıkış Yap</span> 
               
             </MyButton>
            </div>
          </div>
        </Grid>
        <Grid xs={12} className={classes.profilKismi}>
          <Grid item className={classes.profil}>
            <img
              src={profileUrl}
              alt=""
              className={classes.proimage}
            />

            <div className="titleName">
              <h5 className="isimSoyisim">
              {nameSurname}
                <br />
                <span className="positionpart">@{userHandle}</span>
              </h5>
            </div>
            <div className="ProfilShareButtons">
            
               <Tooltip title="Url Paylaş">
               <ShareIcon className="classIcon"  onClick={() => {
                    navigator.clipboard.writeText( `https://hibritcard/${window.location.pathname}`);
                    
                  }}  style={{display:"none"}}/>
               </Tooltip>
                 

              
              {/* <input type="file" id="imageInput"
              hidden="hidden"
              onChange={this.handleImageChange} /> */}
              <Link to="/">
               
                  <QrCodeIcon className="classIcon" style={{display:"none"}} / >
               
              </Link>
             
                {/* <Tooltip title="profil değiştir" placement="top">
                <ModeIcon className="classIcon" onClick={this.handleEditPicture} />
                </Tooltip> */}
                  
                
              
            </div>
          </Grid>
        </Grid>

        <Grid container >

          <Grid xs={12} md={6} sm={6} >
            <Grid container>
            <Grid item  xs={12} sm={12} md={12} style={{background: colorGece2}} className={classes.cardPart1}>
              <KisiselBilgiler/>
              <div className="cardBilgi">
            <span>
              <h6 className="infoTitle">Kişisel Bilgiler</h6>
            </span>
            <hr  className={classes.visibleSeparator} />
            <div style={{overflow:"hidden "}}>
            <span className="bioBilgileri">
             {bio}
            </span>
            </div>
           
            <div>
              <div>
                <span className="KisiBilgileri">İsim Soyisim: </span>
                <span className="secondBilgi">{nameSurname}</span>
              </div>
              <div>
                <span className="KisiBilgileri">Web Site: </span>
                <span className="secondBilgi">{website}</span>
              </div>
              <div>
                <span className="KisiBilgileri">Pozisyon: </span>
                <span className="secondBilgi">{position}</span>
              </div>
              <div>
                <span className="KisiBilgileri">Şirket: </span>
                <span className="secondBilgi">{company}</span>
              </div>
              <div>
                <span className="KisiBilgileri">Telefon: </span>
                <span className="secondBilgi">{phoneNumber}</span>
              </div>
            </div>
          </div>
              </Grid>  

            </Grid>

          </Grid>

          <Grid xs={12} md={6} sm={6}>
            <Grid container>
            <Grid item  xs={12} sm={12} md={12} style={{background: colorGece2}} className={classes.cardPart2}>
              <FaturaBilgileri/>
              <div className="cardBilgi">
            <span>
              <h6 className="infoTitle">Fatura Bilgileri</h6>
            </span>
            <hr  className={classes.visibleSeparator} />
            <div>
              <div>
                <span className="KisiBilgileri">Vergi Numarası: </span>
                <span className="secondBilgi">{vergiNumarasi}</span>
              </div>
              <div>
                <span className="KisiBilgileri">Vergi Dairesi: </span>
                <span className="secondBilgi">{vergidairesi}</span>
              </div>
              <div>
                <span className="KisiBilgileri">Firma Ünvanı: </span>
                <span className="secondBilgi">{firmaUnvani}</span>
              </div>
              <div>
                <span className="KisiBilgileri">Ofis E-posta: </span>
                <span className="secondBilgi">{ofisMaili}</span>
              </div>
              <div>
                <span className="KisiBilgileri">Telefon: </span>
                <span className="secondBilgi">{ofistelefonu}</span>
              </div>
              <div>
                <span className="KisiBilgileri">Adres: </span>
                <span className="secondBilgi">{location}</span>
              </div>
            </div>
          </div>
              </Grid>  

            </Grid>

          </Grid>   

        </Grid>
       
        <Grid item xs={12} md={12} sm={12} style={{background: colorGece2}} className={classes.cartPartSocial}>
        <div className="cardBilgi">
            <span>
              <h6 className="infoTitle">Sosyal Medya Bilgileri</h6>
            </span>
           
          </div>
          <Grid container>

            {this.state.showAllIkonss ? recentCrier : recentcrier1}
          
          </Grid>

          <Grid container  style={{textAlign:"right", justifyContent:"right" }}>

<Button  onClick={this.TumIkonlariGor} mr={5} style={{marginRight:"100px !important" , minHeight:"60px !important"}}>

{!this.state.showAllIkonss ? <ExpandMoreIcon className="classIcon" /> : <KeyboardArrowUpIcon className="classIcon" />}
</Button>
          </Grid>
      
        </Grid>

        <Grid item xs={12} md={12} sm={12} style={{background: colorGece2}}  className={classes.cartPartSocial}>
        <div className="cardBilgi">
            <span>
              <h6 className="infoTitle">Banka Bilgileri</h6>
            </span>
          </div>
      <Grid container>

      {this.state.showBankaIkons ? bankaInfo : bankaInfo1}

      </Grid>
      <Grid container style={{textAlign:"right", justifyContent:"right"}}>

<Button  onClick={this.TumBankakonlariGor} style={{marginRight:"100px !important" , minHeight:"60px !important"}}>

{!this.state.showBankaIkons ? <ExpandMoreIcon className="classIcon" /> : <KeyboardArrowUpIcon className="classIcon" />}
</Button>
          </Grid>
            
        </Grid>

        <Grid item xs={12} md={12} sm={12}  style={{background: colorGece2  }} className={classes.cartPartSocial }>

        <div className="cardBilgi">
            <span>
              <h6 className="infoTitle">İletişim Bilgileri </h6>
            </span>
          </div>
      
          <Grid container>
          {contactInfo}
          </Grid>
        </Grid>

          </Grid>
           <FooterHa/>

           <Dialog
          open={this.state.firstLodOpen}
          onClose={this.handleFirstLoadClose}
          fullWidth
          maxWidth="sm"  style={{ background:"red !important" ,color:"white"}}>

          
            <CloseIcon onClick={this.handleFirstLoadClose} className={classes.closeButton}/>
          

   <DialogTitle>
       Hoşgeldiniz.
   </DialogTitle>
   <DialogContent className={classes.dialogContent}>
     <Grid container>
       <Grid item >
         <span>Website Geliştirmesi devam etmektedir. Sorun yaşıyorsanız, Ekibimizle iletime geçiniz!</span><br /><br />
<img src={sitedevam} alt="" style={{width:"100%"}} />
       </Grid>

     </Grid>
   </DialogContent>

          </Dialog>

           </div>
      ) : (
        <Grid container className={classes.form} marginTop={{xs:"30%" , md:"0" , sm:"0" , lg:"0"}} >
      <Grid item xs={12} sm={4} md={5} className={classes.middleStuf}>

      <Grid container paddingLeft={{xs:"20px" , md:"0" , sm:"0" , lg:"0"}} paddingRight={{xs:"20px" , md:"0" , sm:"0" , lg:"0"}}>
        
        <Grid item xs={12} sm={12} md={12} margin={{xs:"0" , md:"100px" , sm:"0" , lg:"100px"}}>
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
      )
    ) : (
      // <p>Yükleniyor...</p>
      <ProfileSkeleton />
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  data:state.data,
  UI: state.UI
});
const mapActionsToProps= {logoutUser, 
  uploadImage,getIkonlar,getBankaIkonlar,
  getIletisimIkonlar,
  loginUser
}

Profile.protoType = {
  getIkonlar:PropTypes.func.isRequired,
  getIletisimIkonlar:PropTypes.func.isRequired,
  getBankaIkonlar:PropTypes.func.isRequired,
  data:PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog:PropTypes.bool,
  openHere:PropTypes.bool,
  loginUser:PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Profile));