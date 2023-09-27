import React, { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import { storage, useAuth } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaUpload, FaUser } from "react-icons/fa";

export default function Profilepic() {
  const currentUser = useAuth();
  const [photoURL, setPhotoURL] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);

  const history = useRouter();

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleClick = async () => {
    if (!currentUser) {
      console.error("User is not authenticated.");
      return;
    }

    setLoading(true);

    try {
      if (photo) {
        const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
        const snapshot = await uploadBytes(storageRef, photo);
        const downloadURL = await getDownloadURL(snapshot.ref);

        await updateProfile(currentUser, {
          photoURL: downloadURL,
        });
      }

      setLoading(false);
    } catch (error) {
      alert(error.message);
      setRegistrationError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    } else {
      setPhotoURL(<FaUser />);
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex w-64 h-64 relative  object-cover cursor-pointer"
        >
          <img
            src={photoURL}
            alt="Avatar"
            className="avata absolute rounded-3xl  w-64 h-64 object-cover"
          />
          <div className=" absolute h-full flex justify-end items-end w-full">
            <i className="flex relative z-10  flex-col items-end justify-end bg-black text-white border p-4 rounded-full">
              <FaUpload />
            </i>
          </div>
          <input
            id="dropzone-file"
            accept="image/*"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <button
        className="bg-red-500 p-4 flex items-center gap-4 rounded-3xl"
        disabled={loading || !photo}
        onClick={handleClick}
      >
        <FaUpload />
        Upload
      </button>
      {registrationError && (
        <p className="text-red-500 text-center">{registrationError}</p>
      )}
    </div>
  );
}
