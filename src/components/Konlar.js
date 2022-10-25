import React, { Component, Fragment,useEffect} from 'react'

import { withStyles } from '@material-ui/styles';
import {Link} from "react-router-dom";
import MyButton from '../util/MyButton';

import { Grid, } from "@mui/material";

//Icons
import ChatIcon from "@material-ui/icons/Chat";
import { InputAdornment } from "@material-ui/core";

//connect from rect-rdux
import {connect}  from "react-redux"
import PropTypes  from "prop-types"
import {likeScream,unlikeScream} from "../redux/actions/dataActions"
import { FavoriteBorder } from '@material-ui/icons';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';

//muı
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import {submitSocailMediaUrl,submitWhatsappUrl,submitinstagramUrl,submittelegramUrl,submitFacebookUrl,submitwitterUrl,clearErrors,getSocialKkonsUrl,editUserSocialkonlar} from "../redux/actions/dataActions";


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
        maxHeight: "96px",
        maxWidth: "96px",
        margin:"0px 5px !important",
        textAlign:"center",

    }
}


let grayColor="grayscale(100%)"
let properColor="saturate(3)"
class Konlar extends Component {

    state={
        open:false,
        ikonRengi:false,
        showAllIkonss: false,
        HideSomeIkons:true,
        imageColor:grayColor,
        ikonIndex:0,
        controlCount:0,
        UrlLinki: "",
    errors: {},
    newDtata:null,
    couleurdIkon:false,
    oldPath: '',
    newPath: '',
    };


// bilgiler ayarı
// mapUserDetailsToState=(credentials)=>{

//   this.setState({
//     UrlLinki:credentials.UrlLinki ? credentials.UrlLinki :"",

//   });

// }


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
        //when the widow open change Url
        let oldPath = window.location.pathname;

        const { userHandle, userId } = this.props;
        const newPath = `/kullanici/SosyalIkons/${this.props.ikon.ikonId}`;

        if (oldPath === newPath) {
          oldPath = `/`
        }
        window.history.pushState(null, null, newPath);

                this.setState({ open: true,oldPath, newPath });

                

              };

              handleClose = () => {
                  this.props.clearErrors();
                this.setState({ open: false, errors:{} });
                window.history.pushState(null, null, this.state.oldPath);
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
        

      };

      // düzenle
      handleSubmitDuzenle=(event)=>{
        event.preventDefault();
        const userDetails={
          UrlLinki:this.state.UrlLinki
        };
        this.props.editUserSocialkonlar(this.state.newDtata.linkUrlAll.find(x=> x.linkIdBurada).linkIdBurada, userDetails);
         
       // console.log("gitti:", this.state.newDtata.linkUrlAll.find(x=> x.linkIdBurada).linkIdBurada)
        
      }

      //instagram
      handleinstagramSubmit=(event)=>{
        event.preventDefault();
        this.props.submitinstagramUrl(this.props.ikon.ikonId, { UrlLinki: this.state.UrlLinki });
      }     

//telegram
handletelegramSubmit=(event)=>{
  event.preventDefault();
  this.props.submittelegramUrl(this.props.ikon.ikonId, { UrlLinki: this.state.UrlLinki });
}

//facebook

handlefacebookSubmit=(event)=>{
  event.preventDefault();
  this.props.submitFacebookUrl(this.props.ikon.ikonId, { UrlLinki: this.state.UrlLinki });
}

//twitter
handletwitterSubmit=(event)=>{
  event.preventDefault();
  this.props.submitwitterUrl(this.props.ikon.ikonId, { UrlLinki: this.state.UrlLinki });
}

//whatsapp

      handleWhatsappSubmit=(event)=>{
        event.preventDefault();
        this.props.submitWhatsappUrl(this.props.ikon.ikonId, { UrlLinki: this.state.UrlLinki });
        
      }


