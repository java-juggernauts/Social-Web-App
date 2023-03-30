import { Card, Box, CardContent, CardMedia, Typography } from "@mui/material";
import PostActions from "./PostActions";

export default function SinglePost({ post }) {
  const { title, body } = post;

  return (
    <Card
      sx={{
        minWidth: 300,
        maxWidth: 600,
        display: "grid",
        marginBottom: 10,
        marginTop: 10,
        textAlign: "start",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 120 }}
        display="grid"
        image="https://imgs.search.brave.com/5Fcml6zsrAoFqT6xpATvldIwxl3hw_PelwxU3SLYNy0/rs:fit:820:606:1/g:ce/aHR0cHM6Ly93d3cu/cG5nYXJ0cy5jb20v/ZmlsZXMvNS9Vc2Vy/LUF2YXRhci1QTkct/VHJhbnNwYXJlbnQt/SW1hZ2UucG5n"
        alt="avatar"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {body}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "flex-start", pl: 1, pb: 1 }}>
          <PostActions post={post} />
        </Box>
      </Box>
    </Card>
  );
}
