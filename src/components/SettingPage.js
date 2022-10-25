import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {getUserData} from "../redux/actions/userActions"
import { uploadImage,uploadBackgroundImage} from "../redux/actions/userActions";
import ModeIcon from '@mui/icons-material/Mode';

//muı stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from "@mui/icons-material/Settings";
import MyButton from "../util/MyButton";
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {  clearErrors } from '../redux/actions/dataActions';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';


//Redux
import {connect} from "react-redux"
import {geceModuna,hesapSilAll,profilKapa} from "../redux/actions/userActions"
import { IconButton, Tooltip } from "@mui/material";
import ChatIcon from '@material-ui/icons/Chat';


const styles= (theme)=>({
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff'
        }
    },
    profileImage: {
        objectFit: "cover",
        width: "90px",
        height:"80px",
        borderRadius: "20%",
        cursor:"pointer",
        transition:".3s",
        position:"relative",
        display:"flex",
        margin:"auto",
        
        "&:hover":{
          opacity: "0.3",
          transition:".3s",
           
        },

       
      },

      kalemPart:{
        opacity:"1",
        display: "flex !important",
    position: "relative",
    alignItems: "center",
    margin: "auto",
    marginTop:"-50px",
    transition:".3s",
    color:"white"

      },

     
    typography: {
        useNextVariants: true
    },
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative',
        float: "right"
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    publicSwitch:{
       margin:"22px"
    },
    publicSwitchInside:{
        marginLeft:"10px"
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        cursor:"pointer",
        marginTop:"10px"
      },
      dialogContent: {
        padding: 20
      },
      textField: {
        margin: "3px",
    
      },
     
})

class SettingPage extends Component {

state={
    bio:"",
    website:"",
    location:"",
    company:"",
    position:"",
    phoneNumber:"",
    open:false,
    confirmOpen:false,
    age:"",
    gilad: false,
    oldPath: '',
    newPath: '',
    geceTime:"true",
    geceModu:false,
    profilKapa:"",
    profileKapali:false,
    ackapaChange:false
};

componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

handleDropChange=(e)=>{
    this.setState({
     age:e.target.value
    })

   

     

        const userDetails={
          profilKapa:e.target.value
         }
      
         console.log("hee:",e.target.value)
      
         this.props.profilKapa(userDetails)
      

} 

// handleClickAcik=()=>{

// if(this.state.age ==="acik"){
// this.setState({
//   profilKapa:"acik"
// })
// }
// }
// handleClickKapat=()=>{

//   this.setState({
//     profileKapali:false,
//   })
// }

handleSenddataProfil=()=>{

  const userDetails={
    profilKapa:this.state.profilKapa
   }

   console.log("hee:",this.state.profilKapa)

   this.props.profilKapa(userDetails)

}

handleCheckChange=(event)=>{
    this.setState({
        gilad:true,
        [event.target.name]: event.target.checked,
    })
    if(this.state.gilad){
      this.setState({
        geceTime:"true"
      })
    }else{
      this.setState({
        geceTime:"false"
      })
    }

    const userDetails={
      geceModu:this.state.geceTime,
    };
    this.props.geceModuna(userDetails);

    
}

handleconfirmOpen=()=>{
  this.setState({
    confirmOpen:true,
  })
}

handleconfirmOpenClose=()=>{
  this.setState({
    confirmOpen:false
  })
}

handleOpen=()=>{
   
    //when the widow open change Url
    let oldPath = window.location.pathname;
 
    const { userHandle, userId } = this.props;
    const newPath = `/kullanici/${userHandle}/setting`;

    if (oldPath === newPath) {
      oldPath = `/`
    }

    window.history.pushState(null, null, newPath);
   
    //when it closee return  to ex url

    this.setState({ open: true, oldPath, newPath });

   //this.setState({ open: true, });
    // this.mapUserDetailsToState(this.props.credentials)

}

// componentDidMount(){
//     const {credentials}= this.props;
//     this.mapUserDetailsToState(credentials)
    
// }

handleClose=()=>{
  window.history.pushState(null, null, this.state.oldPath);
    this.setState({open:false})
    this.props.clearErrors();
}


// bilgiler ayarı
// mapUserDetailsToState=(credentials)=>{

//     this.setState({
//         bio:credentials.bio ? credentials.bio :"",
//         website: credentials.website? credentials.website:"",
//         location: credentials.location ? credentials.location: "",
//         company: credentials.company ? credentials.company: "",
//         position: credentials.position ? credentials.position: "",
//         phoneNumber: credentials.phoneNumber ? credentials.position: ""
//     });

// }

handleEditPicture=()=>{
  const fileInput=document.getElementById("imageInput");
  fileInput.click();
}

handleEditBakgound=()=>{
  const fileInput=document.getElementById("imageInputtback");
  fileInput.click();
}

//Background Image
handleBackgroundImage=(event)=>{

  const image=event.target.files[0];
  const formData=new FormData();
  formData.append("image",image,image.name);

  this.props.uploadBackgroundImage(formData)
  

}

//upload image

handleImageChange=(event)=>{
  const image=event.target.files[0];
  const formData=new FormData();
  formData.append("image",image,image.name);
  this.props.uploadImage(formData)
      }

handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };


  handleSubmitGece=()=>{
    const userDetails={
      geceModu:this.state.geceTime,
    };
    this.props.geceModuna(userDetails);
}

