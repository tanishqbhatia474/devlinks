import { useRouter } from "next/navigation";
import { FaLink, FaUserAlt, FaEye } from "react-icons/fa";
import {useSession } from "next-auth/react";
const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session.user.id;
  console.log("userId", userId);
  console.log("session", session);
  return (
    <header className="flex justify-between items-center py-4 px-4 md:px-8 bg-white shadow-md">
      <div className="flex items-center">
        <div className="bg-purple-100 p-2 rounded-lg">
          <FaLink className="text-purple-600" size={20} />
        </div>
        <span className="ml-2 text-xl font-semibold hidden md:block">devlinks</span>
      </div>

      <nav className="flex space-x-4 flex-grow justify-center">
        <button className="flex items-center px-4 py-2 text-purple-600 bg-purple-100 rounded-md">
          <FaLink className="mr-2 block md:hidden" size={16} />
          <span className="hidden md:inline">Links</span>
        </button>
        <button className="flex items-center px-4 py-2 text-gray-600 hover:text-black">
          <FaUserAlt className="mr-2 block md:hidden" size={16} />
          <span className="hidden md:inline">Profile Details</span>
        </button>
      </nav>

      <button
        className="flex items-center px-4 py-2 text-purple-600 border border-purple-600 rounded-md hover:bg-purple-100"
        onClick={() => router.push(`/preview/${userId}`)}
      >
        <FaEye className="mr-2" size={16} />
        <span className="hidden md:inline">Preview</span>
      </button>
    </header>
  );
};

export default Header;
