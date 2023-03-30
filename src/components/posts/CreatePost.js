import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useAuth } from "../../hooks/auth";
import { useAddPost } from "../../hooks/posts";
import { useForm } from "react-hook-form";

export default function CreatePost() {
  const { user, isLoading: authLoading } = useAuth();
  const { addPost, isLoading: addingPost } = useAddPost();
  const { register, handleSubmit, reset } = useForm();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  function handleAddPost(data) {
    addPost(
      {
        uid: user.id,
        title: data.title,
        body: data.body,
      },
      setShowSuccessAlert
    );
    reset();
  }

  return (
    <Box mx="auto" py={10} maxWidth={800}>
      {showSuccessAlert && (
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setShowSuccessAlert(false)}
          sx={{
            position: "fixed",
            top: 80,
            right: 20,
            width: "300px",
            transition: "transform 0.3s ease-out",
          }}
        >
          <AlertTitle>Success</AlertTitle>
          Post added successfully!
        </Alert>
      )}
      <Box textAlign="center"></Box>
      <form
        onSubmit={handleSubmit(handleAddPost)}
        sx={{
          margin: "auto",
          maxWidth: 600,
          width: "100%",
          paddingX: { xs: 2, sm: 0 },
        }}
      >
        <Stack spacing={2}>
          <TextField label="Title" {...register("title", { required: true })} />
          <TextField
            label="Body"
            multiline
            rows={3}
            {...register("body", { required: true })}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={authLoading || addingPost}
          >
            Post
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
