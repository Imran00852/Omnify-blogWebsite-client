import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { url } from "../constants/config";
import { userNotExist } from "../redux/reducers/auth";
import MobileDrawer from "./MobileDrawer"; // ✅ import drawer

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${url}/users/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExist());
      toast.success(data?.msg);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to Logout!");
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ background: "linear-gradient(to right, #673ab7, #2575fcff)" }}
      >
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            MyBlog
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 3 }}>
            <Button onClick={() => navigate("/")} color="inherit">
              Home
            </Button>
            <Button onClick={() => navigate("/blogs")} color="inherit">
              Blogs
            </Button>
            <Button color="inherit">About</Button>
          </Box>

          <Box sx={{ ml: 3, display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {user ? (
              <Button variant="outlined" color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#ff9800" }}
                  onClick={() => navigate("/register")}
                >
                  Signup
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            sx={{ display: { xs: "flex", sm: "none" } }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Header;
