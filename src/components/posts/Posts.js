import React, { useEffect, useState } from "react";
import { db } from "lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { SINGLEPOST } from "lib/routes";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Posts() {
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "post");

  const getPostsList = async () => {
    try {
      const data = await getDocs(postsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPostList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPostsList();
  }, []);

  return (
    <div className="stories-card">
      <Typography
        sx={{ display: "flex", justifyContent: "center", marginTop: 15 }}
        gutterBottom
        variant="h2"
        component="div"
      >
        Feed
      </Typography>
      {postList.map((post) => (
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
          <CardActionArea
            component={Link}
            to={SINGLEPOST.replace(":id", post.id)}
          >
            <CardMedia component="img" height="600" image={post.imageURL} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}{" "}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.body}
              </Typography>
            </CardContent>
            <Button
              sx={{ display: "flex", alignContent: "flex-end" }}
              color="inherit"
            >
              see more
            </Button>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}
