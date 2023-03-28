import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth, db } from 'lib/firebase'; 
import { useState } from 'react';
import { DASHBOARD, LOGIN } from 'lib/routes';
import { signInWithEmailAndPassword,
     createUserWithEmailAndPassword 
    } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { setDoc, doc } from 'firebase/firestore';
import isUsernameExists from 'utils/isUsernameExist';

export function useAuth() {
    const [authUser, isLoading, error] = useAuthState(auth);
    
    return { user: authUser, isLoading: isLoading, error };

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
 async function logout() {
      if (await signOut()) {
            enqueueSnackbar("You have been logged out", { variant: "success" });
            setTimeout(() => {
                navigate(LOGIN);
            }, 3000);
      }
 }

    return { logout, isLoading, error };
}

export function useRegister() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    
    async function register({username, email, password, redirectTo=DASHBOARD}) {
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
