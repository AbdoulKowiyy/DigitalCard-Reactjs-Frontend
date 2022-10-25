import React, { Component, Fragment } from 'react'

import { withStyles } from '@material-ui/styles';
import {Link} from "react-router-dom";
import MyButton from '../util/MyButton';

import { Grid, } from "@mui/material";
import CircularProgress from '@material-ui/core/CircularProgress';

//Icons
import ChatIcon from "@material-ui/icons/Chat"
import { InputAdornment } from "@material-ui/core";
import axios from 'axios';


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
import {submitBankaMediaInfo,clearErrors,editUserBankakonlar} from "../redux/actions/dataActions"


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
        
    },
    bankaBilgileri:{
      padding:"10px"
    },
    progressSpinner: {
      position: 'absolute'
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
        iban: '',
        hesabSahibi:"",
        hesapNumarasi:"",
    errors: {},
    newDtata:null,
    couleurdIkon:false,
    oldPath: '',
    newPath: ''
    
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
//when the widow open change Url
let oldPath = window.location.pathname;
 
const { userHandle, userId } = this.props;
const newPath = `/kullanici/BankaBilgi/${this.props.ikon.ikonId}`;

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

      handleSubmitDuzenle=(event)=>{
        event.preventDefault();
        const userDetails={
          hesabSahibi:this.state.hesabSahibi,
          hesapNumarasi:this.state.hesapNumarasi,
          iban:this.state.iban
        };
        this.props.editUserBankakonlar(this.state.newDtata.linkUrlAll.find(x=> x.linkIdBurada).linkIdBurada, userDetails);
         
       // console.log("gitti:", this.state.newDtata.linkUrlAll.find(x=> x.linkIdBurada).linkIdBurada)
        
      }

      handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitBankaMediaInfo(this.props.ikon.ikonId, { iban: this.state.iban , hesabSahibi :this.state.hesabSahibi , hesapNumarasi:this.state.hesapNumarasi });
        
        //window.location.reload(false);
      }; 

           
