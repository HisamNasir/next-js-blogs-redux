import React from "react";
import Link from "next/link";
import { FaEdit, FaHome, FaPager, FaSearch } from "react-icons/fa";
export default function Navbar() {
  return (
    <nav className=" bg-slate-600 px-4 sticky top-0 drop-shadow-xl z-10">
      <div className=" mx-auto h-full flex justify-between flex-col md:flex-row">
        <div className="md:flex">
          <h1 className="text-2xl font-bold h-full text-white grid justify-center">
            <Link
              href="/"
              className="text-white/90 flex gap-2 items-center h-full py-4 px-4 hover:bg-slate-900 no-underline hover:text-white"
            >
              <FaHome /> Home
            </Link>
          </h1>
          <h1 className="text-2xl font-bold h-full text-white grid justify-center">
            <Link
              href="/Blog"
              className="text-white/90 flex gap-2 items-center h-full py-4 px-4 hover:bg-slate-900 no-underline hover:text-white"
            >
              <FaPager /> All Blog
            </Link>
          </h1>
          <h1 className="text-2xl font-bold h-full text-white grid justify-center">
            <Link
              href="/Edit"
              className="text-white/90 flex gap-2 items-center h-full py-4 px-4 hover:bg-slate-900 no-underline hover:text-white"
            >
              <FaEdit /> Add
            </Link>
          </h1>

        </div>
        
        <h1 className="text-2xl font-bold h-full text-white grid justify-center">
          <Link
            href="/Search"
            className="text-white/90 flex gap-2 items-center h-full py-4 px-4 hover:bg-slate-900 no-underline hover:text-white"
          >
            <FaSearch /> Search
          </Link>
        </h1>
      </div>
    </nav>
  );
}
