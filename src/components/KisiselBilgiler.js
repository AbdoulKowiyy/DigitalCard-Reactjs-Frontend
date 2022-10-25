import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";



//muı stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import ModeIcon from '@mui/icons-material/Mode';


//Redux
import {connect} from "react-redux"
import {editUserDetails,editUserBilgi} from "../redux/actions/userActions"
import { IconButton, Tooltip } from "@mui/material";


const styles= (theme)=>({
    palette: {
        primary: {
            light: '#272727',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff'
        },
        secondary: {
            light: '#9f9f9f',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff'
        }
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
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative',
        float: "right",
        color:"#272727",
        fontSize:"large",
        cursor:"pointer",
        paddingRight:"20px"
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
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    visibleSeparator:{
    width: '80%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20
  },
})

class KisiselBilgiler extends Component {

state={
    bio:"",
    website:"",
    company:"",
    position:"",
    phoneNumber:"",
    open:false,
    oldPath: '',
    newPath: '',
    nameSurname:""
};



handleOpen = () => {
    //when the widow open change Url
    let oldPath = window.location.pathname;
     
    const { userHandle, userId } = this.props;
    const newPath = `/kullanici/kisiseldata/jfkjsdkfjksdjfkjskjfsfkhhfıhueryfyhshdnvbhvchbhjhxhid=?buradhereconfidentiels/`;
    
    if (oldPath === newPath) {
      oldPath = `/`
    }
    
    window.history.pushState(null, null, newPath);
    
            this.setState({ open: true,oldPath, newPath });
            this.mapUserDetailsToState(this.props.credentials)
          };
          handleClose = () => {
            this.setState({ open: false, errors:{} });
            window.history.pushState(null, null, this.state.oldPath);
          };

componentDidMount(){
    const {credentials}= this.props;
    this.mapUserDetailsToState(credentials)
    
}


// bilgiler ayarı
mapUserDetailsToState=(credentials)=>{

    this.setState({
        bio:credentials.bio ? credentials.bio :"",
        website: credentials.website? credentials.website:"",
        company: credentials.company ? credentials.company: "",
        position: credentials.position ? credentials.position: "",
        phoneNumber: credentials.phoneNumber ? credentials.phoneNumber: "",
        nameSurname:credentials.nameSurname ? credentials.nameSurname:""
    });

}

handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //handle submit için, boş gödermemesi lazım. bilgi güncellem için.
  handleSubmit=()=>{
      const userDetails={
          bio:this.state.bio,
          website: this.state.website,
          company: this.state.company,
          position: this.state.position,
          phoneNumber: this.state.phoneNumber,
          nameSurname:this.state.nameSurname
      };
      this.props.editUserBilgi(userDetails);
      this.handleClose()
  }



  render() {
    const { classes } = this.props;
    return (
      <Fragment>
              <Tooltip title="Bilgileri Güncelle" placement="top">
                <ModeIcon className={classes.button} onClick={this.handleOpen} />
                </Tooltip>
          
          <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
              
   <DialogTitle style={{marginLeft:"5px", fontSize: "1rem",
      fontFamily: "Roboto,Helvetica,Arial,sans-serif",
      letterSpacing: "0.0075em", marginTop:"10px", marginBottom:"20px"}}>
      <strong>Bilgileri Güncelle</strong> 
   </DialogTitle>
   <DialogContent>
       <form>
           <TextField
           name="bio"
           type="text"
           label="özgeçmiş"
           multiline
           rows="2"
           inputProps={{ maxLength: 50 }}
           placeholder="Hakkınızda kısa bilgi"
           className={classes.TextField}
           value={this.state.bio}
           onChange={this.handleChange}
           fullWidth
           />
           <TextField
           name="website"
           type="text"
           label="Website"
           placeholder="Websiteniz"
           className={classes.TextField}
           value={this.state.website}
           onChange={this.handleChange}
           fullWidth
           />
           <TextField
           name="position"
           type="text"
           label="Pozisyon"
           className={classes.TextField}
           value={this.state.position}
           onChange={this.handleChange}
           fullWidth
           />
            <TextField
           name="nameSurname"
           type="text"
           label="Ad Soyad"
           className={classes.TextField}
           value={this.state.nameSurname}
           onChange={this.handleChange}
           fullWidth
           />

<TextField
           name="company"
           type="text"
           label="Şirket"
           className={classes.TextField}
           value={this.state.company}
           onChange={this.handleChange}
           fullWidth
           />

            <TextField
           name="phoneNumber"
           type="text"
           label="Telefon"
           className={classes.TextField}
           value={this.state.phoneNumber}
           inputProps={{ maxLength: 12}}
           onChange={this.handleChange}
           fullWidth
           />
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} color="primary">
           Kaydet
       </Button>
   </DialogActions>

          </Dialog>
      </Fragment>
    )
  }
}

KisiselBilgiler.propTypes={
    editUserDetails:PropTypes.func.isRequired,
    editUserBilgi:PropTypes.func.isRequired,
    classes:PropTypes.object.isRequired
}


const mapStateToProps=(state)=>({
    credentials:state.user.credentials
})

export default connect(mapStateToProps, {editUserDetails,editUserBilgi})(withStyles(styles)(KisiselBilgiler))
