
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../redux/features/userSlice";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { auth, storage, upload, useAuth } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const Register = () => {
  const [rName, setrName] = useState("");
  const [rEmail, setrEmail] = useState("");
  const [rPassword, setrPassword] = useState("");
  const history = useRouter();
  const [registrationError, setRegistrationError] = useState(null);

  const reg = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        rEmail,
        rPassword
      );
      const user = userCredential.user;

      if (profilePicture) {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        const snapshot = await uploadBytes(storageRef, profilePicture);
        const downloadURL = await getDownloadURL(snapshot.ref);

        await updateProfile(user, {
          displayName: rName,
          photoURL: downloadURL,
        });

        setProfilePictureURL(downloadURL);
      } else {
        await updateProfile(user, {
          displayName: rName,
        });
      }

      history.push("/auth/Login");
    } catch (error) {
      alert(error.message);
      setRegistrationError(error.message);
    }
  };

  return (
    <div className="p-6  w-full h-screen flex flex-col items-center justify-center">
      <div className=" rounded-2xl flex flex-col bg-slate-300">


        <form className="p-6 sm:w-[300px] md:w-[600px] rounded-2xl flex flex-col space-y-2 bg-slate-300">

          <label className="text-black">Name</label>
          <input
            className="p-2 rounded-lg"
            onChange={(e) => setrName(e.target.value)} //Not functional dummy
            type="text"
            placeholder="Full Name"
          />
          <label className="text-black">Email</label>
          <input
            className="p-2 rounded-lg"
            onChange={(e) => setrEmail(e.target.value)}
            type="email"
            placeholder="example@mail.com"
          />
          <label className="text-black">Password</label>
          <input
            className="p-2 rounded-lg"
            type="password"
            onChange={(e) => setrPassword(e.target.value)}
            placeholder="Password"
          />
        </form>
        {registrationError && (
          <p className="text-red-500 text-center">{registrationError}</p>
        )}
        <a className="bg-blue-500 p-2 text-center" href="/">
          Login
        </a>
        <button
          onClick={reg}
          className=" bg-green-500 p-2 text-center rounded-b-2xl"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
