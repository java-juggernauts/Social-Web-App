import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Container, IconButton, TextField, Typography, createTheme,Divider, ThemeProvider } from "@mui/material";
import { updateDoc, doc, getFirestore, getDoc, 
query, orderBy, onSnapshot, collection, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useCurrentUser } from "context/CurentUserContext";
import styled from "@emotion/styled";
import Post from "../posts/SinglePost";
import EditIcon from '@mui/icons-material/Edit';

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

// PROFILE PAGE REACT COMPONENT
function ProfilePage() {
    const { currentUser, setCurrentUser } = useCurrentUser();
    const [bio, setBio] = useState(currentUser?.bio || "");
    const [selectedFile, setSelectedFile] = useState(null);
    const [showBioEdit, setShowBioEdit] = useState(false);
    const [userPosts, setUserPosts] = useState([]);
  
    useEffect(() => {
        const fetchUserData = async () => {
          const userDocRef = doc(getFirestore(), "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
      
          if (userDocSnap.exists()) {
            // console.log(userDocSnap.data(), 'userDocSnap data');
            setBio(userDocSnap.data()?.bio || "");
          }
        };

        const fetchUserPosts = async () => {
            const postsQuery = query(
              collection(getFirestore(), "posts"),
              where("uid", "==", currentUser.uid),
              orderBy("date", "desc")
            );
      
            const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
              const posts = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              console.log("Fetched posts:", posts);
              setUserPosts(posts);
            });
      
            return () => {
              unsubscribe();
            };
          };
        if (currentUser) {
          fetchUserData();
          fetchUserPosts();
        }
      }, [currentUser]);
      

    const onFileChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        setSelectedFile(event.target.files[0]);
      }
    };
  
    const updateProfile = async () => {
      try {
        const userDocRef = doc(getFirestore(), "users", currentUser.uid);
  
        if (selectedFile) {
          const storageRef = ref(getStorage(), `avatars/${currentUser.uid}`);
          await uploadBytes(storageRef, selectedFile);
          const avatarUrl = await getDownloadURL(storageRef);
          setCurrentUser({ ...currentUser, avatar: avatarUrl });
          await updateDoc(userDocRef, { avatar: avatarUrl });
        }
  
        await updateDoc(userDocRef, { bio: bio });
        setCurrentUser({ ...currentUser, bio: bio });
        alert("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };
    // console.log(currentUser, "currentUser")
    // console.log(bio, "bio")
  return (
    <ThemeProvider theme={theme}>
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8, }}>
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, boxShadow: 2, maxWidth: 600, width: '100%', backgroundColor: "#f0f0f0" }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          style={{ width: 120, height: 120, borderRadius: '50%' }}
          src={currentUser?.avatar}
          alt={currentUser?.username}
        />
        <Box sx={{ position: 'relative', right: '2%', zIndex: 1}}>
        <input type="file" onChange={onFileChange} style={{ display: 'none' }} id="avatar-input" />
        <IconButton component="label" htmlFor="avatar-input" color="#bebdbf" aria-label="edit avatar">
          <EditIcon />
        </IconButton>
        </Box>
        <Box sx={{ ml: 2 }}>
          <Typography variant="h5" component="h2">
            {currentUser?.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
              Posts: {userPosts.length}
          </Typography>
        </Box>
      </Box>
      <Button variant="contained" color="primary" size="medium" sx={{ ml: 2 }}>
        Follow
      </Button>
    </Box>
    <Divider light />
    <Box sx={{ width: '100%' }}>
      {!showBioEdit && (
        <Typography variant="body1" gutterBottom>
          <Typography variant="h6" component="h2">
            Bio:
          </Typography>
          {bio || 'No bio available'}
        </Typography>
      )}
      {showBioEdit && (
        <TextField
          label="Bio"
          value={bio}
          multiline
          rows={4}
          fullWidth
          onChange={(e) => setBio(e.target.value)}
        />
      )}
      <Box sx={{ mt: 2 }}>
        <Button
          onClick={() => setShowBioEdit(!showBioEdit)}
          variant="contained"
          color="primary"
          size="small"
          sx={{ mr: 1 }}
        >
          {showBioEdit ? 'Cancel' : 'Edit profile'}
        </Button>
        {showBioEdit ?(<Button onClick={() => {
          updateProfile();
          setShowBioEdit(!showBioEdit)}} variant="contained" color="primary" size="small">
          Save
        </Button>): null}
      </Box>
    </Box>
    <Divider light />
    <Box sx={{ mt: 4, width: '100%' }}>
      {userPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Box>
  </Box>
</Container>
</ThemeProvider>
  );
}

export default ProfilePage;
