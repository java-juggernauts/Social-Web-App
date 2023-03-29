import { useAddPost } from "./post";
import { useAuth } from "../../hooks/auth";
import { Box, Button, TextField, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

export default function CreatePost() {
  const { user, isLoading: authLoading } = useAuth();
  const { addPost, isLoading: addingPost } = useAddPost();
  const { register, handleSubmit, reset } = useForm();

  function handleAddPost(data) {
    addPost({
      title: data.title,
      body: data.body,
    });
    reset();
  }

  return (
    <Box mx="auto" py={10} maxWidth={800}>
    <Box textAlign="center">
      <Button
        variant="contained"
        sx={{
          width: '100%',
          maxWidth: 600,
          margin: 'auto',
          paddingY: { xs: 2, sm: 5 },
          marginBottom: 10,
          fontSize: '100%'
        }}
      >
        New Post
      </Button>
    </Box>
    <form onSubmit={handleSubmit(handleAddPost)} sx={{
      margin: 'auto',
      maxWidth: 600,
      width: '100%',
      paddingX: { xs: 2, sm: 0 },
    }}>
      <Stack spacing={2}>
        <TextField
          label="Title"
          {...register("title", { required: true })}
        />
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
