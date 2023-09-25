
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signUpUser } from "../UserReducer";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { auth, storage, upload, useAuth } from "../firebase";
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
          {/* <div className=" relative h-12 flex flex-col items-center -translate-y-7">

          <div class="absolute flex justify-center">

              <div className="absolute h-24 w-24  text-6xl p-4 text-white rounded-full bg-black">
              <FaUser/>
              </div>
              <div  onClick={handleClick} class=" h-24 w-24 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
                
                <img
                  className="hidden group-hover:block w-8"
                  src="https://www.svgrepo.com/show/33565/upload.svg"
                  alt=""
                />
              </div>

          </div>
          </div>
        
         */}

        <form className="p-6 sm:w-[300px] md:w-[600px] rounded-2xl flex flex-col space-y-2 bg-slate-300">
          {/* <div className="">

               <input type="file" onChange={handleClick}/>
                <button className="bg-red-500" disabled={loading||!photo} onClick={handleClick}>Upload</button>
                <image src={photoURL} alt="Avatar" className="avatar"/>

          </div> */}

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
        <a className="bg-blue-500 p-2 text-center" href="/auth/Login">
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
