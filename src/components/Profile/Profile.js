import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Avatar } from "@mui/material";
import { updateDoc, doc, getFirestore, getDoc, 
query, orderBy, onSnapshot, collection, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useCurrentUser } from "context/CurentUserContext";
import styled from "@emotion/styled";
// MUI STYLING
const Container = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
});

const Profile = styled(Box)({
  flex: 1,
  maxWidth: "300px",
});

const Posts = styled(Box)({
  flex: 3,
  marginLeft: "20px",
});

const AvatarContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
  marginTop: "20px",
  marginLeft: "0px",
});
//POST FUNCTION
function Post({ post }) {
    return (
      <Box>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body1">{post.body}</Typography> // Update this line
        <Typography variant="caption">{new Date(post.date).toLocaleString()}</Typography>
      </Box>
    );
  }
  
// PROFILE PAGE REACT COMPONENT
function ProfilePage() {
    const { currentUser, setCurrentUser } = useCurrentUser();
    const [bio, setBio] = useState(currentUser.bio || "");
    const [selectedFile, setSelectedFile] = useState(null);
    const [showBioEdit, setShowBioEdit] = useState(false);
    const [userPosts, setUserPosts] = useState([]);
  
    useEffect(() => {
        const fetchUserData = async () => {
          const userDocRef = doc(getFirestore(), "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
      
          if (userDocSnap.exists()) {
            // console.log(userDocSnap.data(), 'userDocSnap data');
            setBio(userDocSnap.data().bio || "");
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
    <Container>
      <Profile>
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>
        <AvatarContainer>
          <Avatar
            src={currentUser.avatar}
            alt={currentUser.username}
            sx={{ width: 100, height: 100 }}
          />
        </AvatarContainer>
        <Box mb={2}>
          <input type="file" onChange={onFileChange} />
        </Box>
        <Button onClick={updateProfile} variant="contained" color="primary">
          Update Profile
        </Button>
        <Box mb={2}>
          {!showBioEdit && (
            <Typography variant="body1" gutterBottom>
            {bio || "No bio available"}
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
          <Button
            onClick={() => setShowBioEdit(!showBioEdit)}
            variant="contained"
            color="secondary"
            style={{ marginTop: "8px" }}
          >
            {showBioEdit ? "Cancel Edit Bio" : "Edit Bio"}
          </Button>
        </Box>
        
      </Profile>
      <Posts>
      {userPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Posts>
    </Container>
  );
}

export default ProfilePage;
