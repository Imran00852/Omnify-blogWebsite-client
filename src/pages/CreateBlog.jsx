import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { useCreateBlogMutation } from "../redux/api/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [createBlog] = useCreateBlogMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitle("");
    setContent("");

    try {
      const res = await createBlog({ title, content });
      if (res?.data) {
        toast.success(res?.data?.msg);
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to create blog!");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Write a New Blog
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Blog Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          label="Content"
          variant="outlined"
          multiline
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#673ab7" }}
        >
          Publish
        </Button>
      </Box>
    </Container>
  );
};

export default CreateBlog;
