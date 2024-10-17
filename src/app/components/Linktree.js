'use client';
import React from "react";
import Link from "next/link";

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

const LinkButton = ({ url, label, color }) => (
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
);

const LinkTree = ({ links }) => {
  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white rounded-3xl shadow-lg">
      <div className="flex flex-col items-center mb-4 sm:mb-6">
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 rounded-full mb-3 sm:mb-4 shadow-inner"></div>
        <div className="h-3 sm:h-4 bg-gray-200 w-2/3 sm:w-3/4 rounded mb-2"></div>
        <div className="h-2 sm:h-3 bg-gray-200 w-1/2 rounded"></div>
      </div>
      
      {links.length === 0 ? (
        <div className="text-center text-gray-500">
          No links added yet. Use the editor to add links.
        </div>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {links.map((link, index) => (
            <LinkButton key={index} {...link} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkTree;