import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CircularProgress,
  Box,
} from "@mui/material";

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const getPost = async () => {
    try {
      const postRef = doc(db, "post", id);
      const postDoc = await getDoc(postRef);
      if (postDoc.exists()) {
        const postData = { ...postDoc.data(), id };
        setPost(postData);
      } else {
        console.log("no such document");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  if (!post) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <div>
      <Card
        sx={{
          maxWidth: 650,
          margin: "auto",
          marginTop: 15,
          marginBottom: 15,
          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
          borderRadius: 5,
        }}
      >
        <CardActionArea>
          <CardMedia component="img" height="600" image={post.imageURL} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body1" component="p">
              {post.body}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
