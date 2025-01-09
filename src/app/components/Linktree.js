'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

const LinkTree = ({ userId, onSave }) => {
  const [links, setLinks] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const platforms = [
    { name: 'GitHub', color: 'bg-gray-800', field: 'github', validUrl: /^https:\/\/github\.com\// },
    { name: 'YouTube', color: 'bg-red-600', field: 'youtube', validUrl: /^https:\/\/(www\.)?youtube\.com\/|https:\/\/youtu\.be\// },
    { name: 'LinkedIn', color: 'bg-blue-600', field: 'linkedin', validUrl: /^https:\/\/(www\.)?linkedin\.com\// },
    { name: 'Twitter', color: 'bg-sky-500', field: 'twitter', validUrl: /^https:\/\/(www\.)?twitter\.com\// },
    { name: 'Instagram', color: 'bg-pink-600', field: 'instagram', validUrl: /^https:\/\/(www\.)?instagram\.com\// },
    { name: 'Stack Overflow', color: 'bg-orange-500', field: 'stackoverflow', validUrl: /^https:\/\/(www\.)?stackoverflow\.com\// },
  ];

  const profilePicUrl = '/images/profile.png'; // Profile picture URL
  const totalDivs = 8; // Total number of empty divs to display

  const addLink = () => {
    setLinks([...links, { platform: '', url: '', color: '' }]);
  };

  const updateLink = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;

    if (field === 'platform') {
      const selectedPlatform = platforms.find((p) => p.name === value);
      updatedLinks[index].color = selectedPlatform ? selectedPlatform.color : '';
    }

    if (field === 'url') {
      const selectedPlatform = platforms.find((p) => p.name === updatedLinks[index].platform);
      if (selectedPlatform && !selectedPlatform.validUrl.test(value)) {
        setErrors((prev) => ({ ...prev, [index]: `Invalid URL for ${updatedLinks[index].platform}` }));
      } else {
        const newErrors = { ...errors };
        delete newErrors[index];
        setErrors(newErrors);
      }
    }

    setLinks(updatedLinks);
  };

  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    const newErrors = { ...errors };
    delete newErrors[index];
    setLinks(updatedLinks);
    setErrors(newErrors);
  };

  const saveLinks = async () => {
    if (Object.keys(errors).length > 0) {
      console.log('Please fix the errors before saving.');
      return;
    }

    const mappedLinks = platforms.reduce((acc, platform) => {
      const link = links.find((l) => l.platform === platform.name);
      acc[platform.field] = link ? link.url : '';
      return acc;
    }, {});

    setLoading(true);
    try {
      const response = await axios.post(`/api/user/${userId}`, mappedLinks);
      console.log('Response from server:', response.data);
      setLoading(false);
      alert('Links saved successfully!');
      onSave(mappedLinks);
    } catch (error) {
      console.error('Error saving links:', error);
      setLoading(false);
      alert('Failed to save links.');
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData('text/plain');
    const draggedLink = links[draggedIndex];
    const updatedLinks = [...links];
    updatedLinks.splice(draggedIndex, 1);
    updatedLinks.splice(index, 0, draggedLink);
    setLinks(updatedLinks);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Customize your links</h1>
        <p className="mb-4 sm:mb-6 text-sm sm:text-base">Add/edit/remove links below and reorder them to share your profiles with the world!</p>

        <button
          onClick={addLink}
          className="w-full p-2 mb-4 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 text-sm sm:text-base"
        >
          + Add new link
        </button>

        {links.length === 0 ? (
          <div className="text-center p-4 sm:p-8 bg-gray-50 rounded-lg">
            <div className="mb-4">
              <img
                src="images/illustration-empty.svg"
                alt="Get started illustration"
                className="mx-auto w-32 sm:w-48"
              />
            </div>
            <h2 className="text-lg sm:text-xl font-bold mb-2">Let&apos;s get you started</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Use the &quot;Add new link&quot; button to get started. Once you have more than one link, you can reorder and edit them. We&apos;re here to help you share your profiles with everyone!
            </p>
          </div>
        ) : (
          links.map((link, index) => (
            <div key={index} className="mb-4 p-3 sm:p-4 border rounded-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-0">Link #{index + 1}</h2>
                <button
                  onClick={() => removeLink(index)}
                  className="text-gray-500 hover:text-red-500 text-sm sm:text-base"
                >
                  Remove
                </button>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <select
                  value={link.platform}
                  onChange={(e) => updateLink(index, 'platform', e.target.value)}
                  className="w-full p-2 border rounded-lg text-sm"
                >
                  <option value="">Select a platform</option>
                  {platforms.map((platform) => (
                    <option key={platform.name} value={platform.name}>
                      {platform.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => updateLink(index, 'url', e.target.value)}
                  className="w-full p-2 border rounded-lg text-sm"
                  placeholder="https://www.example.com/profile"
                />
                {errors[index] && (
                  <p className="text-red-500 text-xs mt-1">{errors[index]}</p>
                )}
              </div>
            </div>
          ))
        )}

        <button
          onClick={saveLinks}
          className={`w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 text-sm sm:text-base ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white rounded-3xl shadow-lg">
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 sm:mb-4 shadow-inner">
            <Image
              src={profilePicUrl}
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
          <div className="h-3 sm:h-4 bg-gray-200 w-2/3 sm:w-3/4 rounded mb-2"></div>
          <div className="h-2 sm:h-3 bg-gray-200 w-1/2 rounded"></div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {links.map((link, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 mb-2 sm:mb-3 text-white rounded-lg text-xs sm:text-sm ${link.color} hover:opacity-90 transition-opacity duration-200 shadow-md`}
            >
              <Link href={link.url} passHref legacyBehavior>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between"
                >
                  <span className="font-medium">{link.platform}</span>
                </a>
              </Link>
            </div>
          ))}
          {Array.from({ length: totalDivs - links.length }).map((_, index) => (
            <div
              key={index + links.length}
              className="flex items-center rounded-xl justify-between px-3 sm:px-4 py-2 sm:py-3 mb-2 sm:mb-3"
              style={{ backgroundColor: 'rgb(228, 231, 235)' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkTree;
