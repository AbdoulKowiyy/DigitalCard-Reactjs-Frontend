import React, { Component, Fragment } from "react";

import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import MyButton from "../util/MyButton";
import { ExternalLink } from "react-external-link";

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
import axios from "axios";

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
  }
};

let grayColor = "grayscale(100%)";
let properColor = "saturate(3)";

class StaticContactKonlar extends Component {
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
    urlHere: "",
    tipi:"",
    userAdBir:"",
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
  getSocialBilgi = () => {
    axios
      .get(`/contactWithout/${this.props.ikon.ikonId}`)
      .then((res) => {
        this.setState({
          newDtata: { ...res.data, id: this.props.ikon.ikonId },
        });
        if (
          this.state.newDtata.linkUrlAll.length > 0 &&
          this.state.newDtata.linkUrlAll.find(
            (x) => x.userHandle == this.props.person
          )
        ) {
          this.setState({
            couleurdIkon: true,
            urlHere: this.state.newDtata.linkUrlAll.find(x=> x.userHandle === this.props.person).UrlLinki,
            userAdBir:this.state.newDtata.linkUrlAll.find(x=> x.userHandle === this.props.person).userHandle,
          });
        }
     
        if( this.state.newDtata.type !== undefined){
            this.setState({
                tipi: this.state.newDtata.type
            })
        }
       
        
       
      })
      .catch((err) => {
        console.log("hata var socialda: ", err);
      });
  };



  // downloadVcf=(filename, data) =>{
  //   var element = document.createElement('a');
  //   element.setAttribute('href', 'data:text/x-vcard;charset=utf-8,' + encodeURIComponent(data));
  //   element.setAttribute('download', filename);
  //   element.style.display = 'none';
  //   document.body.appendChild(element);
  //   element.click();
  //   document.body.removeChild(element);
  // }


//   dowloadVcfDosya= ()=> {
//     const FileSaver = require('file-saver');
// const blob = new Blob([ vCard.getFormattedString() ], {type: "text/vcard;charset=utf-8"});
// FileSaver.saveAs(blob, "blob.vcf");
//   }

  
  CreateVCard = () => {

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


  
  

  //component did mount
  componentDidMount() {

    this.getSocialBilgi();
    // var UrlKoy= this.state.urlHere !== "" ? this.state.urlHere : ""

    // this.download(UrlKoy)

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
      ikon: { ikonId, userHandle, ikonImage, ikonUrl, urlVar ,company,nameSurname,position},
      user: { authenticated },
    } = this.props;
    const errors = this.state.errors;
    // const iconColor = urlVar ? "saturate(3)" : "grayscale(100%)";
    const iconGor = this.state.couleurdIkon ? "" : "none";

    const UrlKoy = this.state.urlHere !== "" ? this.state.urlHere : "";
    
    //console.log("buarada başka:", this.state.userAdBir !== "" ? this.state.userAdBir : "")

    const veriData={
      PhoneNumber:this.state.urlHere !== "" ? this.state.urlHere : "",
      firstName: userHandle
    }
    


    var base1 = `tel:${UrlKoy}`;
    //var base2=this.download("hee.vcf",{UrlKoy})
    var base3= `mailto:${UrlKoy}`
    var base4=`https://www.google.com/maps/place/${UrlKoy}/@39.9572992,32.8302592,12z`
var base5=`https://${UrlKoy}`
var base6=`https://www.google.com/maps/place/${UrlKoy}/@39.9572992,32.8302592,12z`

//var base8 =`javascript: ${this.download("good.vcf",{UrlKoy})}`


    return (
      <Fragment>
        {/* <Grid item xs={4} md={1} sm={2} style={{ display: iconGor }}>
          <div
            className={classes.ikondivHere}
            onClick={(event) => {
              this.handleIkonColor(event, this.props.idx);
              this.handleOpen(event);
            }}
          > */}

{
    this.state.tipi==="rehber" &&
    <Button style={{width:"100%", background:"#000" , color: "#FFFF"}} onClick={ (e)=> this.CreateVCard(e)}  >
                <span>Kaydet</span>
                </Button>


}

{/* {
    this.state.tipi!=="rehber" &&  (<Button style={{width:"100%", background:"#000" , color: "#FFFF"}} disabled={true}>
    <span>Kaydettt</span>
    </Button>)
} */}


            {/* ${UrlKoy} */}
            {/* href={this.state.tipi=="arama" ? base1: UrlKoy 
            || this.state.tipi=="mail" ? base3 : UrlKoy || this.state.tipi=="konum" ? base4 : UrlKoy
            || this.state.tipi==="rehber" ? this.download("good.vcf",{UrlKoy}): UrlKoy  } */}

{/* this.state.tipi==="rehber" ? this.download("good.vcf",{UrlKoy}) :  */}

{/* : this.state.tipi==="rehber" ? this.download() */}

{/* onClick={ this.state.tipi==="rehber" ? this.download : ""} */}


{/* onClick={this.state.tipi==="rehber" ? (e)=>{ this.downloadVcf(userHandle,"omurhere")} : ""} */}

            {/* <ExternalLink  onClick={this.state.tipi==="rehber" ? (e)=>{ this.CreateVCard(e)} : ""}  href={this.state.tipi=="arama" ? base1:  this.state.tipi=="mail" ? base3 : this.state.tipi=="konum" ? base4  :  this.state.tipi==="sitemiz" ? base5 :this.state.tipi==="harita" ? base6 : false } > */}
              {/* <img
                src={ikonImage}
                alt="Hibritmedya"
                className={classes.iconlar}
                
              />{" "} */}

             
            {/* </ExternalLink>
          </div>{" "}
        </Grid>{" "} */}
      </Fragment>
    );
  }
}




StaticContactKonlar.propTypes = {
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
  nameAndSoayd:PropTypes.string.isRequired,
  profilGet:PropTypes.string.isRequired,
  titlePer:PropTypes.string.isRequired,
  sirketBu:PropTypes.string.isRequired,
  userIdd:PropTypes.string.isRequired,
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
)(withStyles(styles)(StaticContactKonlar));
