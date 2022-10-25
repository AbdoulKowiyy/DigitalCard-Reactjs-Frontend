import React, { Component, Fragment, useState,useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { getUserData } from '../redux/actions/dataActions';


// logo will b here
import drlogo from "../images/hibri.jpg"

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
import DescriptionIcon from '@mui/icons-material/Description';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import back1 from "../images/baha2.jpg";


//import Dialog from '@material-ui/core/Dialog';
import { makeStyles, Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
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


//Flag
//import { Us } from "react-flags-select";
import ReactFlagsSelect from "react-flags-select";

//import qrCode
import QRCode from "qrcode";

//Redux
import { uploadImage, logoutUser } from "../redux/actions/userActions";
import { KeyboardReturn } from "@material-ui/icons";
import { fontSize, padding, textAlign } from "@mui/system";
import StaticSocialKonlar from "./StaticSocialKonlar";
import StaticBankaKonlar from "./StaticBankaKonlar";
import StaticContactKonlar from "./StaticContactKonlar";
import StaticKaydetButton from "./StaticKaydetButton";

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
      height: "20vh",
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
    paddingLeft:"10px",
    paddingTop:"30px",
    paddingRight:"10px",
    
    
    

    
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
      marginTop:"-20px"
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
    maxHeight:"180px",
    margin: "0px 30px",
    marginTop: "-95px !important",
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
   position:"relative",
  margin:"30px 30px 30px 30px !important",
  // height:"40vh !important",
  // minHeight:"200px",
  overflow:"hidden !important",
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
      // marginBottom:"50px", 
      // overflow:"auto",
      // height:"24vh",
      // minHeight:"50px"
      //height:"24vh"
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
   position: "sticky",
  right: "0px",
  bottom: "0px !important",
  left: "0px",
    boxShadow: "0 10px 10px -3px #27272717",
    background:"#fdfdfd",
    padding:"10px",
    borderRadius:"10px",
  
   
    "& .footerIcon":{
        textAlign:"center !important",
        alignItems:"center",
        justifyContent:"center",
        margin:"auto"
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

  const [onlySocial,setonlySocial]=useState(false)

  const [openFatura,setopenFatura]=useState(false)
  const [openQr, setopenQr]=useState(false)
  const [openBankDialog,setopenBankDialog]=useState(false)

  const [selected, setSelected] = useState("TR");

  const [src, setSrc]= useState("");


  useEffect(()=>{
    QRCode.toDataURL("http://localhost:3001/#/Koyx1rvI7QSXiRuIWmXMpLQyMo12/abdoul2026").then((data)=>{
      setSrc(data);
    }) 
  },[])


  useEffect(() => {
    // your code here
    setDefaultData(recentCrier)
    window.scrollTo(1000, 1000)
 }, [])
    
  
 const handleOpen=()=>{
  setopenFatura(true)

  }

  const handleOpenQr=()=>{
    setopenQr(true)
  }

 const handleOpenBankDialog=()=>{
    setopenBankDialog(true)
  }

  const handleCloseBankDialog=()=>{
    setopenBankDialog(false)
  }

  const handleCloaseQr=()=>{
    setopenQr(false)
  }

  

  const handlecloseFatura=()=>{
    setopenFatura(false)
  }


  const notify = () =>{
    toast("Sayfa Linki Kopyalandı ", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  }

 const SocialKismigetir=()=>{
  setDefaultData(recentCrier)
  setdefaultStaticYazi("Sosyal Medya Bilgileri")
  setonlySocial(true)
  }

  const BankaKismiGetir=()=>{
setDefaultData(bankaInfoKons)
setdefaultStaticYazi("Banka Bilgileri")
setonlySocial(true)
    }

    const contactKismiGetir=()=>{
      setonlySocial(true)
    setDefaultData(contactsInfoKons)
    setdefaultStaticYazi("İletişim Bilgileri")
      }

     const CreateVCard = () => {

        var vCardsJS = require('vcards-js');
            //create a new vCard
            var vCard = vCardsJS();
            //set properties
            vCard.firstName = this.props.nameAndSoayd;
            // vCard.middleName = 'J';
            // vCard.lastName = 'Nesser';
            //vCard.organization = this.props.sirketBu;
            // vCard.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 
            vCard.photo.attachFromUrl('https://hibritcard.com/assets/img/Logo_32x32.png', 'PNG');
            vCard.organization = this.props.sirketBu;
        //'JPEG');
            vCard.workPhone = this.state.urlHere;
            // vCard.birthday = new Date(1985, 0, 1);
            vCard.title = this.props.titlePer;
            vCard.url = `https://panel.hibritcard.com/#/${this.props.userIdd}/${this.state.userAdBir}`;
            vCard.note = '* Hibrit Card yeni nesil Dijital Kartvizit! *';
            //save to file
           // vCard.saveToFile('./eric-nesser.vcf');
    
             
            //get as formatted string
            //console.log(vCard.getFormattedString());
            const FileSaver = require('file-saver');
    const blob = new Blob([ vCard.getFormattedString() ], {type: "text/vcard;charset=utf-8"});
    
    FileSaver.saveAs(blob, `${this.props.nameAndSoayd}.vcf`);
    
        };
    

  
 
    const {
        classes,
        profile: {  userHandle,
            company,
            position,
            profileUrl,
            bio,
            email,
            userId,
            nameSurname,
            phoneNumber,
            firmaUnvani,
            backgorundImage,
            location,
            ofisMaili,
            geceModu,
            profilKapa,
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

      const ColorGece= geceModu=="true" ? "black" : ""
      const colorGece2= geceModu=="true" ? "#0a263e"  : ""
      const profildurumu= profilKapa=="kapali" ? "none" : ""


      let recentCrier= !loading ? (
        socialkonlar.map((screm,id)=><StaticSocialKonlar key={screm.ikonId} ikon={screm} idx={id} person={userHandle}/>
        
        )
      ) : ( <p> Bir Hata Oluştu. Internetinizi Kontrol edin ve yenileyin.!</p> );

      let bankaInfoKons= !loading ? (
        bankaKonlar.map((screm,id)=><StaticBankaKonlar key={screm.ikonId} ikon={screm} idx={id} person={userHandle}/>
        )
      ) : ( <p>Bir Hata Oluştu. Internetinizi Kontrol edin ve yenileyin.!</p> );


      let contactsInfoKons= !loading ? (
        iletisimKonlar.map((screm,id)=><StaticContactKonlar key={screm.ikonId} ikon={screm} idx={id} 
        person={userHandle} nameAndSoayd={nameSurname} profilGet={profileUrl}
        titlePer={position}
        sirketBu={company}
        userIdd={userId}
        />
        )
      ) : ( <p>Bir Hata Oluştu. Internetinizi Kontrol edin ve yenileyin.!</p> );

      let contactButtonKaydet= !loading ? (
        iletisimKonlar.map((screm,id)=><StaticKaydetButton key={screm.ikonId} ikon={screm} idx={id} 
        person={userHandle} nameAndSoayd={nameSurname} profilGet={profileUrl}
        titlePer={position}
        sirketBu={company}
        userIdd={userId}
        />
        )
      ) : ( <p>Bir Hata var</p> );

    return (

        <div style={{ height:"100%"}} >

<Grid container className={classes.profile} xs={12} style={{width:"100% !important" , background : ColorGece , height:"100%"}} >
        <Grid className={classes.cardBack} xs={12} style={{width:"100% !important"}}>
          <div className="backgroundPart" style={{ backgroundImage: `url(${backgorundImage})`}} >
           
              {/* <div style={{paddingTop:"-10px !important"}}>
              <h4 className="writeIcon" >Profil</h4>
              </div> */}
              
          
            <div className="IconButton IconStyle">
              
               

                  {/* <NotificationsIcon className="classIcon" /> */}
                  {/* <div>
    <Us /> ENG
  </div> */}

<ReactFlagsSelect

countries={["US", "FR", "DE", "IT", "TR"]}
customLabels={{ US: "EN", FR: "FR", DE: "DE", IT: "IT", TR:"TR" }}
placeholder="Select Language"
    selected={selected}
    onSelect={(code) => setSelected(code)}
  />

              
            </div>
          </div>
        </Grid>
        <Grid xs={12} className={classes.profilKismi} style={{ display: profildurumu}}>

          <Grid item className={classes.profil}>
            <img
              src={profileUrl}
              alt="HibritMedya"
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
               
                  {/* <ShareIcon className="classIcon" onClick={(e) => {
                    navigator.clipboard.writeText( `https://panel.hibritcard.com/#/${window.location.pathname}`);
                    notify()
                  }}/>

<DescriptionIcon className="classIcon"  onClick={handleOpen}/>
              
                  <QrCodeIcon className="classIcon"  style={{display:"none"}}/> */}
               
              
            </div>
          </Grid>
        </Grid>

        

        <Grid item xs={12} md={12} sm={12}  className={classes.cartPartSocial}
          // marginLeft={{xs:"5px !important", md:"30px !important", sm:"30px !important", lg:"30px !important" }}
          // marginRight={{xs:"5px !important", md:"30px !important", sm:"30px !important", lg:"30px !important" }}
          style={{ display: profildurumu}}
          >
        <div className="cardBilgi" >
            <span>

            {/* <h6 className="infoTitle">  {defaultStaticYazi}</h6> */}
              <h6 className="infoTitle">İletişim Bilgileri</h6>
            </span>
          </div>
          <div className="socialDiv" >
          <Grid container >
            {/* {  !onlySocial ? recentCrier : ""} */}

              {/* { onlySocial ? defaultDta : recentCrier } */}
              {contactsInfoKons }
             
</Grid>
             
            </div>


            {/* new social Bilgileri start from here */}

            <div className="cardBilgi" >
            <span>

            {/* <h6 className="infoTitle">  {defaultStaticYazi}</h6> */}
              <h6 className="infoTitle">Sosyal Medya Bilgileri</h6>
            </span>
          </div>
          <div className="socialDiv" >
          <Grid container >
            {/* {  !onlySocial ? recentCrier : ""} */}
              {/* { onlySocial ? defaultDta : recentCrier } */}
              {recentCrier}
             
</Grid>
             
            </div>


            <Dialog
          open={profilKapa=="kapali"}
          fullWidth
          maxWidth="sm">
   <DialogContent>
         <h6>Gizli Profil :)</h6>
   </DialogContent>

          </Dialog>

          <Dialog
          open={openFatura}
          onClose={handlecloseFatura}
          fullWidth
          maxWidth="sm"
        >
          <CloseIcon onClick={handlecloseFatura} className={classes.closeButton}/>

          <DialogTitle style={{ textAlign:"center" , justifyContent:"center" }}>Fatura Bilgileri </DialogTitle>{" "}
          <DialogContent style={{padding:"50px" }}>
            <form >
            <hr className={classes.visibleSeparator}/>
              <Grid container >
                <Grid xs={12} >
                <Typography variant="h6" className={classes.pageTitle}>
                  Vergi Numarası: &ensp;<span className={classes.spanelenmment}>{vergiNumarasi}</span>
                </Typography>
                </Grid>
                <Grid xs={12} >

                
                 
                 
                </Grid>
                <Grid xs={12} >
                <Typography variant="h6" className={classes.pageTitle}>
                Vergi Dairesi: &ensp;<span className={classes.spanelenmment}>{vergidairesi}</span>
                </Typography>
                  
                  
                </Grid>
                <Grid xs={12} >

                <Typography variant="h6" className={classes.pageTitle}>
                Firma Ünvanı: &ensp;<span className={classes.spanelenmment}>{firmaUnvani}</span>
                </Typography>
                </Grid>

                <Grid xs={12} mb={5}>

                <Typography variant="h6" className={classes.pageTitle}>
                Adres: &ensp;<span className={classes.spanelenmment}>{location}</span>
                </Typography>
                </Grid>
              </Grid>

              <Grid style={{ textAlign:"center" , justifyContent:"center"}}>
                {/* <Button style={{
        borderRadius: 5,
        backgroundColor: "#21b6ae",
        
    }}
    variant="contained" onClick={() => {
      navigator.clipboard.writeText( ibanBilgi);
      notify();
    }}>
                  Ibanı Kopyala
                </Button> */}
              </Grid>
            </form>{" "}
            
          </DialogContent>{" "}
          {/* <DialogActions>
                       <Button onClick={this.handleClose} color="primary">
                           İptal
                       </Button>
                       <Button onClick={this.handleSubmit} color="primary">
                           Ekle
                       </Button>
                   </DialogActions> */}
        </Dialog>

        {/* here you have the qr code of anything */}

        <Dialog
          open={openQr}
        
          sx={{
            '& .MuiDialog-container':{
              justifyContent:'flex-start',
              alignItems:'flex-start'
            }
          }}
          
          // PaperProps={{
          //   sx:{
          //     width:"30%", height:"100%", position:"fixed", top:10, left:10, m:0
          //   }
          // }}
        >
          <CloseIcon onClick={handleCloaseQr} className={classes.closeButton}/>

          <DialogTitle style={{ textAlign:"center" , justifyContent:"center" }}>QR Kod </DialogTitle>{" "}
          <hr className={classes.visibleSeparator}/>
          <DialogContent style={{padding:"50px" }}>
            <form >
            <div>
            <img src={src} alt="HibritCard QR" style={{ }}/>
            <img src={drlogo} alt="" style={{position:"absolute", width:"50px" , height:"50px", marginTop:"50px", marginLeft:"-100px"}}/>  
            </div>

           
            </form>{" "}
            
          </DialogContent>{" "}
          
        </Dialog>

        {/* here will be the diaolog for the  bank */}

        <Dialog
          open={openBankDialog}
          
          // PaperProps={{
          //   sx:{
          //     width:"30%", height:"100%", position:"fixed", top:10, left:10, m:0
          //   }
          // }}
        >
          <CloseIcon onClick={handleCloseBankDialog} className={classes.closeButton}/>

          <DialogTitle style={{ textAlign:"center" , justifyContent:"center" }}>Banka Bilgileri</DialogTitle>{" "}
          <hr className={classes.visibleSeparator}/>
          <DialogContent style={{padding:"50px" }}>
            <form >
            <div>
            <div className="socialDiv" >
          <Grid container >
            {/* {  !onlySocial ? recentCrier : ""} */}

              {/* { onlySocial ? defaultDta : recentCrier } */}
              { defaultDta}
             
</Grid>
             
            </div>
            </div>

           
            </form>{" "}
            
          </DialogContent>{" "}
          
        </Dialog>

  
        </Grid>
          </Grid>

         
          <Grid className={classes.footerProfile} container xs={12} sm={12} md={12} lg={12} >
                <Grid item xs={6} md={6} sm={6} lg={6} className="footerIcon" >
                <div  className={classes.footerIkons}>
                {/* <ThumbUpIcon className="classIcon" /><br /> */}
                
                {contactButtonKaydet}
                </div>
                </Grid>
                {/* <Grid  item xs={4} md={4} sm={4}  lg={4} className="footerIcon">
                <div onClick={() => BankaKismiGetir()} className={classes.footerIkons}>
                <AccountBalanceIcon className="classIcon" /><br />
                  <span>Banka</span>
                </div>
                </Grid> */}
                <Grid  item xs={6} md={6} sm={6} lg={6} className="footerIcon">
<Grid container>
  <Grid xs={3} sm={3} md={3} lg={3}>
    <Button>
    <AccountBalanceIcon className="classIcon"   onClick={() => {BankaKismiGetir();handleOpenBankDialog();}}/>
    </Button>
     
     
  </Grid>

  <Grid xs={3} sm={3} md={3} lg={3}>
     <Button>
     <ShareIcon className="classIcon" onClick={(e) => {
                    navigator.clipboard.writeText( `https://panel.hibritcard.com/#/${window.location.pathname}`);
                    notify()
                  }}/>
     </Button>
  </Grid>

  <Grid xs={3} sm={3} md={3} lg={3}>
  <Button onClick={handleOpenQr}>
  <QrCodeIcon className="classIcon" />
     </Button>
  </Grid>

  <Grid xs={3} sm={3} md={3} lg={3}>
  <Button>
  <DescriptionIcon className="classIcon"  onClick={handleOpen} />
     </Button>
  </Grid>

</Grid>

                {/* <div onClick={() => contactKismiGetir()} className={classes.footerIkons}>
                <LocalPhoneIcon className="classIcon" /><br />
                  <span>İletişim</span>
                </div> */}
                </Grid>
            </Grid>



            <ToastContainer style={{ marginRight:"15px !important",paddingLeft:"20px", paddingRight:"20px"}}/>
        </div>
      
    );
  
}

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);


