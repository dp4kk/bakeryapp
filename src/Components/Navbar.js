import React, { useContext } from 'react'
import { AppBar, Badge,  IconButton, Menu, Toolbar, Typography,MenuItem, Button } from '@material-ui/core'
import StoreIcon from "@material-ui/icons/Store";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import {useStyles} from '../Styles/styles'
import {AppContext} from '../Context/Datacontext'
import {useHistory} from 'react-router-dom'
import Search from './Search'
import {withRouter} from 'react-router-dom'
import {FirebaseContext} from '../Firebase/AuthProvider'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const Navbar = (props) => {
    const history=useHistory()
   const {
     totalCount,
     handleLoginOpen,
     anchorEl,
     handleAnchorClick,
     handleAnchorClose,
     handleSignupOpen,
     anchortwo,
     handleAnchorClicktwo,
     handleAnchorClosetwo,
     setAnchortwo
   } = useContext(AppContext);
   const {logout,currentUser}=useContext(FirebaseContext)
   const classes=useStyles()
   //using path so that search is not seen in cart page using withRouter
   const path=props.location.pathname;

   const homeClick=()=>{
     history.push('/');
     window.location.reload();
   }
   
     const handleCakeClick = () => {
       history.push("/cake");
       setAnchortwo(null);
            };

       const handleCupcakeClick = () => {
         history.push("/cupcake");
         setAnchortwo(null);
       };      
   
        const handleBreadClick = () => {
          history.push("/bread");
          setAnchortwo(null);
        };
    return (
      <React.Fragment>
        <div className={classes.root}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <IconButton color="inherit" onClick={homeClick} className={classes.title}>
                <Typography variant="h6"  noWrap>
                  Bakery
                </Typography>
                <StoreIcon fontSize="large" />
              </IconButton>

              {path !== "/cart" && <Search />}

              <Button color="inherit" onClick={handleAnchorClicktwo}>
                Categories
                <ExpandMoreIcon />
              </Button>

              <div className={classes.root} />
              {currentUser && <Typography variant='subtitle1'>{currentUser.displayName} </Typography>}
              <div className={classes.lastIcon}>
                <IconButton
                  color="inherit"
                  onClick={() => history.push("/cart")}
                >
                  <Badge badgeContent={totalCount} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={!currentUser ? handleAnchorClick : null}
                >
                  <AccountCircleIcon />
                </IconButton>

                <IconButton
                  color={currentUser ? "inherit" : "default"}
                  onClick={logout}
                >
                  <PowerSettingsNewIcon />
                </IconButton>
              </div>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleAnchorClose}
              >
                <MenuItem onClick={handleLoginOpen}>Login</MenuItem>
                <MenuItem onClick={handleSignupOpen}>Sign up</MenuItem>
              </Menu>
              <Menu
                anchorEl={anchortwo}
                keepMounted
                open={Boolean(anchortwo)}
                onClose={handleAnchorClosetwo}
              >
                <MenuItem onClick={handleCakeClick}>Cake</MenuItem>
                <MenuItem onClick={handleCupcakeClick}>Cupcake</MenuItem>
                <MenuItem onClick={handleBreadClick}>Bread</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </div>
      </React.Fragment>
    );
}

export default withRouter(Navbar)
