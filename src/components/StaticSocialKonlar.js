import React, { Component, Fragment } from "react";

import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import MyButton from "../util/MyButton";
import { ExternalLink } from 'react-external-link';

import { Grid } from "@mui/material";

//Icons
import ChatIcon from "@material-ui/icons/Chat";
import { InputAdornment } from "@material-ui/core";

//connect from rect-rdux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";
import { FavoriteBorder } from "@material-ui/icons";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from 'axios';

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
  },
  ikondivHere:{
    justifyContent:"center",
    textAlign:"center"
  }
};

let grayColor = "grayscale(100%)";
let properColor = "saturate(3)";

class StaticSocialKonlar extends Component {
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
    newDtata:null,
    couleurdIkon:false,
    urlHere:""
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
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
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
  getSocialBilgi=()=>{
    axios
    .get(`/socialWithout/${this.props.ikon.ikonId}`).then((res)=>{
      this.setState({
        newDtata: {...res.data , id:this.props.ikon.ikonId}
      })
      if(this.state.newDtata.linkUrlAll.length > 0 && this.state.newDtata.linkUrlAll.find(x=> x.userHandle === this.props.person)){
      
        this.setState({
          couleurdIkon:true,
          urlHere: this.state.newDtata.linkUrlAll.find(x=> x.userHandle === this.props.person).UrlLinki
        })
      }

      
      // urlHere:this.state.newDtata.linkUrlAll.find(x => x.UrlLinki).UrlLinki 

      
      
    }
    ).catch(err=>{
      console.log("hata var socialda: ",err)
    })
  }

  //component did mount
  componentDidMount(){
    this.getSocialBilgi();
  }
//compoenent update

  componentDidUpdate(){

    if(this.state.newDtata && this.state.newDtata.id=== this.props.ikon.ikonId){
      return
    }
    this.getSocialBilgi()

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
   const iconGor= this.state.couleurdIkon ? '' : 'none';

   const UrlKoy= this.state.urlHere !=="" ? this.state.urlHere : ""

  

   
   

    var base1 = `https://${UrlKoy}`;
    


    return (
      <Fragment >
        
        <Grid item xs={4} md={1} sm={2} style={{display: iconGor }}>
          <div
            className={classes.ikondivHere}
            onClick={(event) => {
              this.handleIkonColor(event, this.props.idx);
              
              this.handleOpen(event);
              
            }} 
          >
            {/* ${UrlKoy} */}
            
            <ExternalLink href={base1} >
            <img
              src={ikonImage}
              alt="Hibritmedya"
              className={classes.iconlar}
            />{" "}
            </ExternalLink>
            
          </div>{" "}
        </Grid>{" "}
        
        
      </Fragment>
    );
  }
}

StaticSocialKonlar.propTypes = {
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
  person:PropTypes.string.isRequired
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
)(withStyles(styles)(StaticSocialKonlar));
