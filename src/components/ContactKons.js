import React, { Component, Fragment } from 'react'

import { withStyles } from '@material-ui/styles';
import {Link} from "react-router-dom";
import MyButton from '../util/MyButton';

import { Grid, } from "@mui/material";

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
import {submitContactMediaUrl,clearErrors,submitContactOnly,editUserConatactkonlar} from "../redux/actions/dataActions"
//code countries here

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


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
    errors: {},
    newDtata:null,
    couleurdIkon:false,
    oldPath: '',
    newPath: '',
    dataCheck:false
    
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
        const newPath = `/kullanici/ContactsIkons/${this.props.ikon.ikonId}`;
        
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
        this.props.submitContactMediaUrl(this.props.ikon.ikonId, { UrlLinki: this.state.UrlLinki });
       
      }; 

      // UrlLinki:this.state.UrlLinki
       // düzenle
       handleSubmitDuzenle=(event)=>{

        event.preventDefault();
        const userDetails={
          UrlLinki:this.state.phone
        };
        this.props.editUserConatactkonlar(this.state.newDtata.linkUrlAll.find(x=> x.linkIdBurada).linkIdBurada, userDetails);

        console.log("logo part:",this.state.phone)
         
       // console.log("gitti:", this.state.newDtata.linkUrlAll.find(x=> x.linkIdBurada).linkIdBurada)
        
      }

      handleSubmitOnlyContact=(event)=>{
         event.preventDefault();
        this.props.submitContactOnly(this.props.ikon.ikonId, { UrlLinki: this.state.phone })
        //console.log(this.state.phone)
      }

                
