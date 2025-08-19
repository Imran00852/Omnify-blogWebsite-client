import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSingleBlogQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} from "../redux/api/api";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, isError, error } = useGetSingleBlogQuery(id);
  const [deleteBlog, { isLoading: deleting }] = useDeleteBlogMutation();
  const [updateBlog, { isLoading: updating }] = useUpdateBlogMutation();

  const [openEdit, setOpenEdit] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });

  const handleOpenEdit = () => {
    setFormData({
      title: data.blog.title,
      content: data.blog.content,
    });
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const handleDelete = async () => {
    try {
      const { data } = await deleteBlog(id);
      toast.success(data?.msg);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to delete");
    }
  };

  const handleUpdate = async () => {
    try {
      const { data } = await updateBlog({ id, data: formData });
      setOpenEdit(false);
      toast.success(data?.msg);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to update");
    }
  };

  return (
    <Container sx={{ py: 6, minHeight: "100vh" }}>
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error?.data?.msg || "Failed to fetch blog."}
        </Alert>
      )}

      {!isLoading && !isError && data?.blog && (
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            backgroundColor: "white",
          }}
        >
          {/* Title + Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h3" fontWeight="bold">
              {data.blog.title}
            </Typography>

            {user?._id === data.blog?.author?._id && (
              <Box>
                <Tooltip title="Edit">
                  <IconButton color="primary" onClick={handleOpenEdit}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={handleDelete}
                    disabled={deleting}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>

          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 3, fontStyle: "italic" }}
          >
            ✍️ {data.blog?.author?.name || "Unknown"} •{" "}
            {new Date(data.blog.createdAt).toLocaleDateString()}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Typography
            variant="body1"
            sx={{ lineHeight: 1.8, whiteSpace: "pre-line" }}
          >
            {data.blog.content}
          </Typography>

          <Box sx={{ mt: 5, textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
              sx={{ borderRadius: 3, px: 4, py: 1.2, fontWeight: "bold" }}
            >
              ← Back to Blogs
            </Button>
          </Box>
        </Paper>
      )}

      {/* Edit Modal */}
      <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth maxWidth="sm">
        <DialogTitle>Edit Blog</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={6}
            margin="normal"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            disabled={updating}
          >
            {updating ? "Saving..." : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BlogDetails;
