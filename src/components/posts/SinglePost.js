import { Card, Box, CardContent, CardMedia, Typography, createTheme, ThemeProvider } from "@mui/material";
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
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

function useAuth(post) {
  const [author, setAuthor] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    async function fetchAuthor() {
      const docRef = doc(db, "users", post.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAuthor(docSnap.data());
      }
    }
    fetchAuthor();
  }, [db, post.uid]);

  return { author };
}

export default function SinglePost({ post }) {
  const { title, body } = post;
  const { author } = useAuth(post);

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
      <Box sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 100 }}
          display="grid"
          image={
            author?.avatar ||
            "https://imgs.search.brave.com/StwFns0uM62He5quhnWVsRXoumadskiDsQZDGtNsKqU/rs:fit:512:512:1/g:ce/aHR0cHM6Ly93d3cu/c2xvdGNoYXJ0ZXIu/bmV0L3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzAyL25vLWF2/YXRhci5wbmc"
          }
          alt="avatar"
        />
        <Typography variant='h6' sx={{ alignSelf: "center", pl: 1 }}>
          {author?.username}
        </Typography>
      </Box>
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