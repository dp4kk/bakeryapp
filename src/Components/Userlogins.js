import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/Datacontext";
import { FirebaseContext } from "../Firebase/AuthProvider";

const Userlogins = () => {
  //snackbar
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [donotMatch, setDonotMatch] = useState(false);
  const {
    loginOpen,
    handleLoginClose,
    signupOpen,
    handleSignupClose,
    loginEmail,
    setLoginEmail,
    handleLoginEmailChange,
    loginPassword,
    setLoginPassword,
    handleLoginPasswordChange,
    signupEmail,
    setSignupEmail,
    handleSignupEmailChange,
    signupPassword,
    setSignupPassword,
    handleSignupPasswordChange,
    confirmPassword,
    setConfirmPassword,
    handleConfirmPasswordChange,
    setLoginOpen,
    setSignupOpen,
  } = useContext(AppContext);

  const { signup, login, error, setError, setUserName } =
    useContext(FirebaseContext);

  useEffect(() => {
    if (error.message) {
      setOpen(true);
    }
  }, [error]);

  const handleLogin = async (e, email, password) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      setOpen(true);
    } catch (error) {
      console.log(error.message);
      //   window.alert("incorrect credential");
      setError(error);
      setOpen(true);
    }
    setLoginPassword("");
    setLoginEmail("");
    setLoginOpen(false);
  };

  const handleSignup = async (e, email, password, confirmPassword) => {
    e.preventDefault();
    setError("");
    setDonotMatch(false);
    if (password === confirmPassword) {
      try {
        await signup(email, password);
        await setUserName(name);
        setOpen(true);
        setSignupOpen(false);
        setSignupPassword("");
        setSignupEmail("");
        setConfirmPassword("");
        setName("");
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setDonotMatch(true);
      setOpen(true);
      setSignupOpen(true);
    }
  };

  const handleGuestLogin=()=>{
    setLoginEmail('guestlogin@test.com')
    setLoginPassword('guestlogin123')
  }
  return (
    <div>
      <Dialog open={loginOpen} onClose={handleLoginClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
              spellCheck="false"
              value={loginEmail}
              onChange={handleLoginEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={loginPassword}
              onChange={handleLoginPasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(e) => handleLogin(e, loginEmail, loginPassword)}
            >
              Login
            </Button>
          </form>
          <Button style={{ textTransform: "none" }} onClick={handleGuestLogin}>
            <Typography variant="subtitle1" align="left" color="textSecondary">
              Guest Credentials
            </Typography>
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={signupOpen} onClose={handleSignupClose}>
        <DialogTitle>Sign up</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="User Name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              spellCheck="false"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              spellCheck="false"
              value={signupEmail}
              onChange={handleSignupEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={signupPassword}
              onChange={handleSignupPasswordChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label="Confirm Password"
              type="password"
              id="confirmpassword"
              autoComplete="current-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(e) => handleSignup(e, signupEmail, signupPassword, confirmPassword)}
            >
              Sign up
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {error ? (
        <Snackbar
          autoHideDuration={3000}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <Alert severity="error">{error.message}</Alert>
        </Snackbar>
      ) : (
        <Snackbar
          autoHideDuration={3000}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <Alert severity="success">Logged In </Alert>
        </Snackbar>
      )}
      {donotMatch ? (
        <Snackbar
          autoHideDuration={3000}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <Alert severity="error">Passwords donot match</Alert>
        </Snackbar>
      ) : null}
    </div>
  );
};

export default Userlogins;
