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
import {editUserFatura} from "../redux/actions/userActions"
import { IconButton, Tooltip } from "@mui/material";
import { padding } from "@mui/system";


const styles= (theme)=>({
    palette: {
        primary: {
            light: '#272727',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff'
        },
        secondary: {
            light: '#9f9f9f ',
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
        paddingRight:"20px",
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
        width: '90%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
})

class FaturaBilgileri extends Component {

state={
    vergiNumarasi:"",
    vergidairesi:"",
    firmaUnvani:"",
    ofisMaili:"",
    ofistelefonu:"",
    location:"",
    open:false,
    oldPath: '',
    newPath: ''
};



handleOpen = () => {
    //when the widow open change Url
    let oldPath = window.location.pathname;
     
    const { userHandle, userId } = this.props;
    const newPath = `/kullanici/FaturaData/%2Fappengine%2Fquotadetails%3Fauthuser%3D0&project%3Dundefined/permissions?projec?id=?thuser%3D0&project%3Dundefined`;
    
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
        vergiNumarasi:credentials.vergiNumarasi ? credentials.vergiNumarasi :"",
        vergidairesi: credentials.vergidairesi ? credentials.vergidairesi:"",
        location: credentials.location ? credentials.location: "",
        firmaUnvani: credentials.firmaUnvani ? credentials.firmaUnvani: "",
        ofisMaili: credentials.ofisMaili ? credentials.ofisMaili: "",
        ofistelefonu: credentials.ofistelefonu ? credentials.ofistelefonu: ""
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
        vergiNumarasi:this.state.vergiNumarasi,
        vergidairesi: this.state.vergidairesi,
          location: this.state.location,
          firmaUnvani: this.state.firmaUnvani,
          ofisMaili: this.state.ofisMaili,
          ofistelefonu: this.state.ofistelefonu
      };
      this.props.editUserFatura(userDetails);
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
      letterSpacing: "0.0075em", marginTop:"10px", marginBottom:"5px"}}>
      <strong>Bilgileri Güncelle</strong> 
   </DialogTitle>
   
   <DialogContent>
       <form>
           <TextField
           name="vergiNumarasi"
           type="text"
           label="Vergi Numarası"
           className={classes.TextField}
           value={this.state.vergiNumarasi}
           onChange={this.handleChange}
           fullWidth
           />
           <TextField
           name="vergidairesi"
           type="text"
           label="Vergi Dairesi"
           className={classes.TextField}
           value={this.state.vergidairesi}
           onChange={this.handleChange}
           fullWidth
           />
           <TextField
           name="firmaUnvani"
           type="text"
           label="Fırma Ünavanı"
           className={classes.TextField}
           value={this.state.firmaUnvani}
           onChange={this.handleChange}
           fullWidth
           />
            <TextField
           name="ofisMaili"
           type="text"
           label="Ofis E-Posta"
           className={classes.TextField}
           value={this.state.ofisMaili}
           onChange={this.handleChange}
           fullWidth
           />
           <TextField
           name="ofistelefonu"
           type="text"
           label="Ofis Telefonu"
           className={classes.TextField}
           value={this.state.ofistelefonu}
           onChange={this.handleChange}
           fullWidth
           />
           <TextField
           name="location"
           type="text"
           label="Adres"
           className={classes.TextField}
           value={this.state.location}
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
           Ekle
       </Button>
   </DialogActions>

          </Dialog>
      </Fragment>
    )
  }
}

FaturaBilgileri.propTypes={
    editUserFatura:PropTypes.func.isRequired,
    classes:PropTypes.object.isRequired
}


const mapStateToProps=(state)=>({
    credentials:state.user.credentials
})

export default connect(mapStateToProps, {editUserFatura})(withStyles(styles)(FaturaBilgileri))
