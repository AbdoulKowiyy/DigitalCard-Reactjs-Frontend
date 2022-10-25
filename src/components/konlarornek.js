import React, { Component, Fragment } from 'react'

import { withStyles } from '@material-ui/styles';
import {Link} from "react-router-dom";
import MyButton from '../util/MyButton';

import { Grid, } from "@mui/material";

//Icons
import ChatIcon from "@material-ui/icons/Chat"
import { InputAdornment } from "@material-ui/core";

//connect from rect-rdux 
import {connect}  from "react-redux"
import PropTypes  from "prop-types"
import {likeScream,unlikeScream} from "../redux/actions/dataActions"
import { FavoriteBorder } from '@material-ui/icons';
import FavoriteIcon from '@mui/icons-material/Favorite';

//muı
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {submitSocailMediaUrl,clearErrors} from "../redux/actions/dataActions"


const styles={ 
    card:{
        position:"relative",
display:"flex",
marginBottom:20
    },
    image:{
    width:100,
    height:100
        
    },
    content:{
        padding:25
    },
    iconlar:{
        maxHeight: "50px",
        maxWidth: "50px",
        margin:"0px 5px !important",
        textAlign:"center",
        
    }
}


let grayColor="grayscale(100%)"
let properColor="saturate(3)"
class Scream extends Component {

    state={
        open:false,
        ikonRengi:false,
        showAllIkonss: false,
        HideSomeIkons:true,
        imageColor:grayColor,
        ikonIndex:0,
        controlCount:0,
        UrlLinki: '',
    errors: {}
    
    };


     //Tüm Ikomnlar Göster
  

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
          this.setState({
            errors: nextProps.UI.errors
          });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '', open: false, errors: {} });
          }
      }

    handleOpen = () => {
        this.setState({ open: true });
      };
      handleClose = () => {
          this.props.clearErrors();
        this.setState({ open: false, errors:{} });
      };
      handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      };

    handleIkonColor=(e,id)=>{
       
        this.setState({
          ikonRengi:true,
          ikonIndex:id
        })
      
        
      }

      handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitSocailMediaUrl(this.props.ikon.ikonId, { UrlLinki: this.state.UrlLinki });
       
        window.location.reload(false);
      }; 


  render() {
     
      //extract the inside of our crier
      const {classes, ikon:{ ikonId,userHandle,ikonImage,ikonUrl,urlVar },
    user:{
        authenticated,
       
    }
    }=this.props
    const errors = this.state.errors;
    const iconColor = urlVar ? 'saturate(3)' : 'grayscale(100%)';
    
      
    return (
        <Fragment>

<Grid  item xs={4} md={1} sm={2}>
  <div className="icondiv" onClick={(event)=>{this.handleIkonColor(event,this.props.idx) ;this.handleOpen(event); }} >
    <img src={ikonImage}  alt="Hibritmedya" className={classes.iconlar} style={{  filter:iconColor}} />
  </div>
</Grid>
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle>
       Url Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  
              
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
              InputProps={{
               startAdornment: <InputAdornment position="start" >https://</InputAdornment>,
           }}
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

Scream.propTypes={
    submitSocailMediaUrl:PropTypes.func.isRequired,
    likeScream:PropTypes.func.isRequired,
    unlikeScream:PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    Scream:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
    openDialog:PropTypes.bool,
    screamId: PropTypes.string.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors:PropTypes.func.isRequired,
    ikon:PropTypes.object.isRequired,

}

 const mapStateToProps=state=>({

    user:state.user,
    UI: state.UI

})
const mapActionsToProps ={
    likeScream,
    unlikeScream,
    submitSocailMediaUrl,
    clearErrors

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream))