//get social getir
getSocialBilgi=()=>{
  axios
  .get(`/bankaKonsandUrl/${this.props.ikon.ikonId}`).then((res)=>{
    this.setState({
      newDtata: {...res.data , id:this.props.ikon.ikonId}
    })
    if(this.state.newDtata.linkUrlAll.length > 0){
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
      const {classes, ikon:{ ikonId,userHandle,ikonImage,ikonUrl,urlVar },
    user:{
        authenticated,
       
    },
    tumIkon:{linkUrlAll,screamid },
    UI:{loading }
    }=this.props
    
    const errors = this.state.errors;
    //const iconColor = urlVar ? 'saturate(3)' : 'grayscale(100%)';
    const iconColor = this.state.couleurdIkon ? 'saturate(3)' : 'grayscale(100%)';

     
      
    return (
        <Fragment>

<Grid  item xs={4} md={1} sm={2}>
  <div className="icondiv" onClick={(event)=>{this.handleIkonColor(event,this.props.idx) ;this.handleOpen(event); }} >
    <img src={ikonImage}  alt="Hibritmedya" className={classes.iconlar} style={{ filter: iconColor}} />
  </div>
</Grid>


{/* iş bankası düzenle */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="isbankasi" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   İŞ Bankası Bilgileri Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
 //value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

   

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
 //value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={12} md={12} sm={12} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
 //value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}


{/* İŞ BANKASI */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="isbankasi" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   İŞ Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

   

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
 
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={12} md={12} sm={12} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 className={classes.textField}
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* İng bankası düzenleyin */}


{
   this.state.newDtata !==null && this.state.newDtata.namekon==="ingbank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
    ING Bankası Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
 //value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
 //value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={12} md={12} sm={12} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
 //value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* İNG */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="ingbank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
    ING Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={12} md={12} sm={12} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}


{/* illerbankası düzenle */}

{
   this.state.newDtata !==null && this.state.newDtata.namekon==="illerbankası" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
    İller Bankası Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
 //value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

   

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
 //value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={12} md={12} sm={12} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
 //value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}


{/* illerbankası */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="illerbankası" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
    İller Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

   

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={12} md={12} sm={12} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* Hsbc düzenle */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="hscb" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
    HSCB Bankası Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
 //value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 //value={this.state.hesabSahibi}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}

 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
 //value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
         
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}



{/* HSCB */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="hscb" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
    HSCB Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 className={classes.textField}
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
         
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}


{/* rabo banka düzenle */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="rabobank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Rabo Bankası Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
 //value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
 //value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
//  value={this.state.hesapNumarasi}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}



{/* rabo bankası */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="rabobank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Rabo Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* halkbankası düzenle */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="halkbank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Halk Bankası Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}

//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
 //value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
 //value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}


{/* halk bankası */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="halkbank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Halk Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* qnbfinans Düzenle */}

{
   this.state.newDtata !==null && this.state.newDtata.namekon==="qnbfinans" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   QNB Finans Bankası Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
//  value={this.state.hesabSahibi}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}

 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* qnbfinans */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="qnbfinans" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   QNB Finans Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 className={classes.textField}
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}


{/* odeabank düzenle */}

{
   this.state.newDtata !==null && this.state.newDtata.namekon==="odeabank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Odea Bankası Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
 //value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}

 //value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* odea */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="odeabank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Odea Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 className={classes.textField}
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* kuvveytbankası düzenle */}

{
   this.state.newDtata !==null && this.state.newDtata.namekon==="kuveyturk" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Küvveyt Bankası Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}

//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}

 //value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* kuvveytbankası */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="kuveyturk" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Küvveyt Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}


{/* garanti düzenle */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="garantibank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Garanti Bankası Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}

//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}


{/* granti */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="garantibank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Garanti Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* fibabank düzenele */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="fibabank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Fiba Bankası Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* fibabank */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="fibabank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Fiba Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* deutch düzenle */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="deutshbank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Deutsh Bankası Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}

//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}

//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}

//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}



{/* deutch bank */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="deutshbank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Deutsh Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}



{/* deniz banak düzenle */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="denizbank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Deniz Bankası Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}

//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
//  value={this.state.hesapNumarasi}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}

 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}


{/* deniz bank */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="denizbank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Deniz Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* citi banak düzenle */}

{
   this.state.newDtata !==null && this.state.newDtata.namekon==="citibank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Citie Bankası Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}

//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* citie bankası */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="citibank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Citie Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}


{/* turkish banka düzenle */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="turkishbank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Turkish Bankası Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* turkish bank */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="turkishbank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Turkish Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}
{/* burgan düzenle */}

{
   this.state.newDtata !==null && this.state.newDtata.namekon==="burganbank" && this.state.newDtata.linkUrlAll.length >= 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Burgan Bankası Bilgileri düzenele
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* burgan bankası */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="burganbank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Burgan Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* kalkınma düzenele */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="turkeykalk" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Türkiye Kalkınma  Bankası Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* kalkınma bankası */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="turkeykalk" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Türkiye Kalkınma  Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* teb düzenle */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="teb" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   TEB Bankası Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
//  value={this.state.hesapNumarasi}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}

 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}


{/* tEB */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="teb" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   TEB Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}

 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* birleşik düzenle */}

{
   this.state.newDtata !==null && this.state.newDtata.namekon==="birlesikfon" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Birleşik Fon Bankası Bilgileri Düzeenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* birleşik fon */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="birlesikfon" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Birleşik Fon Bankası Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 className={classes.textField}
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* bank of china düzenle */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="bankofchina" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Bank of China Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}

//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* Bank of China */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="bankofchina" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Bank of China Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}


{/* tbank düzenle */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="tbank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   T Banka Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* tbank */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="tbank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   T Banka Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* şker banakası düzenele */}

{
   this.state.newDtata !==null && this.state.newDtata.namekon==="sekerbank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Şeker Banka Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* Şeker bankası */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="sekerbank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Şeker Banka Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}


{/* anadolu düzenle */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="anadolubank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Anadolu Banka Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}

//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* Anadolu banka */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="anadolubank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Anadolu Banka Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* alternatif banka düzenle */}

{
   this.state.newDtata !==null && this.state.newDtata.namekon==="alternatifbank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Alternatif Banka Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
 onChange={this.handleChange}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}

//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}

//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* Alternatif banka */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="alternatifbank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Alternatif Banka Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 className={classes.textField}
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* ziraatbank düzenle */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="ziraatbank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Ziraat Banka Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}

//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}

//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={12} md={12} sm={12} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}

//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* Ziraat bankası */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="ziraatbank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Ziraat Banka Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    

    <Grid xs={12} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={12} md={12} sm={12} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 className={classes.textField}
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* albaraka bankası düzenele */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="albaraka" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Abaraka Banka Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}

//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* Albaraka banka */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="albaraka" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Abaraka Banka Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}

 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* YapıKredi düzenle */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="yapikredi" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   YapıKredi Banka Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* Yapı kredi */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="yapikredi" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   YapıKredi Banka Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 className={classes.textField}
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* akbnak düzenle */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="akbank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Akbank Banka Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* Akbank */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="akbank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Akbank Banka Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 className={classes.textField}
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* vakifbank düzenle */}

{
   this.state.newDtata !==null && this.state.newDtata.namekon==="vakifbank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Vakıf Banka Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
//  value={this.state.iban}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}
//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* vakif bank */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="vakifbank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Vakıf Banka Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* ada bank düzenle */}

{
   this.state.newDtata !==null && this.state.newDtata.namekon==="adabank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Adabank Banka Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}
//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}
//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}

//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}


{/* Ada banka bilgileri */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="adabank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Adabank Banka Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* aet bankası düzenle */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="aetbank" && this.state.newDtata.linkUrlAll.length >= 1 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Aet Banka Bilgileri Düzenle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.iban).iban}

//  value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesabSahibi).hesabSahibi}

//  value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 
 className={classes.textField}

 onChange={this.handleChange}
 defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.hesapNumarasi).hesapNumarasi}

//  value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitDuzenle} 
       color="primary" disabled={loading} type="submit">
           Düzenle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}

{/* AET BANKASI */}
{
   this.state.newDtata !==null && this.state.newDtata.namekon==="aetbank" && this.state.newDtata.linkUrlAll.length === 0 &&
   (
<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
   Aet Banka Bilgileri Ekle
   </DialogTitle>
   <DialogContent>
   <form>

  <Grid container>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="iban"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.iban}
 fullWidth
 placeholder='Iban'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Iban</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    {/* <TextField
 name="banka"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.banka}
 fullWidth
 placeholder='Banka'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Banka</InputAdornment>,
          //  }}
              /> */}

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>
    <TextField
 name="hesabSahibi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.hesabSahibi}
 fullWidth
 placeholder='Hesap Sahibi'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Sahibi</InputAdornment>,
          //  }}
              />

    </Grid>

    <Grid xs={6} md={6} sm={6} className={classes.bankaBilgileri}>

    <TextField
 name="hesapNumarasi"
 type="text"
 error={errors.Hata1 ? true : false}
 helperText={errors.Hata1}
 className={classes.textField}

 onChange={this.handleChange}
 value={this.state.hesapNumarasi}
 fullWidth
 placeholder='Hesap Numarası'
          //     InputProps={{
          //      startAdornment: <InputAdornment position="start" >Hesap Numarası</InputAdornment>,
          //  }}
              />

    </Grid>

  </Grid>          
          
       </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmit} 
       color="primary" disabled={loading} type="submit">
           Ekle
           {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
       </Button>
   </DialogActions>

          </Dialog>
   )
}


        </Fragment>

    )
  }
}

Scream.propTypes={
    
    user:PropTypes.object.isRequired,
    Scream:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
    openDialog:PropTypes.bool,
    screamId: PropTypes.string.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors:PropTypes.func.isRequired,
    bankIcon:PropTypes.object.isRequired,
    idx:PropTypes.string.isRequired,
    submitBankaMediaInfo:PropTypes.func.isRequired,
    editUserBankakonlar: PropTypes.func.isRequired,
    tumIkon:PropTypes.object.isRequired,
}

 const mapStateToProps=state=>({

    user:state.user,
    UI: state.UI,
    tumIkon:state.data.ikon

})
const mapActionsToProps ={

    clearErrors,
    submitBankaMediaInfo,
    editUserBankakonlar

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream))
