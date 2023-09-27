import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit, FaUser, FaSignOutAlt, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { deleteUser } from "../redux/features/userSlice";
import { signOut } from "firebase/auth";
import { db } from "../firebase";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { checkAuth } from "@/utills/auth";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const HomePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [bloglist, setBloglist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userName, setUserName] = useState("");
  const blogCollectionRef = collection(db, "bloglist");
  const dispatch = useDispatch();

  //Prevent page url leak
  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await checkAuth();
      if (!currentUser) {
        // User is not authenticated, redirect to the login page
        router.push("/Login");
      } else {
        setUser(currentUser);
      }
    };

    fetchData();
  }, [router]);
  const handleSearch = () => {
    const filteredBlogs = bloglist.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredBlogs);
  };

  useEffect(() => {
    const getBlogsFromFirestore = async () => {
      const querySnapshot = await getDocs(blogCollectionRef);

      const blogs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setBloglist(blogs);
    };

    getBlogsFromFirestore();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const name = user.displayName;
        setUserName(name || "No Name");
      } else {
        setUser(null);
        setUserName("");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const filteredBlogs = bloglist.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredBlogs);
  }, [searchTerm, bloglist]);

  const handleSignOut = async () => {
    if (user) {
      try {
        await signOut(auth);
        router.push("/");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    }
  };
  const deleteBlogFromFirestore = async (blogId) => {
    const blogRef = doc(db, "bloglist", blogId);
    try {
      await deleteDoc(blogRef);
      console.log("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog from Firestore:", error);
      throw error;
    }
  };
  const handleDelete = async (blogId) => {
    try {
      await deleteBlogFromFirestore(blogId);

      dispatch(deleteUser(blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  return (
    <div className="w-full justify-center flex flex-col">
      <div className="md:grid space-y-4 grid-flow-col mt-20 items-center">
        <div className="rounded-2xl flex flex-col">
          {user ? (
            <button
              onClick={handleSignOut}
              className="bg-red-500 md:mt-0 w-40 p-2 flex items-center justify-center gap-4 text-center rounded-r-2xl"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          ) : null}
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex justify-center">
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
          {user ? (
            <h1 className="text-center text-2xl md:text-6xl my-2 font-black">
              Welcome, {userName}!
            </h1>
          ) : null}
        </div>
        <div className="relative flex justify-end items-center">
          <Link
            href="/Create"
            className="bg-green-500 md:mt-0 w-40 p-2 flex justify-center gap-4 text-center rounded-l-2xl"
          >
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
          className="bg-blue-500 text-white focus:outline-none p-4 rounded-r-2xl"
        >
          Search
        </button>
      </div>

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
              {result.title}
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
