//Page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // For redirection
import Header from './components/Header';
import LinkTreeEdit from './components/Newlink'; // Ensure the path is correct
import LinkTree from './components/Linktree';

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [savedLinks, setSavedLinks] = useState([]);

  const handleSaveLinks = (links) => {
    setSavedLinks(links);
  };

  // Redirect to login page if not authenticated
  useEffect(() => {
    console.log('status', status);
    if (status === 'unauthenticated') {
      router.push('/login'); // Redirect to your login page
    }
  }, [status, router]);

  // Show loading state while checking session
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // If not authenticated, render nothing (redirection will happen)
  if (status === 'unauthenticated') {
    return null;
  }

  // If authenticated, render the page content
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4 order-2 md:order-1 md:ml-4 mx-auto md:mx-0">
            {/* Centered in mobile view with mx-auto */}
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

