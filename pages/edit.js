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
    <div>
      <h1>Edit Blog</h1>
      <form onSubmit={handleEditSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={blogData.title}
            onChange={(e) =>
              setBlogData({ ...blogData, title: e.target.value })
            }
          />
        </div>
        <div>
          <label>Paragraph:</label>
          <textarea
            rows="4"
            value={blogData.paragraph}
            onChange={(e) =>
              setBlogData({ ...blogData, paragraph: e.target.value })
            }
          ></textarea>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditBlogPage;
