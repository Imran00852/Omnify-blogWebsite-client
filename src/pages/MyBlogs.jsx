// src/pages/MyBlogs.jsx
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllBlogsQuery } from "../redux/api/api";
import { useState } from "react";

const MyBlogs = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [page, setPage] = useState(1);
  const limit = 6;

  // Fetch all blogs
  const { data, isLoading, isError, error } = useGetAllBlogsQuery({
    page,
    limit,
  });

  if (!user) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Please <Button onClick={() => navigate("/login")}>Login</Button> to
          view your blogs.
        </Typography>
      </Container>
    );
  }

  const myBlogs = data?.blogs?.filter(
    (blog) => blog?.author?._id === user?._id
  );

  return (
    <Container sx={{ py: 10, minHeight: "100vh" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
      >
        ✍️ My Blogs
      </Typography>

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {isError && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error?.data?.msg || "Failed to load blogs."}
        </Alert>
      )}

      {!isLoading && !isError && (
        <>
          {myBlogs?.length > 0 ? (
            <Grid container spacing={4} justifyContent="center">
              {myBlogs.map((blog) => (
                <Grid item key={blog._id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: 210,
                      width: 260,
                      borderRadius: 4,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {blog.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {blog.content}
                      </Typography>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: "center" }}>
                      <Button
                        size="small"
                        onClick={() => navigate(`/blogs/${blog._id}`)}
                      >
                        View
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 4, textAlign: "center" }}
            >
              You haven’t written any blogs yet.{" "}
              <Button onClick={() => navigate("/create")}>Write one!</Button>
            </Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default MyBlogs;
