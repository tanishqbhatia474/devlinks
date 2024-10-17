import React from "react";
import Header from "./components/Header";
import LinkTreeEdit from "./components/Newlink";
import LinkTree from "./components/Linktree";

const Page = () => {
  
  const links = [
    { url: "https://github.com", label: "GitHub", color: "bg-gray-800" },
    { url: "https://youtube.com", label: "YouTube", color: "bg-red-600" },
    { url: "https://linkedin.com", label: "LinkedIn", color: "bg-blue-600" },
    { url: "https://twitter.com", label: "Twitter", color: "bg-sky-500" },
    { url: "https://instagram.com", label: "Instagram", color: "bg-pink-600" },
    { url: "https://medium.com", label: "Medium", color: "bg-green-600" },
    { url: "https://dev.to", label: "Dev.to", color: "bg-indigo-600" },
    {
      url: "https://stackoverflow.com",
      label: "Stack Overflow",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="ml-4 w-full md:w-1/3 lg:w-1/4 order-2 md:order-1">
            <LinkTree links={links} />
          </div>
          <div className="w-full md:w-2/3 lg:w-3/4 order-1 md:order-2">
            <LinkTreeEdit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;