import { Outlet } from "react-router-dom";
import { useAuth } from "hooks/auth";
import Navbar from "components/navbar/navbar";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

export default function Layout({ currentUser }) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
