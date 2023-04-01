import { Card, Box, CardContent, CardMedia, Typography, createTheme, ThemeProvider } from "@mui/material";
import PostActions from "./PostActions";

export const theme = createTheme({
  palette: {
    background: {
      paper: '#F1F1F1', // your color
    },
    mode: 'light',
    primary: {
      main: '#F1F1F1',
    },
    secondary: {
      main: '#f50057',
    },
  },
})

export default function SinglePost({ post }) {
  const { title, body } = post;

  return (
    <ThemeProvider theme={theme}>
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
        sx={{ width: 100 }}
        display="grid"
        image="https://imgs.search.brave.com/N8CL4EgnzDP-Grt8YtJDj14ISGvD6s79DbjY6Xbhgpo/rs:fit:614:614:1/g:ce/aHR0cHM6Ly9lbW9q/aS5nZy9hc3NldHMv/ZW1vamkvMjYyN19w/ZXBlX2htbS5wbmc"
        alt="avatar"
      />
      <Box sx={{ display: "flex", flexDirection: "column", boxShadow: 1 }}>
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
    </ThemeProvider>
  );
}
