// import React, { useState } from "react";
// import { Box, TextField, Button, Typography } from "@mui/material";
// import { updateDoc, doc, getFirestore } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { useCurrentUser } from "context/CurentUserContext";

// function Profile() {
//   const { currentUser, setCurrentUser } = useCurrentUser();
//   const [bio, setBio] = useState(currentUser.bio || "");
//   const [selectedFile, setSelectedFile] = useState(null);

//   const onFileChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   const updateProfile = async () => {
//     try {
//       const userDocRef = doc(getFirestore(), "users", currentUser.uid);

//       if (selectedFile) {
//         const storageRef = ref(getStorage(), `avatars/${currentUser.uid}`);
//         await uploadBytes(storageRef, selectedFile);
//         const avatarUrl = await getDownloadURL(storageRef);
//         setCurrentUser({ ...currentUser, avatar: avatarUrl });
//         await updateDoc(userDocRef, { avatar: avatarUrl });
//       }

//       await updateDoc(userDocRef, { bio: bio });
//       setCurrentUser({ ...currentUser, bio: bio });
//       alert("Profile updated successfully");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Edit Profile
//       </Typography>
//       <Box mb={2}>
//         <TextField
//           label="Bio"
//           value={bio}
//           multiline
//           rows={4}
//           fullWidth
//           onChange={(e) => setBio(e.target.value)}
//         />
//       </Box>
//       <Box mb={2}>
//         <input type="file" onChange={onFileChange} />
//       </Box>
//       <Button onClick={updateProfile} variant="contained" color="primary">
//         Update Profile
//       </Button>
//     </Box>
//   );
// }

// export default Profile;
