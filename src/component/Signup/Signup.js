import React, { useState } from "react";
import { TextField, Button, Typography, Box, Container, Paper, Grid2 } from "@mui/material";
import "./Signup.scss";
import imgLogo from '../../Assest/signup_google.jpg';
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import { signupApiCall } from "../../utils/Api";

const Signup = () => {

  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  
  const nameRegex = /^[a-zA-Z]{2,}$/; 
  const usernameRegex = /^[a-zA-Z0-9.]{3,}$/; 
  const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/;

  const handleSignup = (e) => {
    e.preventDefault();
    let isValid = true;

    
    if (!nameRegex.test(firstName)) {
      setFirstNameError("First name must be at least 2 alphabetic characters");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    
    if (!nameRegex.test(lastName)) {
      setLastNameError("Last name must be at least 2 alphabetic characters");
      isValid = false;
    } else {
      setLastNameError("");
    }

  


    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (isValid) {
      signupApiCall({ firstName, lastName, email : username, "service": "advance", password });
    }
  };

  return (
    <Container component="main" maxWidth="md" className="signup-container">
      <Paper elevation={3} className="signup-paper">
        <Grid2 container spacing={2}>
          <Grid2 margin={2} className="signup-left">
            <Typography variant="h5" className="signup-title">Fundo</Typography>
            <Typography variant="h6" className="signup-subtitle">Create your Fundo Account</Typography>

            <Box component="form" className="signup-form">
              <Grid2 container spacing={2}>
                <Grid2>
                  <TextField
                    fullwidth = "true"
                    label="First Name"
                    variant="outlined"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    error={!!firstNameError}
                    helperText={firstNameError}
                  />
                </Grid2>
                <Grid2>
                  <TextField
                    fullwidth = "true"
                    label="Last Name"
                    variant="outlined"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    error={!!lastNameError}
                    helperText={lastNameError}
                  />
                </Grid2>
                <Grid2 className="signup-user">
                  <TextField
                    className="signup-username"
                    label="Username"
                    variant="outlined"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!usernameError}
                    helperText={usernameError}
                  />
                  <Typography variant="caption" color="textSecondary" className="signup-txt">
                    You can use letters, numbers & periods
                  </Typography>
                </Grid2>
                <Grid2>
                  <TextField
                    fullwidth = "true"
                    label="Password"
                    type="password"
                    variant="outlined"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!passwordError}
                    helperText={passwordError}
                  />
                </Grid2>
                <Grid2>
                  <TextField
                    fullwidth = "true"
                    label="Confirm"
                    type="password"
                    variant="outlined"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!confirmPasswordError}
                    helperText={confirmPasswordError}
                  />
                </Grid2>
                <Grid2>
                  <Typography variant="caption" color="textSecondary">
                    Use 8 or more characters with a mix of letters, numbers & symbols
                  </Typography>
                </Grid2>
              </Grid2>

              <Box className="signup-actions">
                <MuiLink component={RouterLink} to="/" variant="body2" sx={{textDecoration:"none"}}>
                  Sign in instead
                </MuiLink>
                <Button onClick={handleSignup} type="submit" variant="contained" color="primary">
                  Register
                </Button>
              </Box>
            </Box>
          </Grid2>

          
          <Grid2 className="signup-right">
            <img
              src={imgLogo}
              alt="Fundo Logo"
              className="signup-image"
            />
            <Typography fullwidth = "true" className="signup-img-text" variant="body2">
              One account. All of Fundo
            </Typography>
            <Typography className="signup-img-text" variant="body2">
              working for you.
            </Typography>
          </Grid2>
        </Grid2>
      </Paper>

      <Box className="footer">
        <Typography variant="caption" className="language-selection">
          English (United States)
        </Typography>
        <Box className="footer-links">
          <MuiLink component={RouterLink} to="#" variant="caption">Help</MuiLink>
          <MuiLink component={RouterLink} to="#" variant="caption">Privacy</MuiLink>
          <MuiLink component={RouterLink} to="#" variant="caption">Terms</MuiLink>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;