//get social getir
      getSocialBilgi=()=>{
        axios
        .get(`/socialKonsandUrl/${this.props.ikon.ikonId}`).then((res)=>{
          this.setState({
            newDtata: {...res.data , id:this.props.ikon.ikonId}
          })
          if(this.state.newDtata.linkUrlAll.length > 0 ){
            this.setState({
              couleurdIkon:true
            })
          }

        }
        ).catch(err=>{
          console.log("hata var socialda: ",err)
        })
      }

      //component did mount
      componentDidMount(){
        this.getSocialBilgi();

        // if(this.state.newDtata.linkUrlAll>0){
        //   console.log("hee")
        //   this.setState({
        //     UrlLinki:this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki
        //   })
        // }
        
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
      const {classes,
         ikon:{ ikonId,userHandle,ikonImage,ikonUrl },
    user:{
        authenticated,
    },
    tumIkon:{linkUrlAll,screamid }
    }=this.props


    const errors = this.state.errors;
    const iconColor = this.state.couleurdIkon ? 'saturate(3)' : 'grayscale(100%)';

     
     



    return (
        <Fragment>

<Grid  item xs={4} md={1} sm={2}>
  <div className="icondiv" onClick={(event)=>{this.handleIkonColor(event,this.props.idx) ;this.handleOpen(event); }}   >
    <img src={ikonImage}  alt="Hibritmedya" className={classes.iconlar}  style={{ filter: iconColor}} />
  </div>
</Grid>



{/* if it behance */}

{/* whasapp düzenle */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="whatsapp" && this.state.newDtata.linkUrlAll.length >=1  &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}

          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
      Whatsapp Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 //value={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 fullWidth
          //     InputProps={{

          //      startAdornment: <InputAdornment position="start" >https://</InputAdornment>,

          //  }}
              />



       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} color="primary">

           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}


{/* behance düzenle */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="behance" && this.state.newDtata.linkUrlAll.length >=1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
      Behance Urliniz Düzenle
   </DialogTitle>
   <DialogContent>
   <form >

              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn:behance.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}


{/* behance */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="behance" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
      Behance Urliniz düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >

              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn:behance.com/hibricard'
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
  )
}

{/* snapachat duzenlle */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="snapchat" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Snapchat Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >

              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn:snapchat.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* snapchat */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="snapchat" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Snapchat Urliniz Ekle
   </DialogTitle>
   <DialogContent>
   <form >

              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn:snapchat.com/hibricard'
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
  )
}

{/* team düzenle */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="teams" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Teams  Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: teams.com/hibritcard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* teamsk */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="teams" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Teams  Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: teams.com/hibritcard'
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
  )
}

{/* viber düzenle */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="viber" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Viber  Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: viber.com/hibritcard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* viber */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="viber" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Viber  Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: viber.com/hibritcard'
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
  )
}

{/* zoom ikonu düzenleyin */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="zoom" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Zoom  Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: zoom.com/hibritcard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* zoom */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="zoom" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   zoom  Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: zoom.com/hibritcard'
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
  )
}

{/* vero düzenle */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="vero" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Vero  Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: vero.com/hibritcard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}


{/* vero */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="vero" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Vero  Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: vero.com/hibritcard'
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
  )
}

{/* tango düzenleyin */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="tango" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Tango  Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tango.com/hibritcard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}


{/* tango */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="tango" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Tango  Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 //defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tango.com/hibritcard'
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
  )
}

{/* youtube düzenle */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="youtube" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Youtube  Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: youtube.com/hibritcard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* youtube */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="youtube" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Youtube  Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 //defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: youtube.com/hibritcard'
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
  )
}


{/* yaay düzenle */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="yaay" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Yaay  Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: yaay.com/hibritcard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}


{/* yaay */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="yaay" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Yaay  Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: yaay.com/hibritcard'
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
  )
}


{/* skype düzenle */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="skype" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Skype  Urliniz Düzenle.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: skype.com/hibritcard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* skype */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="skype" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Skype  Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: skype.com/hibritcard'
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
  )
}


