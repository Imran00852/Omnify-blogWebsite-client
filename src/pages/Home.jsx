import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Tooltip,
  CircularProgress,
  Alert,
  Pagination,
  CardActions,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useGetAllBlogsQuery } from "../redux/api/api";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading, error, isError } = useGetAllBlogsQuery({
    page,
    limit,
  });

  return (
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          py: 12,
          textAlign: "center",
          background: "linear-gradient(135deg, #6a11cb, #2575fcff)",
          color: "white",
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
        >
          Welcome to <span style={{ color: "#ffca28" }}>MyBlog</span>
        </Typography>
        <Typography
          variant="h6"
          sx={{ maxWidth: "700px", mx: "auto", mb: 4, opacity: 0.9 }}
        >
          Share your thoughts, read amazing stories, and connect with others
          around the globe.
        </Typography>
        <Tooltip title={!user ? "Login first!" : ""} arrow placement="bottom">
          <span>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ffca28",
                color: "#333",
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                borderRadius: 30,
                fontSize: "1rem",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "#ffc107",
                  transform: "translateY(-2px)",
                },
              }}
              onClick={() => navigate("/create")}
              disabled={!user}
            >
              ✍️ Start Writing
            </Button>
          </span>
        </Tooltip>
      </Box>

      {/* Blogs Section */}
      <Container sx={{ py: 10 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
          sx={{ mb: 6 }}
        >
          📖 Latest Blogs
        </Typography>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress size={40} />
          </Box>
        )}

        {isError && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error?.data?.msg || "Failed to load blogs."}
          </Alert>
        )}

        {!isLoading && !isError && (
          <>
            <Grid container spacing={4}>
              {data?.blogs?.length > 0 ? (
                data.blogs.map((blog) => (
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
                          component="div"
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
                      <CardActions sx={{ justifyContent: "space-between" }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontStyle: "italic" }}
                        >
                          ✍️ {blog?.author?.name || "Unknown"} •{" "}
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </Typography>
                        <Button
                          size="small"
                          onClick={() => navigate(`/blogs/${blog._id}`)}
                          sx={{
                            fontWeight: "bold",
                            textTransform: "none",
                            color: "#1976d2",
                          }}
                        >
                          Read More →
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  No blogs yet. Be the first to write one!
                </Typography>
              )}
            </Grid>

            {/* Pagination */}
            {data?.totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <Pagination
                  count={data.totalPages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                  shape="rounded"
                  size="large"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      borderRadius: "8px",
                      fontWeight: "bold",
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Home;
