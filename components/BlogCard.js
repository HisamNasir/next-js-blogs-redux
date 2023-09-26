// components/BlogCard.js
import React, { useState } from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const BlogCard = ({ blog }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const displayContent = expanded ? blog.content : blog.content.slice(0, 160);

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold">{blog.title}</h2>
      <div className='flex gap-2 items-center'>
      <p className="mt-2 font-extralight tracking-wider">{displayContent}</p>
      

      </div>
      <Link href={`/blogs/${blog.id}`}>
        <button className="text-blue-500 dark:text-blue-400 flex mt-2 text-right w-full justify-end gap-2 items-center">Open Blog <FaArrowRight/></button>
      </Link>
    </div>
  );
};

export default BlogCard;
