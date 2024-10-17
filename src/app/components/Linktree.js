import React from 'react';
import Link from 'next/link';

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 sm:w-5 sm:h-5"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const LinkButton = ({ url, label, color, index, handleDragStart, handleDragOver, handleDrop }) => (
  <div
    draggable
    onDragStart={(e) => handleDragStart(e, index)}
    onDragOver={handleDragOver}
    onDrop={(e) => handleDrop(e, index)}
  >
    <Link href={url} passHref legacyBehavior>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 mb-2 sm:mb-3 text-white rounded-lg text-xs sm:text-sm ${color} hover:opacity-90 transition-opacity duration-200 shadow-md`}
      >
        <span className="font-medium">{label}</span>
        <ExternalLinkIcon />
      </a>
    </Link>
  </div>
);

const LinkTree = ({ links, setLinks }) => {
  // Drag and Drop Handlers
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default to allow drop
  };

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData('text/plain');
    const draggedLink = links[draggedIndex];
    const updatedLinks = [...links];

    // Remove the dragged link from its original position
    updatedLinks.splice(draggedIndex, 1);

    // Insert it at the new position
    updatedLinks.splice(index, 0, draggedLink);

    setLinks(updatedLinks); // Update the links state in the parent component
  };

  const totalDivs = 8; // Total number of empty divs to display

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white rounded-3xl shadow-lg">
      <div className="flex flex-col items-center mb-4 sm:mb-6">
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 rounded-full mb-3 sm:mb-4 shadow-inner"></div>
        <div className="h-3 sm:h-4 bg-gray-200 w-2/3 sm:w-3/4 rounded mb-2"></div>
        <div className="h-2 sm:h-3 bg-gray-200 w-1/2 rounded"></div>
      </div>
      
      <div className="space-y-2 sm:space-y-3">
        {/* Render links and fill the rest with empty divs */}
        {links.map((link, index) => (
          <LinkButton
            key={index}
            url={link.url}
            label={link.platform}
            color={link.color}
            index={index}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
          />
        ))}
        {/* Render empty divs to fill up to the totalDivs */}
        {Array.from({ length: totalDivs - links.length }).map((_, index) => (
          <div
            key={index + links.length} // Ensure unique keys
            className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 mb-2 sm:mb-3"
            style={{ backgroundColor: 'rgb(228, 231, 235)' }} // Set the background color
          >
            <span className="w-full h-full" /> {/* Placeholder for content */}
            <div className="w-4 h-4" /> {/* Placeholder for icon */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkTree;
