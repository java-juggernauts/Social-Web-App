import { useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  arrayRemove,
  arrayUnion,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { uuidv4 } from "@firebase/util";
import { useAuth } from "./auth";

export function useAddPost() {
  const [isLoading, setLoading] = useState(false);

  async function addPost(post, onSuccess, onError) {
    setLoading(true);
    const id = uuidv4();
    try {
      await setDoc(doc(db, "posts", id), {
        ...post,
        id,
        date: serverTimestamp(),
        likes: [],
      });
      onSuccess("Post added successfully!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      onError("Error adding post.");
      setLoading(false);
    }
  }

  return { addPost, isLoading };
}

export function useToggleLike({ id, isLiked, uid }) {
  const [isLoading, setLoading] = useState(false);

  async function toggleLike() {
    setLoading(true);
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });
    setLoading(false);
  }

  return { toggleLike, isLoading };
}

export function useDeletePost(id) {
  const { user } = useAuth();
  const [isLoading, setLoading] = useState(false);

  async function deletePost() {
    setLoading(true);

    try {
      const postRef = doc(db, "posts", id);
      const post = await getDoc(postRef);

      if (post.exists() && post.data().uid === user?.id) {
        // check if the post exists and the uid matches
        await deleteDoc(postRef);

        setLoading(false);
      } else {
        setLoading(false);
        throw new Error('Unauthorized');
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  return { deletePost, isLoading };
}

export function usePost(id) {
  const getData = doc(db, "posts", id);
  const [post, isLoading] = useDocumentData(getData);

  return { post, isLoading };
}

export function usePosts(uid = null) {
  const getData = uid
    ? query(
        collection(db, "posts"),
        orderBy("date", "desc"),
        where("uid", "==", uid)
      )
    : query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(getData);
  if (error) throw error;
  return { posts, isLoading };
}
