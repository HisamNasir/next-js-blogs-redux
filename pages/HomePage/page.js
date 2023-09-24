import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit, FaUser, FaSignOutAlt, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { deleteUser } from "../UserReducer";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import Profilepic from "../auth/Profilepic";
useRouter;

const HomePage = () => {
  const user1 = auth.currentUser;
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const name = user.displayName;
      setUserName(name || "No Name"); // Display "No Name" if the user doesn't have a name
    }
  }, []);

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const handleSearch = () => {
    const handleSignOut = async () => {
      if (!user) {
        return null;
      }
      try {
        await signOut(auth);
        router.push("/auth/Login");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    const results = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/auth/Login");
      }
    };

    checkUserAuthentication();
  }, []);

  const handleSignOut = async () => {
    if (!user) {
      return null;
    }
    try {
      await signOut(auth);
      router.push("/auth/Login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/auth/Login");
      }
    };

    checkUserAuthentication();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser({ id: id }));
    }
  };

  return (
    <div className="w-full justify-center flex flex-col">
      <div className=" md:grid space-y-4 grid-flow-col mt-20 items-center">
        <div className="rounded-2xl flex flex-col">
          <button
            onClick={handleSignOut}
            className="bg-red-500  md:mt-0 w-40 p-2 flex items-center justify-center gap-4 text-center rounded-r-2xl"
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
        <div className=" flex flex-col justify-center">

          <div className=" flex justify-center">
            {user ? (
              <a href="/auth/Profilepic">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-20 h-20 rounded-full"
                  />
                ) : (
                  <FaUser className="w-20 h-20 text-gray-500" />
                )}
              </a>
            ) : (
              <p>Please log in to see your profile.</p>
            )}
          </div>
          <h1 className=" text-center text-2xl md:text-6xl my-2  font-black">
            Welcome, {userName}!
          </h1>
        </div>

        <div className='relative flex justify-end items-center '>
            <Link href='/Create' className='bg-green-500 md:mt-0 w-40 p-2 flex  justify-center gap-4 text-center rounded-l-2xl'>
                Add Card +
            </Link>

            </div>
      </div>

      {/* Search bar */}
      <div className="p-8 flex justify-center">
        <input
          className="h-full pl-4 border py-4 md:w-2/4 focus:outline-none rounded-l-2xl"
          type="text"
          placeholder="Search by user name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white focus:outline-none  p-4 rounded-r-2xl"
        >
          Search
        </button>
      </div>

      {/* Display search results */}
      <div className="p-4">
        {searchResults.map((result) => (
          <div className="p-2 border m-4 rounded-3xl" key={result.id}>
            <div className="w-full absolute flex justify-end right-10">
              <div className="flex">
                <Link
                  className="hover:bg-green-800 p-2 m-2 rounded-lg bg-green-500 text-white text-xl flex flex-col text-center justify-center"
                  href={`/edit/${result.id}`}
                >
                  <FaEdit />
                </Link>
                <button
                  className="hover:bg-red-800 p-2 m-2 rounded-lg bg-red-500 text-white text-xl flex flex-col justify-center"
                  onClick={() => handleDelete(result.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="m-4 mb-1 rounded-lg font-black text-2xl flex flex-col justify-center">
              {result.name}
            </div>
            <div className="mx-4 rounded-lg text-lg flex flex-col justify-center">
              {result.paragraph}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
