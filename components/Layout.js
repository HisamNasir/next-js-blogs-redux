// components/Layout.js
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div>
      <nav className="bg-blue-500 p-4">
        <Link href="/">Home</Link>
        <Link href="/Bog">Blog</Link>
        <Link href="/Settings">Settings</Link>
      </nav>
      <div className="container mx-auto mt-4 p-4">{children}</div>
    </div>
  );
};

export default Layout;
