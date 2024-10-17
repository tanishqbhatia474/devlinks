'use client';
import React, { useState } from 'react';
import Header from './components/Header';
import LinkTreeEdit from './components/Newlink'; // Ensure the path is correct
import LinkTree from './components/Linktree';

const Page = () => {
  const [savedLinks, setSavedLinks] = useState([]);

  const handleSaveLinks = (links) => {
    setSavedLinks(links);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="ml-4 w-full md:w-1/3 lg:w-1/4 order-2 md:order-1">
            <LinkTree links={savedLinks} setLinks={setSavedLinks} />
          </div>
          <div className="w-full md:w-2/3 lg:w-3/4 order-1 md:order-2">
            <LinkTreeEdit onSave={handleSaveLinks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
