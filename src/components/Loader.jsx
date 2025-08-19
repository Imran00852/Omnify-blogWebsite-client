import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #673ab7, #512da8)",
        color: "white",
      }}
    >
      <CircularProgress
        size={60}
        thickness={4.5}
        sx={{ color: "#ff9800", mb: 3 }}
      />
      <Typography variant="h5" fontWeight="bold">
        Loading MyBlog...
      </Typography>
    </Box>
  );
};

export default Loader;
