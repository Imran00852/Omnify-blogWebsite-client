import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileDrawer = ({ open, onClose, onLogout }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Blogs", path: "/blogs" },
    { label: "About", path: "/about" },
  ];

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{ width: 240, p: 2 }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        {/* Menu Items */}
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ textAlign: "center" }}>
          {user ? (
            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              onClick={onLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                color="inherit"
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "#ff9800" }}
                onClick={() => navigate("/register")}
              >
                Signup
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
