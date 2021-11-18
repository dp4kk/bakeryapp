import { Avatar, Card, CardContent, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {AppContext} from '../Context/Datacontext'


const useStyles=makeStyles((theme)=>({
    root:{
        display:'flex',
        marginBottom:theme.spacing(2),
        marginTop:theme.spacing(4)
    },
    spacing:{
      flexGrow:1
    },
    look:{
        display:'flex',
        flexDirection:'column'
    },
    media:{
        height:100,
        maxWidth:100
    },
    content:{
        flex:'1 0 auto'
    },
    buttons:{
        display:'flex',
        alignItems:'center',
        marginLeft:theme.spacing(2)
    },
    removebutton:{
      marginLeft:theme.spacing(4)
    },
    avatar:{
      width:theme.spacing(12),
      height:theme.spacing(12),
      marginLeft:theme.spacing(3)
    }
}))
const CartProducts = ({item}) => {

    const{increase,decrease,removeProduct}=useContext(AppContext)  

    const classes=useStyles()
    return (
      <Card className={classes.root}>
        
        <Avatar src={item.image} className={classes.avatar} />
        <Typography
          variant="h6"
          color="textSecondary"
          className={classes.buttons}
        >
          {item.name}
        </Typography>
        <div className={classes.spacing} />
        <Typography
          variant="h6"
          color="textSecondary"
          className={classes.buttons}
        >
          ${item.price}
        </Typography>
        <div>
          <CardContent>
            <div className={classes.buttons}>
              <IconButton
                color="primary"
                onClick={() => {
                  if (item.quantity > 1) {
                    decrease(item);
                  }
                }}
              >
                <RemoveCircleOutlineIcon fontSize="large" />
              </IconButton>
              <Typography variant="h6" color="textSecondary">
                {item.quantity}
              </Typography>
              <IconButton color="primary" onClick={() => increase(item)}>
                <AddCircleOutlineIcon fontSize="large" />
              </IconButton>
              <IconButton
                className={classes.removebutton}
                color="secondary"
                onClick={() => removeProduct(item)}
              >
                <DeleteForeverIcon fontSize="large" />
              </IconButton>
            </div>
          </CardContent>
        </div>
      </Card>
    );
}

export default CartProducts
