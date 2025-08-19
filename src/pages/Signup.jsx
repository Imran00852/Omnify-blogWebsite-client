import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";

import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userNotExist, userExist } from "../redux/reducers/auth";
import axios from "axios";
import { url } from "../constants/config";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${url}/users/register`,
        { name, email, password },
        { withCredentials: true }
      );
      toast.success(data?.msg);
      dispatch(userExist(data?.user));
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Signup Failed!");
      dispatch(userNotExist());
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ borderRadius: 3, p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Create an Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            type="text"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, backgroundColor: "#ff9800" }}
          >
            Signup
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
