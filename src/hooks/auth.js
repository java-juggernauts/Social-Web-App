import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db } from "lib/firebase";
import { useEffect, useState } from "react";
import { DASHBOARD, LOGIN } from "lib/routes";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { setDoc, doc, getDoc } from "firebase/firestore";
import isUsernameExists from "utils/isUsernameExist";
import { useCallback } from "react";


export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const ref = doc(db, "users", authUser.uid);
      const docSnap = await getDoc(ref);
      setUser(docSnap.data());
      setLoading(false);
    }

    if (!authLoading) {
      if (authUser) fetchData();
      else setLoading(false);
    }
  }, [authLoading]);

  return { user, isLoading, error };
}

export function useLogin() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    async function login(email, password, redirectTo = DASHBOARD) {
      setLoading(true);
      let user = null;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        user = userCredential.user;
  
        navigate(redirectTo);
      } catch (error) {
        console.log(error.message);
        return false;
      } finally {
        setLoading(false);
      }
      return user;
    }
  
    return { login, isLoading };
  }
  

  export function useLogout() {
    const [signOut, isLoading, error] = useSignOut(auth);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
  
    const logout = useCallback(async () => {
      if (await signOut()) {
        enqueueSnackbar("You have been logged out", { variant: "success" });
        
        // Clear currentUser and user objects in localStorage
        localStorage.removeItem("currentUser");
        localStorage.removeItem("user");
  
        setTimeout(() => {
          navigate(LOGIN);
        }, 3000);
      }
    }, [signOut, enqueueSnackbar, navigate]);
  
    return { logout, isLoading, error };
  }  

export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  async function register({
    username,
    email,
    password,
    redirectTo = DASHBOARD,
  }) {
    setLoading(true);
    const usernameExists = await isUsernameExists(username);
    if (usernameExists) {
      enqueueSnackbar("Username already exists", { variant: "success" });
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          avatar: "",
          date: Date.now(),
          email: email,
        });
        navigate(redirectTo);
      } catch (error) {
        console.log(error.message);
      }
    }

    setLoading(false);
  }

  return { register, isLoading };
}
