import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import "./Login.scss";
import { loginApiCall } from "../../utils/Api";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleLogin = () => {
    let isValid = true;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    

    if (isValid) {
      console.log("Attempting login with:", email, password);
      loginApiCall({ email, password })
        .then((res) => {
          console.log("Login Response:", res);
          toast.success("Login successful!", {
            position: "top-right",
            autoClose: 3000, 
          });
          setTimeout(() => {
            navigate("/dashboard/notes");
          }, 3000);
        })
        .catch((err) => {
          toast.error(`Login failed: ${err.message}`, {
            position: "top-right",
            autoClose: 3000,
          });
          console.error("Login error:", err.message);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="login-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <Paper elevation={3} className="login-paper">
        <Typography variant="h5" className="login-title">
          Fundo
        </Typography>
        <Typography variant="h6">Sign in</Typography>
        <Typography variant="body2" color="textSecondary">
          Use your Fundo Account
        </Typography>

        <Box component="form" className="login-form">
          <TextField
            fullWidth
            label="Email or phone"
            variant="outlined"
            margin="normal"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />
          <MuiLink
            component={RouterLink}
            to="#"
            variant="body2"
            className="forgot-password"
            sx={{ textDecoration: "none" }}
          >
            Forgot password
          </MuiLink>
          <Box className="login-actions">
            <MuiLink
              component={RouterLink}
              to="/signup"
              variant="body2"
              className="create-account"
              sx={{ textDecoration: "none" }}
            >
              Create account
            </MuiLink>
            <Button
              variant="contained"
              color="primary"
              className="login-button"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
      <Box className="footer-container">
        <Typography variant="caption" className="language-selection">
          English (United States)
        </Typography>
        <Box className="footer-links">
          <MuiLink component={RouterLink} to="#" variant="caption">
            Help
          </MuiLink>
          <MuiLink component={RouterLink} to="#" variant="caption">
            Privacy
          </MuiLink>
          <MuiLink component={RouterLink} to="#" variant="caption">
            Terms
          </MuiLink>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;