{/* signal düzenle */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="signal" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Signal  Urliniz Düzenle.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: signal.com/hibritcard'
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
  )
}


{/* signal */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="signal" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Signal  Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: signal.com/hibritcard'
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
  )
}

{/* swam düzenle */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="swarm" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Swarm  Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: swarm.com/hibritcard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* swarm */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="swarm" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Swarm  Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: swarm.com/hibritcard'
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
  )
}

{/* whatsapp */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="whatsapp" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Whatsapp  Numaranızı Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: 05351035340'
//  InputProps={{
//   startAdornment: <InputAdornment position="start" >https://</InputAdornment>,
// }}
              />

       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleWhatsappSubmit} color="primary">
           Ekle
       </Button>
   </DialogActions>

          </Dialog>
  )
}


{/* reddit düzenle */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="reddit" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Reddit  Urliniz Düzenle.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: reddit.com/hibricard'
//  InputProps={{
//   startAdornment: <InputAdornment position="start" >https://</InputAdornment>,
// }}
             
              />

       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}


{/* reddit */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="reddit" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Reddit  Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: reddit.com/hibricard'
//  InputProps={{
//   startAdornment: <InputAdornment position="start" >https://</InputAdornment>,
// }}
             
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
  )
}

{/* pinterest düzenle */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="pinterest" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Pinterest  Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: pinterest.com/hibricard'
//  InputProps={{
//   startAdornment: <InputAdornment position="start" >https://</InputAdornment>,
// }}
             
              />

       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}



{/* pinterest */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="pinterest" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Pinterest  Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: pinterest.com/hibricard'
//  InputProps={{
//   startAdornment: <InputAdornment position="start" >https://</InputAdornment>,
// }}
             
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
  )
}

{/* twitter düzenle */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="twitter" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Twitter  Kullanıcı Adınız Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: hibricard'
//  InputProps={{
//   startAdornment: <InputAdornment position="start" >https://</InputAdornment>,
// }}
             
              />

       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}


{/* twitter */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="twitter" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Twitter  Kullanıcı Adınız Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: hibricard'
//  InputProps={{
//   startAdornment: <InputAdornment position="start" >https://</InputAdornment>,
// }}
             
              />

       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handletwitterSubmit} color="primary">
           Ekle
       </Button>
   </DialogActions>

          </Dialog>
  )
}


{/* sinebo düzenle */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="sineweibo" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Sineweibo  Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: sineweibo.com/hibricard'
//  InputProps={{
//   startAdornment: <InputAdornment position="start" >https://</InputAdornment>,
// }}
             
              />

       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* sinebo */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="sineweibo" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Sineweibo  Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: sineweibo.com/hibricard'
//  InputProps={{
//   startAdornment: <InputAdornment position="start" >https://</InputAdornment>,
// }}
             
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
  )
}

{/* wechat düzenle */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="wechat" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Wechat  Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: wechat.com/hibricard'
//  InputProps={{
//   startAdornment: <InputAdornment position="start" >https://</InputAdornment>,
// }}
             
              />

       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* wechat */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="wechat" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Wechat  Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: wechat.com/hibricard'
//  InputProps={{
//   startAdornment: <InputAdornment position="start" >https://</InputAdornment>,
// }}
             
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
  )
}

{/* qqtitle düzenleyin */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="qqtile" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Qqtile  Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: qqtile.com/hibricard'
//  InputProps={{
//   startAdornment: <InputAdornment position="start" >https://</InputAdornment>,
// }}
             
              />

       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}


{/* qqtile */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="qqtile" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Qqtile  Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: qqtile.com/hibricard'
//  InputProps={{
//   startAdornment: <InputAdornment position="start" >https://</InputAdornment>,
// }}
             
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
  )
}

