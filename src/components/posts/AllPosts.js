import { usePosts } from "./post";
import Post from "./SinglePost";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

function PostsList({ posts }) {
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
      <Typography fontSize="large" textAlign="center">
        Loading posts...
      </Typography>
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
      <PostsList posts={posts} />
    </>
  );
}
