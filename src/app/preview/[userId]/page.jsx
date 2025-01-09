"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const PreviewPage = () => {
  const [savedLinks, setSavedLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { userId } = useParams(); // Extract userId from the route

  useEffect(() => {
    if (!userId) {
      setError("User ID is required to fetch links.");
      setLoading(false);
      return;
    }

    const fetchLinks = async () => {
      try {
        const response = await axios.get(`/api/user/getlinks/${userId}`);
        setSavedLinks(response.data.links);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching links:", err);
        setError("Failed to load links. Please try again.");
        setLoading(false);
      }
    };

    fetchLinks();
  }, [userId]);

  const handleBack = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded-md"
          onClick={handleBack}
        >
          Back to Editor
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center">
      <button
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-md"
        onClick={handleBack}
      >
        Back to Editor
      </button>
      {savedLinks.length > 0 ? (
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6">
            {savedLinks.map((link, index) => (
              <div
                key={index}
                className={`flex items-center justify-between px-4 py-2 mb-3 text-white rounded-lg shadow-md text-sm ${link.color}`}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center"
                >
                  {link.platform}
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-200">No links available to preview.</p>
      )}
    </div>
  );
};

export default PreviewPage;
