// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAaUlE0WJVHpfItqPo5G_m8JZmY9wGUmKI",
  authDomain: "blog-34504.firebaseapp.com",
  projectId: "blog-34504",
  storageBucket: "blog-34504.appspot.com",
  messagingSenderId: "30536874981",
  appId: "1:30536874981:web:f58242adf373ca25468d0c",
  measurementId: "G-DP7RJ68ETZ"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export const storage = getStorage(app);

export const auth = getAuth(app);


export function useAuth(){
  const [currentUser, setCurrentUser]=useState();
  useEffect(()=>{
    const unsub=onAuthStateChanged(auth,user=>setCurrentUser(user));
  return unsub;
  },[])
  return currentUser;
}

//storage
export async function upload(file, currentUser, setLoading){
  // Check if currentUser is null or undefined
  if (!currentUser) {
    console.error("User is not authenticated.");
    return; // Exit the function
  }

  const fileRef = ref(storage, currentUser.uid + '.PNG');
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