"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

const ModeChange = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []); // hydration hatana k lia

//   if (!mounted) {
//     return null;
//   }

//   let a;                                 used in return
//   if({theme}="dark"){
//     <FaSun/>
//   }
//   else{
//     <FaMoon/>
//   }

  return (
    <div className=" transition duration-700 flex items-center space-x-3 m-5">
      {theme=== "dark"?(
        <FaMoon/>
      ):(
        <FaSun/>
      )}
      <div className="relative flex items-center transition duration-700">
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={theme === "dark"}
            readOnly
          />
          <div
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
            className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-slate-300 peer-checked:after:translate-x-full peer-checked:after:border-white  after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"
          ></div>

        </label>
      </div>
    </div>
  );
};

export default ModeChange;
