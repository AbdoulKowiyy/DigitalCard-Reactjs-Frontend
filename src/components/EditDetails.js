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


//Redux
import {connect} from "react-redux"
import {editUserDetails} from "../redux/actions/userActions"
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
})

class EditDetails extends Component {

state={
    bio:"",
    website:"",
    location:"",
    company:"",
    position:"",
    phoneNumber:"",
    open:false
};

handleOpen=()=>{
    this.setState({
        open:true
    })
    this.mapUserDetailsToState(this.props.credentials)
}

componentDidMount(){
    const {credentials}= this.props;
    this.mapUserDetailsToState(credentials)
    
}

handleClose=()=>{
    this.setState({open:false})
}


// bilgiler ayarı
mapUserDetailsToState=(credentials)=>{

    this.setState({
        bio:credentials.bio ? credentials.bio :"",
        website: credentials.website? credentials.website:"",
        location: credentials.location ? credentials.location: "",
        company: credentials.company ? credentials.company: "",
        position: credentials.position ? credentials.position: "",
        phoneNumber: credentials.phoneNumber ? credentials.position: ""
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
          location: this.state.location,
          company: this.state.company,
          position: this.state.position,
          phoneNumber: this.state.phoneNumber
      };
      this.props.editUserDetails(userDetails);
      this.handleClose()
  }



  render() {
    const { classes } = this.props;
    return (
      <Fragment>
          <Tooltip title="Bilgiler Güncelle">
              <IconButton onClick={this.handleOpen} className={classes.button}>
                  <EditIcon color="primary"/>
              </IconButton>

          </Tooltip>
          
          <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
   <DialogTitle>
       Bilgilerini Güncelle
   </DialogTitle>
   <DialogContent>
       <form>
           <TextField
           name="bio"
           type="text"
           label="özgeçmiş"
           multiline
           rows="3"
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
           name="location"
           type="text"
           label="Konum"
           placeholder="Nerde yaşıyorsunuz ??"
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

EditDetails.propTypes={
    editUserDetails:PropTypes.func.isRequired,
    classes:PropTypes.object.isRequired
}


const mapStateToProps=(state)=>({
    credentials:state.user.credentials
})

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails))