{/* icbc düzenleyin */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="icbc" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Icbc Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: icbc.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* icbc */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="icbc" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Icbc Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: icbc.com/hibricard'
//  InputProps={{
//   startAdornment: <InputAdornment position="start" >https://</InputAdornment>,
// }}
             
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
  )
}


{/* facebook düzenleyin */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="facebook" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Facebook Kullanıcı Adınız Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: hibricard'
//  InputProps={{
//   startAdornment: <InputAdornment position="start" >https://</InputAdornment>,
// }}
             
              />

       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* facbook */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="facebook" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Facebook Kullanıcı Adınız Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: hibricard'
//  InputProps={{
//   startAdornment: <InputAdornment position="start" >https://</InputAdornment>,
// }}
             
              />

       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handlefacebookSubmit} color="primary">
           Ekle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* periscope düzenleyin */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="periscope" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Periscope Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: periscope.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* periscope */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="periscope" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Periscope Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: periscope.com/hibricard'
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
  )
}

{/* nimotv düzenleyin */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="nimotv" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Nimotv Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: nimotv.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}



{/* nimotv */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="nimotv" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   nimotv Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: nimotv.com/hibricard'
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
  )
}


{/* medium düzenleyin */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="medium" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Medium Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: twitch.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* medium */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="medium" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   medium Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: twitch.com/hibricard'
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
  )
}

{/* twicth düzenleyin */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="twitch" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Twitch Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: twitch.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* twicth */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="twitch" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Twitch Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: twitch.com/hibricard'
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
  )
}


{/* linkedin düzenleyin */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="linkedin" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   linkedin Urlini Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: linkedin.com/hibricard'
             
              />

       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* linkedin */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="linkedin" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   linkedin Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: linkedin.com/hibricard'
             
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
  )
}


{/* line düzenleyin */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="line" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Line Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: line.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* line */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="line" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Line Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: line.com/hibricard'
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
  )
}


{/* tumblr düzenleyin */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="tumblr" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Tumblr Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tumblr.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* tumblr */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="tumblr" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Tumblr Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tumblr.com/hibricard'
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
  )
}


{/* kikmessenger düzenleyin */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="kikmessenger" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Kikmessenger Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: kikmessenger.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* kikmessenger */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="kikmessenger" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Kikmessenger Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: kikmessenger.com/hibricard'
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
  )
}

{/* icq düzenleyin */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="icq" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Icq Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: icq.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* icq */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="icq" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Icq Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: icq.com/hibricard'
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
  )
}



{/* icbc düzenleyin */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="icbc" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Icbc Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tinder.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* icbc */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="icbc" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Icbc Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tinder.com/hibricard'
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
  )
}



{/* hangout düzenle */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="hangouts" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Hangouts Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tinder.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}


{/* hangout */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="hangouts" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Hangouts Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tinder.com/hibricard'
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
  )
}


{/* github düzenle */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="github" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Github Urliniz Düzeenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tinder.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}



{/* githubu */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="github" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Github Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tinder.com/hibricard'
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
  )
}


{/* Ello düzenle */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="ello" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Ello Urliniz Düzenle.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tinder.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* ELLO */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="ello" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Ello Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tinder.com/hibricard'
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
  )
}

{/* vimeo düzenle */}


{
  this.state.newDtata !==null && this.state.newDtata.namekon==="vimeo" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Vimeo Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tinder.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* VİMOE */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="vimeo" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Vimeo Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tinder.com/hibricard'
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
  )
}


{/* Dribble düzenle */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="dribbble" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Dribbble Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tinder.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* DRİBBLE */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="dribbble" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Dribbble Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tinder.com/hibricard'
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
  )
}

{/* instagram düzenle */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="instagram" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   İnstagram Kullanıcı Adınız Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn:hibricard'
            
              />

       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* instagram */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="instagram" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   İnstagram Kullanıcı Adınız Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn:hibricard'
            
              />

       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleinstagramSubmit} color="primary">
           Ekle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* daily motin düzenleyin */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="dailymotion" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Dailymotion Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: dailymotion.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* DAİLYMOTİON */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="dailymotion" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Dailymotion Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tinder.com/hibricard'
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
  )
}


