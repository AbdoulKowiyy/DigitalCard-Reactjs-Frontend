import React, { Component } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import  Typography  from '@mui/material/Typography';
import { withStyles } from '@material-ui/styles';
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

const styles={
    card:{
display:"flex",
marginBottom:20
    },
    image:{
    width:100,
    height:100
        
    },
    content:{
        padding:25
    }
}

class Scream extends Component {
  render() {
      dayjs.extend(relativeTime)
      //extract the inside of our crier
      const {classes, screm:{body,createdAt,userImage,likeCount,commentCount,userHandle} }=this.props
      console.log(userImage)//userImage not coming
      
    return (

          <Card className={classes.card}>
              <CardMedia
                  src={userImage}
                  title="Profile İmage" className={classes.image} component='img'/>
                  <CardContent className={classes.content}>
                 <Typography variant='h5' component={Link} to={`/kullanici/${userHandle}`}  color="primary">{userHandle}</Typography>
                 <Typography variant='body2' color="textSecondary" >{dayjs(createdAt).fromNow()}</Typography>
                 <Typography variant='body1' >{body}</Typography>
                  </CardContent>

          </Card>
    
    )
  }
}

export default withStyles(styles)(Scream)
