import { useState } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { useAuth } from "../../hooks/auth";
import { useDeletePost, useToggleLike } from "../../hooks/posts";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function PostActions({ post }) {
  const { id, likes } = post;
  const { user, isLoading: userLoading } = useAuth();
  const [isLiked, setIsLiked] = useState(likes.includes(user?.id));
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);
  const { toggleLike, isLoading: likeLoading } = useToggleLike({
    id,
    isLiked,
    uid: user?.id,
  });

  const handleToggleLike = async () => {
    if (!user) {
      return;
    }

    setIsLiked(!isLiked);
    await toggleLike();
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" padding={2}>
      <Stack direction="row" alignItems="center">
        <IconButton
          onClick={handleToggleLike}
          disabled={userLoading || likeLoading}
          color="secondary"
        >
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography>{likes.length}</Typography>
      </Stack>

      <Stack direction="row" alignItems="center">
        <IconButton
          ml="auto"
          onClick={deletePost}
          disabled={deleteLoading}
          color="main"
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}
