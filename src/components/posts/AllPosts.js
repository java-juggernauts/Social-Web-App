import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { usePosts } from "../../hooks/posts";
import Post from "./SinglePost";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from '@mui/material/CircularProgress';

function FindPosts({ posts }) {
  return (
    <Box px="4" align="center">
      {posts?.length === 0 ? (
        <Typography textAlign="center" fontSize="xl">
          No posts..
        </Typography>
      ) : (
        posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </Box>
  );
}

export default function AllPosts() {
  const { posts, isLoading } = usePosts();

  if (isLoading)
    return (
      <Box fontSize="large" textAlign="center">
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Box textAlign="center">
        <Button
          component={Link}
          to="/protected/createpost"
          variant="contained"
          endIcon={<AddIcon />}
          sx={{ marginTop: 10, height: 50, width: 200 }}
        >
          Add Post
        </Button>
      </Box>
      <FindPosts posts={posts} />
    </>
  );
}
