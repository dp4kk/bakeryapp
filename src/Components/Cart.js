import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Snackbar,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { AppContext } from "../Context/Datacontext";
import CartProducts from "../Components/CartProducts";
import StripeCheckout from "react-stripe-checkout";
import Alert from "@material-ui/lab/Alert";
import { FirebaseContext } from "../Firebase/AuthProvider";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
  },
  paper: {
    height: 250,
    width: 350,
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(10),
  },
  quantity: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(2),
  },
  checkout: {
    width: 350,
  },
}));
const Cart = () => {
  const classes = useStyles();
  const {
    cartItems,
    totalAmount,
    totalCount,
    transactionMsg,
    setTransactionMsg,
    clearCart,
  } = useContext(AppContext);
  console.log(cartItems);
  const { currentUser } = useContext(FirebaseContext);
  const payment = (token) => {
    const body = {
      token,
      cartItems,
      totalAmount,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`https://bakery-ecommerce.herokuapp.com/stripe`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        //add snacbar lateron
        clearCart();
        setTransactionMsg(true);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setTransactionMsg(false);
  };



  return (
    <div>
      <Grid container className={classes.container}>
        <Grid item style={{ width: "50%" }}>
          {cartItems.map((item) => {
            return <CartProducts item={item} key={item.id} />;
          })}
        </Grid>
        <Grid item>
          <Paper className={classes.paper} elevation={3}>
            <Typography variant="h4" align="center" color="textSecondary">
              Price Details{" "}
            </Typography>
            <Divider />
            <div className={classes.quantity}>
              <Typography variant="h5" align="center" color="textSecondary">
                Total Items
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary">
                {totalCount}
              </Typography>
            </div>
            <div className={classes.quantity}>
              <Typography variant="h5" align="center" color="textSecondary">
                Total Amount
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary">
                ${totalAmount}
              </Typography>
            </div>
            <div className={classes.quantity}>
              <Typography variant="h5" align="center" color="textSecondary">
                Delivery Charge
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary">
                NA
              </Typography>
            </div>
            <Divider variant="middle" />
            <div className={classes.quantity}>
              <Typography variant="h5" align="center" color="textSecondary">
                SubTotal
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary">
                ${totalAmount}
              </Typography>
            </div>
          </Paper>
          {currentUser ? (
            <StripeCheckout
              name="Checkout"
              stripeKey="pk_test_51IfdqMSHF9ykvL0UG9tLmVtC8sRzv9khLPc135KMHJnEAmqwl60Z2AspTM41b8XtTgnE9UtNYP8CXi3cYEyDzBMk00UDlygWWJ"
              amount={totalAmount * 100}
              token={payment}
              shippingAddress
              billingAddress
            >
              <Button
                color="primary"
                variant="contained"
                className={classes.checkout}
              >
                CheckOut
              </Button>
            </StripeCheckout>
          ) : (
            <Typography variant="h6" color="textSecondary">
              *Login to checkout
            </Typography>
          )}
        </Grid>
      </Grid>

      <Snackbar
        open={transactionMsg}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <Alert severity="success">Transaction successful</Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;
