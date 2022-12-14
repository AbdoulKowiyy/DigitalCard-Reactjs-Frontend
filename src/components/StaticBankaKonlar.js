import React, { Component, Fragment } from "react";

import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import MyButton from "../util/MyButton";
import { ExternalLink } from "react-external-link";

import { Grid } from "@mui/material";

//Icons
import ChatIcon from "@material-ui/icons/Chat";
import { InputAdornment } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

import { ToastContainer, toast } from "react-toastify";

//connect from rect-rdux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";
import { FavoriteBorder } from "@material-ui/icons";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import Typography from "@material-ui/core/Typography";

//muı
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  submitSocailMediaUrl,
  clearErrors,
} from "../redux/actions/dataActions";
import { display, style } from "@mui/system";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    padding: 25,
  },
  iconlar: {
    maxHeight: "72px",
    maxWidth: "72px",
    margin: "0px 5px !important",
    textAlign: "center",
    cursor:"pointer"

    
  },
  ikondivHere:{
    justifyContent:"center",
    textAlign:"center"
  },
  pageTitle: {
    margin: '10px auto 10px auto'
},
  bilgiInside:{
   
  },
  visibleSeparator:{
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
  spanelenmment:{

    fontSize:"0.95rem"
  },
  
  
};

let grayColor = "grayscale(100%)";
let properColor = "saturate(3)";

class StaticBankaKonlar extends Component {
  state = {
    open: false,
    ikonRengi: false,
    showAllIkonss: false,
    HideSomeIkons: true,
    imageColor: grayColor,
    ikonIndex: 0,
    controlCount: 0,
    UrlLinki: "",
    errors: {},
    newDtata: null,
    couleurdIkon: false,
    bankabilgi: "",
    hesabSahibiBilgi: "",
    hesapNumarasiBilgi: "",
    ibanBilgi: "",
    oldPath: "",
    newPath: "",
  };

  //Tüm Ikomnlar Göster

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }

  handleOpen = () => {
    //when the widow open change Url
    let oldPath = window.location.pathname;

    const { userHandle, userId } = this.props;
    const newPath = `/id/${this.props.person}/${this.props.ikon.ikonId}/${this.state.bankabilgi}`;

    if (oldPath === newPath) {
      oldPath = `/`;
    }
    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
    window.history.pushState(null, null, this.state.oldPath);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleIkonColor = (e, id) => {
    this.setState({
      ikonRengi: true,
      ikonIndex: id,
    });
   
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitSocailMediaUrl(this.props.ikon.ikonId, {
      UrlLinki: this.state.UrlLinki,
    });
   
    window.location.reload(false);
  };

  //get social getir
  getSocialBilgi = () => {
    axios
      .get(`/bankaWithout/${this.props.ikon.ikonId}`)
      .then((res) => {
        this.setState({
          newDtata: { ...res.data, id:this.props.ikon.ikonId },
        });
        if (
          this.state.newDtata.linkUrlAll.length > 0 &&

          this.state.newDtata.linkUrlAll.find(
            (x) => x.userHandle == this.props.person
          )
        ) {
          this.setState({
            couleurdIkon: true,
            
            hesabSahibiBilgi: this.state.newDtata.linkUrlAll.find(x=> x.userHandle === this.props.person).hesabSahibi,
            hesapNumarasiBilgi: this.state.newDtata.linkUrlAll.find(x=> x.userHandle === this.props.person).hesapNumarasi,
            ibanBilgi: this.state.newDtata.linkUrlAll.find(x=> x.userHandle === this.props.person).iban

          });
         
        }

        
      })
      .catch((err) => {
        console.log("hata var socialda: ", err);
      });
  };

   notify = () =>{
    toast(" İban Kopyalandı ", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  }

  //component did mount
  componentDidMount() {
    this.getSocialBilgi();
  }
  //compoenent update

  componentDidUpdate() {
    if (
      this.state.newDtata &&
      this.state.newDtata.id === this.props.ikon.ikonId
    ) {
      return;
    }
    this.getSocialBilgi();
  }

  render() {
    //extract the inside of our crier
    const {
      classes,
      ikon: { ikonId, userHandle, ikonImage, ikonUrl, urlVar },
      user: { authenticated },
    } = this.props;
    const errors = this.state.errors;
    // const iconColor = urlVar ? "saturate(3)" : "grayscale(100%)";
    const iconGor = this.state.couleurdIkon ? "" : "none";

    
    

  
    const ibanKoy=this.state.ibanBilgi !=="" ? this.state.ibanBilgi :"";
    const hesapSahibiKoy=this.state.hesabSahibiBilgi !=="" ? this.state.hesabSahibiBilgi : "";
    const hesapNumasiKoy=this.state.hesapNumarasiBilgi !=="" ? this.state.hesapNumarasiBilgi :"";


    


    return (
      <Fragment>
        <Grid item xs={4} md={1} sm={2} style={{ display: iconGor }}>
          <div
            className={classes.ikondivHere}
            onClick={(event) => {
              this.handleIkonColor(event, this.props.idx);
              this.handleOpen(event);
            }}
          >
            {/* ${UrlKoy} */}
            <img
              src={ikonImage}
              alt="Hibritmedya"
              className={classes.iconlar}
            />{" "}
          </div>{" "}
        </Grid>{" "}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <CloseIcon onClick={this.handleClose} className={classes.closeButton}/>

          <DialogTitle style={{ textAlign:"center" , justifyContent:"center" }}>Banka Bilgileri </DialogTitle>{" "}
          <DialogContent style={{padding:"50px" }}>
            <form >
            <hr className={classes.visibleSeparator}/>
              <Grid container >
                <Grid xs={12} >
                <Typography variant="h6" className={classes.pageTitle}>
                  Iban: &ensp;<span className={classes.spanelenmment}>{ibanKoy}</span>
                </Typography>
                </Grid>
                <Grid xs={12} >

                
                 
                 
                </Grid>
                <Grid xs={12} >
                <Typography variant="h6" className={classes.pageTitle}>
                Hesap Sahibi: &ensp;<span className={classes.spanelenmment}>{hesapSahibiKoy}</span>
                </Typography>
                  
                  
                </Grid>
                <Grid xs={12} mb={5}>

                <Typography variant="h6" className={classes.pageTitle}>
                Hesap Numarası: &ensp;<span className={classes.spanelenmment}>{hesapNumasiKoy}</span>
                </Typography>
                </Grid>
              </Grid>
              <Grid style={{ textAlign:"center" , justifyContent:"center"}}>
                <Button style={{
        borderRadius: 5,
        backgroundColor: "#21b6ae",
        
    }}
    variant="contained" onClick={() => {
      navigator.clipboard.writeText( this.state.ibanBilgi);
      this.notify()
      
    }}>
                  Ibanı Kopyala
                </Button>
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
        <ToastContainer style={{ marginRight:"15px !important",paddingLeft:"20px", paddingRight:"20px"}}/>
      </Fragment>
    );
  }
}

StaticBankaKonlar.propTypes = {
  submitSocailMediaUrl: PropTypes.func.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  Scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
  screamId: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  ikon: PropTypes.object.isRequired,
  idx: PropTypes.string.isRequired,
  person: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
const mapActionsToProps = {
  likeScream,
  unlikeScream,
  submitSocailMediaUrl,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(StaticBankaKonlar));
