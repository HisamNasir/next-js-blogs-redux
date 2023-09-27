import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { getFirestore, deleteDoc, doc } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDYw5vuIefs__wc0RXKOyscyHl5r5U1WFA",

  authDomain: "blogspublished.firebaseapp.com",

  projectId: "blogspublished",

  storageBucket: "blogspublished.appspot.com",

  messagingSenderId: "1096412550643",

  appId: "1:1096412550643:web:a0b484e75df2717b1c6e86",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const auth = getAuth(app);

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);
  return currentUser;
}

//storage
export async function upload(file, currentUser, setLoading) {
  if (!currentUser) {
    console.error("User is not authenticated.");
    return;
  }

  const fileRef = ref(storage, currentUser.uid + ".PNG");
  setLoading(true);

  try {
    const snapshot = await uploadBytes(fileRef, file);
    setLoading(false);
    alert("File Uploaded");
  } catch (error) {
    console.error("Error uploading file:", error);
    setLoading(false);
  }
}

//firestore blogs db
export const db = getFirestore(app);

//delete
export const deleteBlogFromFirestore = async (blogId) => {
  const blogRef = doc(db, "bloglist", blogId);
  try {
    await deleteDoc(blogRef);
    console.log("Blog deleted successfully");
  } catch (error) {
    console.error("Error deleting blog from Firestore:", error);
    throw error;
  }
};
