import { useState } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  getDocs,
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

export function useAddPost() {
  const [isLoading, setLoading] = useState(false);

  async function addPost(post) {
    setLoading(true);
    const id = uuidv4();
    try {
      await setDoc(doc(db, "posts", id), {
        ...post,
        id,
        date: serverTimestamp(),
        likes: [],
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
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
  const [isLoading, setLoading] = useState(false);

  async function deletePost() {
    const res = window.confirm("Delete post?");

    if (res) {
      setLoading(true);

      try {
        await deleteDoc(doc(db, "posts", id));

        const getData = query(
          collection(db, "comments"),
          where("postID", "==", id)
        );
        const querySnapshot = await getDocs(getData);
        querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
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
