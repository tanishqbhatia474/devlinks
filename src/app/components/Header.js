//Header
import { FaLink, FaUserAlt, FaEye } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-4 md:px-8 bg-white shadow-md">
      {/* Left Section - Logo */}
      <div className="flex items-center">
        <div className="bg-purple-100 p-2 rounded-lg">
          <FaLink className="text-purple-600" size={20} />
        </div>
        <span className="ml-2 text-xl font-semibold hidden md:block">devlinks</span> {/* Hide text on small screens */}
      </div>

      {/* Middle Section - Links */}
      <nav className="flex space-x-4 flex-grow justify-center"> 
        <button className="flex items-center px-4 py-2 text-purple-600 bg-purple-100 rounded-md">
          <FaLink className="mr-2 block md:hidden" size={16} /> {/* Show icon only on small screens */}
          <span className="hidden md:inline">Links</span> {/* Show text only on medium screens */}
        </button>
        <button className="flex items-center px-4 py-2 text-gray-600 hover:text-black">
          <FaUserAlt className="mr-2 block md:hidden" size={16} /> {/* Show icon only on small screens */}
          <span className="hidden md:inline">Profile Details</span> {/* Show text only on medium screens */}
        </button>
      </nav>

      {/* Right Section - Preview Button with Eye Icon */}
      <button className="flex items-center px-4 py-2 text-purple-600 border border-purple-600 rounded-md hover:bg-purple-100">
        <FaEye className="mr-2" size={16} /> {/* Eye icon for Preview */}
        <span className="hidden md:inline">Preview</span> {/* Show text only on medium screens */}
      </button>
    </header>
  );
};

export default Header;

