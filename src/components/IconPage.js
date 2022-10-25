import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid } from "@mui/material";
import instagram from "../images/instagram.png";
import { InputAdornment } from "@material-ui/core";

import {ImageStore} from "../dataImage/ImageStore"



//muı stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';


//Redux
import {connect} from "react-redux"
import {editUserDetails} from "../redux/actions/userActions"
import {postIkonUrl,clearErrors} from "../redux/actions/dataActions"
import { IconButton, Tooltip } from "@mui/material";


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
    IconsButtons:{
        display:"flex",

      "& .socialDiv ": {
        display: "flex",
        marginLeft:"20px !important",
        marginBottom:"30px",
        marginRight:"20px"
      },
      "& .icondiv": {
        margin: "10px",
      },
      "& .iconlar": {
        maxHeight: "50px",
        maxWidth: "50px",
        margin:"0px 5px !important",
        textAlign:"center",
      }
       
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
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    buttonPart:{
        textAlign:"center",
        justifyContent:"center"
    },
    cartPartSocial:{
        "& .cardBilgi": {
          margin: "30px",
        },
        "& .ButtonKontrol":{
backgroundColor:""


        },
        "& .infoTitle": {
          fontSize: "1rem",
          fontFamily: "Roboto,Helvetica,Arial,sans-serif",
          letterSpacing: "0.0075em",
        },"& .socialDiv ": {
          display: "flex",
          marginLeft:"20px !important",
          marginBottom:"30px",
          marginRight:"20px",
          width:"100%"
        },
        "& .icondiv": {
          margin: "10px",
          cursor:"pointer !important",
        },
        "& .iconlar": {
          maxHeight: "50px",
          maxWidth: "50px",
          margin:"0px 5px !important",
          textAlign:"center",
        
        },
        " & .iconlariki":{
          maxHeight: "50px",
          maxWidth: "50px",
          margin:"0px 5px !important",
          textAlign:"center",
          
        },
        "& socialButtonlar": {
          boder: "1px #9E9E9E",
          textAlign: "center",
          
        },
      },



})

let grayColor="grayscale(100%)"
let properColor="saturate(3)"

class EditDetails extends Component {

state={
    Url: '',
    errors: {},
    open:false,
    ikonRengi:false,
    showAllIkonss: false,
    HideSomeIkons:true,
    imageColor:grayColor,
    ikonIndex:0,
    controlCount:0,

};

//Show AllIkons Here
ShowAllIkons=()=>{
    this.setState({
        showAllIkonss:true,
    })

}
//Hide some div
hideSomeDiv=()=>{
    this.setState({
        HideSomeIkons:false

    })
}





// componentDidMount(){
//     const {credentials}= this.props;
//     this.mapUserDetailsToState(credentials)
    
// }




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


componentWillReceiveProps(nextProps) {
  if (nextProps.UI.errors) {
    this.setState({
      errors: nextProps.UI.errors
    });
  }
  if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ Url: '', open: false, errors: {} });
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



  //Tüm Ikomnlar Göster
  TumIkonlariGor=()=>{
    this.setState({
      controlCount:this.state.controlCount+1
    })
    if(this.state.controlCount % 2==0){
      this.setState({
        showAllIkonss:true,
      })
    }else{
      this.setState({
        showAllIkonss:false,
      })
    }
  }

  //Yukarı kısmı gör
  KismiIkonlar=()=>{
    this.setState({
      showAllIkonss:false,
      controlCount:this.state.controlCount+1

    })
  }


  
   //change the icon color
   
   handleIkonColor=(e,id)=>{
    console.log(this.state.ikonRengi)
    this.setState({
      ikonRengi:true,
      ikonIndex:id
    })
    e.target.style.filter="saturate(3)"
    console.log(this.state.ikonRengi)
    console.log("first array",ImageStore[id].urlEndor)
    console.log(id)
    console.log("ikonIndex: ",this.state.ikonIndex)
    
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


  takeCurrentTarget=(e)=>{
    e.target.style.filter="saturate(3)"
  }

  handleSubmit = (e) => {
    
    this.props.postIkonUrl({ Url: this.state.Url });
console.log("here status",this.props.checkikon)
  this.takeCurrentTarget()
if( this.props.checkikon){
 this.takeCurrentTarget(e)
}
   

  };



  render() {

    const {errors}=this.state
    const size=3
    const ImageGet=ImageStore.slice(0, size)
    const { classes,UI:{loading }, ikon:{ userHandle,type,varUrl,Url,ikonId} } = this.props;

    var SomeIcon = ImageGet.map((i,idx) => {
      return <Grid  item xs={4} md={1} sm={2}>
            <div className="icondiv" onClick={(event)=>{this.handleIkonColor(event,idx) ;this.handleOpen(event); }}>
            <img src={i.Images} key={idx} alt="" className="iconlar" />
          </div>
</Grid>
  }); 
  
  var AllIkon= ImageStore.map((e,idx)=>
  {

  return <Grid  item xs={4} md={1} sm={2}>
  <div className="icondiv" onClick={(event)=>{this.handleIkonColor(event,idx) ;this.handleOpen(event); }}>
    <img src={e.Images} key={idx} alt="" className="iconlar" />
    
    {/* className={`${this.state.ikonRengi ? "iconlariki" : "iconlar"}`} */}

  </div>
</Grid>
  }
)
    return (
      <Fragment>
          
          <Grid container  className={classes.cartPartSocial}>
            {
              this.state.showAllIkonss ? AllIkon : SomeIcon
            }
            
          <Grid item className={classes.buttonPart} xs={12}>
             <Button className="ButtonKontrol"  variant="contained" color="secondary" onClick={this.TumIkonlariGor}>{!this.state.showAllIkonss ? "Tümü Göster" : "Kapat"}</Button>
             </Grid>

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
 name="Url"
 type="text"
 error={errors.Body ? true : false}
 helperText={errors.Body}
 className={classes.textField}
 onChange={this.handleChange}
 value={this.state.Url}
 fullWidth
              InputProps={{
               startAdornment: <InputAdornment position="start" >{ImageStore[this.state.ikonIndex].urlEndor}</InputAdornment>,
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

EditDetails.propTypes={
  postIkonUrl:PropTypes.func.isRequired,
    classes:PropTypes.object.isRequired,
    clearErrors:PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    checkikon:PropTypes.bool.isRequired,
     ikon:PropTypes.object.isRequired
}


const mapStateToProps=(state)=>({
  UI: state.UI,
  checkikon:state.data.checkikon,
  data:state.data

})

export default connect(mapStateToProps, {postIkonUrl,clearErrors})(withStyles(styles)(EditDetails))






// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar"  />
//       </div>

// </Grid>

// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>

// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
// <Grid  item xs={4} md={1} sm={2}>
// <div className="icondiv">
//         <img src={instagram} alt="" className="iconlar" />
//       </div>

// </Grid>