reloadPage=()=>{
  window.location.reload(false);
}


//not reload the page
handleSubmitSil=()=>{
  this.props.hesapSilAll();
  this.handleconfirmOpenClose();
}



  //handle submit için, boş gödermemesi lazım. bilgi güncellem için.
  // handleSubmit=()=>{
  //     const userDetails={
  //         bio:this.state.bio,
  //         website: this.state.website,
  //         location: this.state.location,
  //         company: this.state.company,
  //         position: this.state.position,
  //         phoneNumber: this.state.phoneNumber
  //     };
  //     this.props.editUserDetails(userDetails);
  //     this.handleClose()
  // }



  render() {
    
    const {
        classes,
        credentials:{
            userHandle,
            profileUrl,
            userId,
            backgorundImage,
            email,
            geceModu,
            profilKapa

        },
        UI: { loading }
      } = this.props;

      //const ColorOfAll= this.state.gilad ? "black" : ""
      console.log("durumu:", this.state.age)
      console.log("database durumu:", this.state.profilKapa)


    const dialogMarkup = loading ? (
        <div className={classes.spinnerDiv}>
          <CircularProgress size={200} thickness={2} />
        </div>
      ) : (
        <Grid container xs={12}>
<Grid container xs={12} sm={7} md={7}>

<Grid item xs={12} sm={6} md={6} className={classes.settingProfile}>

<h6 style={{textAlign:"center"}}>Profil değiştir.</h6>
<img src={profileUrl} alt="Profil" className={classes.profileImage} onClick={this.handleEditPicture}/>

<input type="file" id="imageInput"
  hidden="hidden"
  onChange={this.handleImageChange} />

<Tooltip title="profil değiştir" placement="top" className={classes.kalemPart}>
    <ModeIcon className="classIcon" onClick={this.handleEditPicture} />
    </Tooltip>
</Grid>
<br />

<Grid item xs={12} sm={6} md={6} className={classes.settingProfile}>

<h6 style={{textAlign:"center"}}>Banner değiştir.</h6>


<img src={backgorundImage} alt="Arka Plan Resmi" className={classes.profileImage} onClick={this.handleEditBakgound}/>

<input type="file" id="imageInputtback"
  hidden="hidden"
  onChange={this.handleBackgroundImage} />

<Tooltip title="profil değiştir" placement="top" className={classes.kalemPart}>
    <ModeIcon className="classIcon" onClick={this.handleEditBakgound} />
    </Tooltip>
</Grid>

</Grid>
         

          <Grid item sm={5} xs={12} md={5}   style={{marginTop:"80px"}}>
              
            <hr className={classes.visibleSeparator} />

            <form onSubmit={this.handleSubmit}>
          {/* <TextField
          label="Şifre Değiştir"
          id="outlined-size-small"
          defaultValue={email}
          size="small"
          className={classes.textField}
          /> */}
          {/* <TextField
          label="Kullanıcı adı"
          id="outlined-size-small"
          defaultValue={userHandle}
          size="small"
          className={classes.textField}
          /> */}
           {/* <TextField
          label="Şifre"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
          className={classes.textField}
          />
           <TextField
          label="Şifre Onayı"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
          className={classes.textField}
          /> */}
         <FormControl variant="standard" sx={{  minWidth: 190 }} >
        <InputLabel id="demo-simple-select-label">Profil Durumu</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={profilKapa == "acik" ? "acik" : "kapali"}

          //value={this.state.age}
          onChange={this.handleDropChange}
        >
          <MenuItem value="acik"  >Açık</MenuItem>
          <MenuItem value="kapali" >Kapalı</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
          control={
            <Switch checked={geceModu=="true" ? true : false} onChange={this.handleCheckChange}   name="gilad" className={classes.publicSwitchInside} />
          }
          label={geceModu == "true" ? "Gece Modu" : "Gündüz Modu"}
          className={classes.publicSwitch}
        />

          {/* <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={true}
          >
            Kaydet
          </Button> */}

        </form>
    

              </Grid>


           <Grid xs={12}>
           <Button  disabled={true}  >
               Kart eşleştirme iptal.
             </Button>
             <Button style={{float:"right", background:"red" }} onClick= {()=>{this.handleClose(); this.handleconfirmOpen()}}  >
               Hesap Sil.
             </Button>

           </Grid>
           
        </Grid>
      );
    return (
      <Fragment>
          <Tooltip title="Bilgiler Güncelle">
                  <MyButton tip="Ayarlar" className="settingButton" onClick={this.handleOpen}>
                  <SettingsIcon className="classIcon" />
                </MyButton>
                

          </Tooltip>
          
          <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"  style={{ background:"red !important" ,color:"white"}}>

          
            <CloseIcon onClick={this.handleClose} className={classes.closeButton}/>
          

   <DialogTitle>
       Ayarlar Sayfası
   </DialogTitle>
   <DialogContent className={classes.dialogContent}>
   {dialogMarkup}
   </DialogContent>

   {/* <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} color="primary">
           Ekle
       </Button>
   </DialogActions> */}

          </Dialog>


          <Dialog
          open={this.state.confirmOpen}
          onClose={this.handleconfirmOpenClose}
          fullWidth
          maxWidth="sm"  style={{ background:"red !important" ,color:"white"}}>

          
            <CloseIcon onClick={this.handleconfirmOpenClose} className={classes.closeButton}/>
  
   <DialogContent className={classes.dialogContent}>
     <div style={{textAlign:"center"}}>
    <span style={{background:"yellow"}}> Dikkat!: Bu hesap silindikten sonra geri alınamaz.</span>
     </div><br />
   Hesabınızı Silmeyi Onaylıyor musunuz ?
   
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleconfirmOpenClose} color="primary">
           İptal
       </Button>
       <Button  color="primary" onClick={this.handleSubmitSil}>
           Sil
       </Button>
   </DialogActions>

          </Dialog>
      </Fragment>
    )
  }
}

SettingPage.propTypes={
    classes:PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
  userHandle: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  uploadBackgroundImage:PropTypes.func.isRequired,
  geceModuna:PropTypes.func.isRequired,
  profilKapa:PropTypes.func.isRequired,
  hesapSilAll:PropTypes.func.isRequired
}

const mapActionsToProps = {
    clearErrors,
    getUserData,
    uploadImage,
    uploadBackgroundImage,
    geceModuna,
    profilKapa,
    hesapSilAll
  };


const mapStateToProps=(state)=>({
    credentials:state.user.credentials,
  UI: state.UI
})

export default connect(mapStateToProps,  mapActionsToProps)(withStyles(styles)(SettingPage))
