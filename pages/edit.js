// edit.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const EditBlogPage = () => {
  const router = useRouter();
  const { id } = router.query; // Extract the blog ID from the route

  const [blogData, setBlogData] = useState({
    title: "",
    paragraph: "",
  });

  useEffect(() => {
    // Function to fetch the blog data based on the ID
    const fetchBlogData = async () => {
      if (id) {
        const blogRef = doc(db, "bloglist", id);
        const blogSnapshot = await getDoc(blogRef);

        if (blogSnapshot.exists()) {
          const blog = blogSnapshot.data();
          setBlogData(blog);
        } else {
          // Handle the case where the blog doesn't exist
          console.error("Blog not found.");
          router.push("/homepage"); // Redirect to the homepage or handle as needed
        }
      }
    };

    fetchBlogData();
  }, [id]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      const blogRef = doc(db, "bloglist", id);

      try {
        // Update the existing blog with the new data
        await updateDoc(blogRef, {
          title: blogData.title,
          paragraph: blogData.paragraph,
        });

        // Redirect back to the homepage after successful edit
        router.push("/homepage");
      } catch (error) {
        console.error("Error updating blog:", error);
      }
    }
  };

  return (
    <div className="bg-gray-100 h-screen">
      <div className=" h-full w-full">
          <div className="pt-20">
          <h1 className="text-2xl font-semibold mb-4">Edit Blog</h1>
        <form onSubmit={handleEditSubmit}>
          <div className="space-y-4 h-full">
            <div>
              <label htmlFor="title" className="block font-medium">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={blogData.title}
                onChange={(e) =>
                  setBlogData({ ...blogData, title: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="paragraph" className="block font-medium">
                Paragraph:
              </label>
              <textarea
                rows="10"
                name="paragraph"
                value={blogData.paragraph}
                onChange={(e) =>
                  setBlogData({ ...blogData, paragraph: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              ></textarea>
            </div> 
              <button
                type="submit"
                className="p-8 w-full fixed bottom-0  bg-green-400"
              >
                Save Changes
              </button>
            </div> 
        </form>
          </div>
      </div>
    </div>
  );
};

export default EditBlogPage;
