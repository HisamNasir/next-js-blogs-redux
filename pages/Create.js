"use client";
import { addUser } from "../redux/features/userSlice";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit, FaUser, FaSignOutAlt, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { deleteUser } from "../redux/features/userSlice";
import { signOut } from "firebase/auth";
import { db } from "../firebase";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { collection, getDocs, addDoc } from "firebase/firestore";
const create = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newParagraph, setNewParagraph] = useState(0);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [bloglist, setBloglist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userName, setUserName] = useState("");
  const blogCollectionRef = collection(db, "bloglist");

  const createBlog = async () => {
    try {
      // Add the new blog to Firestore
      const docRef = await addDoc(blogCollectionRef, {
        title: newTitle,
        paragraph: newParagraph,
      });

      const newBlogId = docRef.id;

      router.push("/homepage");

    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="">
      <div>
        <div className="p-4 space-y-2 flex flex-col">
          <label htmlFor="name">Title</label>
          <input
            onChange={(e) => setNewTitle(e.target.value)}
            type="text"
            name="title"
            className="form-control rounded-2xl p-4"
          />
        </div>
        <div className="p-4 space-y-2">
          <label className="" htmlFor="paragraph">
            Paragraph
          </label>
          <textarea
            onChange={(e) => setNewParagraph(e.target.value)}
            name="paragraph"
            id="message"
            rows="22"
            className="block p-2.5 w-full text-sm  rounded-lg border border-gray-300 focus:none "
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>

        <button
          onClick={createBlog}
          className="p-8 w-full fixed bottom-0  bg-green-400"
        >
          Submit
        </button>

      </div>
    </div>
  );
};

export default create;