{/* c2 düzenleyin  */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="c2" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   C2 Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tinder.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}


{/* c2 */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="c2" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   C2 Urliniz Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tinder.com/hibricard'
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
  )
}


{/* tinder düzenleyin  */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="tinder" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Tinder Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tinder.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* tinder */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="tinder" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Tinder Urliniz Ekleyin
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: tinder.com/hibricard'
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
  )
}


{/* dlive düzenleyin */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="dlive" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
      Dlive Urliniz Düzenleyin
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
// value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: dlive.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}


{/* dlive */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="dlive" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
      Dlive Urliniz Ekle
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn: dlive.com/hibricard'
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
  )
}


{/* dizcord düzenleyin */}

{
  this.state.newDtata !==null && this.state.newDtata.namekon==="discord" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
      Discord Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn:discord.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* discord */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="discord" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
      Discord Urliniz Ekle
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn:discord.com/hibricard'
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
  )
}

{/* bip düzenelyin */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="bip" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
      Bip Urliniz Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
 //value={this.state.UrlLinki}
 fullWidth
 placeholder='örn:telegram.com/hibricard'
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
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}


{/* bip */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="bip" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
      Bip Urliniz Ekle
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='örn:telegram.com/hibricard'
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
  )
}



{/* telegram Düzeenleyin */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="telegram" && this.state.newDtata.linkUrlAll.length >= 1 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
      Telegram Kullanıcı Adınız Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
// value={this.state.UrlLinki}
 fullWidth
 placeholder='hibricard'
              />

       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} color="primary">
           Düzenle
       </Button>
   </DialogActions>

          </Dialog>
  )
}

{/* telegram */}
{
  this.state.newDtata !==null && this.state.newDtata.namekon==="telegram" && this.state.newDtata.linkUrlAll.length === 0 &&
  (
    <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
      Telegram Kullanıcı Adınız Ekleyin
   </DialogTitle>
   <DialogContent>
   <form >
              <TextField
 name="UrlLinki"
 type="text"
 error={errors.Hata ? true : false}
 helperText={errors.Hata}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.UrlLinki}
 fullWidth
 placeholder='hibricard'
              />

       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handletelegramSubmit} color="primary">
           Ekle
       </Button>
   </DialogActions>

          </Dialog>
  )
}



        </Fragment>

    )
  }
}

Konlar.propTypes={
    submitSocailMediaUrl:PropTypes.func.isRequired,
    editUserSocialkonlar: PropTypes.func.isRequired,
    submitWhatsappUrl: PropTypes.func.isRequired,
    submitinstagramUrl:PropTypes.func.isRequired,
    submittelegramUrl:PropTypes.func.isRequired,
    submitFacebookUrl: PropTypes.func.isRequired,
    submitwitterUrl:PropTypes.func.isRequired,
    likeScream:PropTypes.func.isRequired,
    unlikeScream:PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
    openDialog:PropTypes.bool,
    UI: PropTypes.object.isRequired,
    clearErrors:PropTypes.func.isRequired,
    ikon:PropTypes.object.isRequired,
    Scream:PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    idx:PropTypes.string.isRequired,
    getSocialKkonsUrl:PropTypes.func.isRequired,
    tumIkon:PropTypes.object.isRequired,


}

 const mapStateToProps=state=>({

    user:state.user,
    UI: state.UI,
    tumIkon:state.data.ikon,
    credentials:state.user.credentials
})
const mapActionsToProps ={
    likeScream,
    unlikeScream,
    submitSocailMediaUrl,
    editUserSocialkonlar,
    submitWhatsappUrl,
    submitinstagramUrl,
    submittelegramUrl,
    submitwitterUrl,
    submitFacebookUrl,
    clearErrors,
    getSocialKkonsUrl,


}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Konlar))
