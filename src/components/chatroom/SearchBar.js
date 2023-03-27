import React from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ value, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Search Users"
        variant="outlined"
        value={value}
        onChange={onChange}
        fullWidth
        sx={{
          marginBottom: "1rem",
        //   height: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
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
        }}
      />
    </form>
  );
};

export default SearchBar;
