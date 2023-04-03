import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { db } from 'lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const SearchBar = ({ onUserSelected }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  return (
    <Autocomplete
      options={users}
      getOptionLabel={(option) => option.username}
      onChange={(event, value) => onUserSelected(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Users"
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.8)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.8)',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.5)',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'rgba(255, 255, 255, 0.8)',
            },
            '& .MuiInputBase-root': {
              color: 'rgba(255, 255, 255, 0.8)',
            },
            '@media (max-width: 600px)': {
              width: '50%',
            },
          }}
        />
      )}
    />
  );
};

export default SearchBar;