//get social getir
getSocialBilgi=()=>{
  axios
  .get(`/iletisimKonsandUrl/${this.props.ikon.ikonId}`).then((res)=>{
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
      const {classes, ikon:{ ikonId,userHandle,ikonImage,ikonUrl,urlVar},
    user:{
        authenticated,
    },
    tumIkon:{linkUrlAll,screamid }
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




{/* arama düzenle */}

{
             this.state.newDtata !==null && this.state.newDtata.namekon==="arama" && this.state.newDtata.linkUrlAll.length >= 1 && (
              <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
       Aranacak Numaranız Düzenleyin.
   </DialogTitle>
   <DialogContent>
   <form>

   {/* <TextField
              name="UrlLinki"
              type="text"
              error={errors.Hata ? true : false}
              helperText={errors.Hata}
              className={classes.textField}
              onChange={this.handleChange}
              defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
              //value={this.state.UrlLinki}
              fullWidth
              inputProps={{ maxLength: 11 }}
              label="Lütfen Telefon Numaranız Giriniz!"
              placeholder='örn:5351035340'

            //        InputProps={{
            //   startAdornment: <InputAdornment position="start" >+90</InputAdornment>,
            // }}
                           /> */}
             

<PhoneInput
  country={'tr'}
  //value={this.state.phone}
  value={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
  onChange={phone => this.setState({ phone })}
  //onChange={this.handleChange}

  name="UrlLinki"
  
  error={errors.Hata ? true : false}
  helperText={errors.Hata}
  fullWidth
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
  
  {/* aramam here */}
           {
             this.state.newDtata !==null && this.state.newDtata.namekon==="arama" && this.state.newDtata.linkUrlAll.length === 0 && (
              <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle style={{margin:"30px"}}>
       Aranacak Numaranız Ekleyin.
   </DialogTitle>
   <DialogContent>
   <form>
              {/* <TextField
              name="UrlLinki"
              type="text"
              error={errors.Hata ? true : false}
              helperText={errors.Hata}
              className={classes.textField}
              onChange={this.handleChange}
              value={this.state.UrlLinki}
              fullWidth
              inputProps={{ maxLength: 11 }}
              label="Lütfen Telefon Numaranız Giriniz!"
              placeholder='örn:5351035340'

                   InputProps={{
              startAdornment: <InputAdornment position="start" >+90</InputAdornment>,
            }}
                           /> */}

<PhoneInput
  country={'tr'}
  value={this.state.phone}
  onChange={phone => this.setState({ phone })}
  name="UrlLinki"
  error={errors.Hata ? true : false}
  helperText={errors.Hata}
  
  fullWidth
  
/>

</form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitOnlyContact} color="primary">
           Ekle
       </Button>
   </DialogActions>

          </Dialog>

             )


           }   

           {/* mail düzenle */}

           {
             this.state.newDtata !==null && this.state.newDtata.namekon==="mail" && this.state.newDtata.linkUrlAll.length >= 1 && (

              <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              fullWidth
              maxWidth="sm">
       <DialogTitle style={{margin:"30px"}}>
           Emailinizi Düzenleyin.
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
           defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
              //value={this.state.UrlLinki}
              fullWidth
              label="Lütfen E-Posta Adresiniz Giriniz!"
              placeholder='E-Posta Adresiniz'
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

           

           {/* mail buarrada */}

{
             this.state.newDtata !==null && this.state.newDtata.namekon==="mail" && this.state.newDtata.linkUrlAll.length === 0 && (

              <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              fullWidth
              maxWidth="sm">
       <DialogTitle style={{margin:"30px"}}>
           Emailinizi Ekleyin.
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
              label="Lütfen E-Posta Adresiniz Giriniz!"
              placeholder='E-Posta Adresiniz'
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

{/* rehber düzenele */}

{
             this.state.newDtata !==null && this.state.newDtata.namekon==="rehber" && this.state.newDtata.linkUrlAll.length >= 1 && (
              <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              fullWidth
              maxWidth="sm">
       <DialogTitle style={{margin:"30px"}}>
           Rehbere Eklenecek Numaranızı Düzenleyin.
       </DialogTitle>
       <DialogContent>
       <form>
              {/* <TextField
              name="UrlLinki"
              type="text"
              error={errors.Hata ? true : false}
              helperText={errors.Hata}
              className={classes.textField}
              onChange={this.handleChange}
              defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
              // value={this.state.UrlLinki}
              fullWidth
              inputProps={{ maxLength: 11 }}
              label="Lütfen Telefon Numaranız Giriniz!"
              placeholder='örn:5351035340'

              InputProps={{
         startAdornment: <InputAdornment position="start" >+90</InputAdornment>,
       }}
                           /> */}

<PhoneInput
  country={'tr'}
  //value={this.state.phone}
  value={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
  onChange={phone => this.setState({ phone })}
  //onChange={this.handleChange}
  name="UrlLinki"
  error={errors.Hata ? true : false}
  helperText={errors.Hata}
  fullWidth
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



           {/* rehber buarda    */}
{
             this.state.newDtata !==null && this.state.newDtata.namekon==="rehber" && this.state.newDtata.linkUrlAll.length === 0 && (
              <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              fullWidth
              maxWidth="sm">
       <DialogTitle style={{margin:"30px"}}>
           Rehbere Eklenecek Numaranızı Ekleyin.
       </DialogTitle>
       <DialogContent>
       <form>
              {/* <TextField
              name="UrlLinki"
              type="text"
              error={errors.Hata ? true : false}
              helperText={errors.Hata}
              className={classes.textField}
              onChange={this.handleChange}
              value={this.state.UrlLinki}
              fullWidth
              inputProps={{ maxLength: 11 }}
              label="Lütfen Telefon Numaranız Giriniz!"
              placeholder='örn:5351035340'

              InputProps={{
         startAdornment: <InputAdornment position="start" >+90</InputAdornment>,
       }}
                           /> */}

<PhoneInput
  country={'tr'}
  value={this.state.phone}
  onChange={phone => this.setState({ phone })}
  name="UrlLinki"
  error={errors.Hata ? true : false}
  helperText={errors.Hata}
  
  fullWidth
  
/>


                           </form>
   </DialogContent>

   <DialogActions>
       <Button onClick={this.handleClose} color="primary">
           İptal
       </Button>
       <Button onClick={this.handleSubmitOnlyContact} color="primary">
           Ekle
       </Button>
   </DialogActions>

          </Dialog>

             )
           }  



{/* marker düzenle */}
{
             this.state.newDtata !==null && this.state.newDtata.namekon==="marker" && this.state.newDtata.linkUrlAll.length >= 1 && (
              <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              fullWidth
              maxWidth="sm">
       <DialogTitle style={{margin:"30px"}}>
           Adresinizi  Düzenleyin.
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
              defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
              // value={this.state.UrlLinki}
              fullWidth
              label="Lütfen Açık Adresiniz Giriniz!"
             
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


{/* marker burada */}
           
{
             this.state.newDtata !==null && this.state.newDtata.namekon==="marker" && this.state.newDtata.linkUrlAll.length === 0 && (
              <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              fullWidth
              maxWidth="sm">
       <DialogTitle style={{margin:"30px"}}>
           Adresinizi  Ekleyin.
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
              label="Lütfen Açık Adresiniz Giriniz!"
             
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



{/* map düzenle */}

{
             this.state.newDtata !==null && this.state.newDtata.namekon==="map" && this.state.newDtata.linkUrlAll.length >= 1 && (

              <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              fullWidth
              maxWidth="sm">
       <DialogTitle style={{margin:"30px"}}>
         Açık  Adresinizi  Düzenleyin.
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
              defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
              // value={this.state.UrlLinki}
              fullWidth
              label="Lütfen Açık Adresiniz Giriniz!"
             
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


        {/* map baurad              */}
{
             this.state.newDtata !==null && this.state.newDtata.namekon==="map" && this.state.newDtata.linkUrlAll.length === 0 && (

              <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              fullWidth
              maxWidth="sm">
       <DialogTitle style={{margin:"30px"}}>
         Açık  Adresinizi  Ekleyin.
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
              label="Lütfen Açık Adresiniz Giriniz!"
             
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



{/* webbilgi düzenele */}

{
             this.state.newDtata !==null && this.state.newDtata.namekon==="webbilgi" && this.state.newDtata.linkUrlAll.length >= 1 && (

              <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              fullWidth
              maxWidth="sm">
       <DialogTitle style={{margin:"30px"}}>
           Web sayfanız Düzenleyin.
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
              defaultValue={this.state.newDtata.linkUrlAll.find(x=> x.UrlLinki).UrlLinki}
              // value={this.state.UrlLinki}
              fullWidth
              placeholder='www.hibritcard.com'
              label="Lütfen web siteniz Giriniz!"
          
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

{/* webbilgi baurada */}
                               
{
             this.state.newDtata !==null && this.state.newDtata.namekon==="webbilgi" && this.state.newDtata.linkUrlAll.length === 0 && (

              <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              fullWidth
              maxWidth="sm">
       <DialogTitle style={{margin:"30px"}}>
           Web sayfanız Ekleyin.
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
              placeholder='www.hibritcard.com'
              label="Lütfen web siteniz Giriniz!"
          
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






              

            

              
              
            
          
      
        </Fragment>

    )
  }
}

Scream.propTypes={
    submitContactMediaUrl:PropTypes.func.isRequired,
    editUserConatactkonlar:PropTypes.func.isRequired,
    submitContactOnly:PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    Scream:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
    openDialog:PropTypes.bool,
    screamId: PropTypes.string.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors:PropTypes.func.isRequired,
    iletIkon:PropTypes.object.isRequired,
    idx:PropTypes.string.isRequired,
    tumIkon:PropTypes.object.isRequired,
}

 const mapStateToProps=state=>({

    user:state.user,
    UI: state.UI,
    tumIkon:state.data.ikon
})
const mapActionsToProps ={
    
    submitContactMediaUrl,
    editUserConatactkonlar,
    submitContactOnly,
    clearErrors

}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream))
