'use client';
import React, { useState } from 'react';

const LinkTreeEdit = ({ onSave }) => {
  const [links, setLinks] = useState([]);
  const [errors, setErrors] = useState({});

  const platforms = [
    { name: 'GitHub', color: 'bg-gray-800', validUrl: /^https:\/\/github\.com\// },
    { name: 'YouTube', color: 'bg-red-600', validUrl: /^https:\/\/(www\.)?youtube\.com\/|https:\/\/youtu\.be\// },
    { name: 'LinkedIn', color: 'bg-blue-600', validUrl: /^https:\/\/(www\.)?linkedin\.com\// },
    { name: 'Twitter', color: 'bg-sky-500', validUrl: /^https:\/\/(www\.)?twitter\.com\// },
    { name: 'Instagram', color: 'bg-pink-600', validUrl: /^https:\/\/(www\.)?instagram\.com\// },
    { name: 'Stack Overflow', color: 'bg-orange-500', validUrl: /^https:\/\/(www\.)?stackoverflow\.com\// },
  ];

  const addLink = () => {
    setLinks([...links, { platform: '', url: '', color: '' }]);
  };

  const updateLink = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;

    if (field === 'platform') {
      const selectedPlatform = platforms.find(p => p.name === value);
      updatedLinks[index].color = selectedPlatform ? selectedPlatform.color : '';
    }

    // Validate the URL if it's the 'url' field
    if (field === 'url') {
      const selectedPlatform = platforms.find(p => p.name === updatedLinks[index].platform);
      if (selectedPlatform && !selectedPlatform.validUrl.test(value)) {
        setErrors(prev => ({ ...prev, [index]: `Invalid URL for ${updatedLinks[index].platform}` }));
      } else {
        const newErrors = { ...errors };
        delete newErrors[index];  // Remove error if valid
        setErrors(newErrors);
      }
    }

    setLinks(updatedLinks);
    onSave(updatedLinks);
  };

  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    const newErrors = { ...errors };
    delete newErrors[index];  // Remove error on removal
    setLinks(updatedLinks);
    setErrors(newErrors);
    onSave(updatedLinks);
  };

  const saveLinks = () => {
    if (Object.keys(errors).length === 0) {
      onSave(links);
      console.log('Saving links:', links);
    } else {
      console.log('Please fix the errors before saving.');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Customize your links</h1>
        <p className="mb-4 sm:mb-6 text-sm sm:text-base">Add/edit/remove links below and then share all your profiles with the world!</p>

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
            <div
              key={index}
              className="mb-4 p-3 sm:p-4 border rounded-lg"
            >
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
          className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 text-sm sm:text-base"
          disabled={links.length === 0 || Object.keys(errors).length > 0}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default LinkTreeEdit;
