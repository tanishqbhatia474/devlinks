'use client';
import React, { useState } from 'react';

const LinkTreeEdit = ({ onSave }) => {
  const [links, setLinks] = useState([]);

  const platforms = [
    { name: 'GitHub', color: 'bg-gray-800' },
    { name: 'YouTube', color: 'bg-red-600' },
    { name: 'LinkedIn', color: 'bg-blue-600' },
    { name: 'Twitter', color: 'bg-sky-500' },
    { name: 'Instagram', color: 'bg-pink-600' },
    { name: 'Stack Overflow', color: 'bg-orange-500' },
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
    setLinks(updatedLinks);
    onSave(updatedLinks);
  };

  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    onSave(updatedLinks);
  };

  const saveLinks = () => {
    onSave(links);
    console.log('Saving links:', links);
  };

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
    
    setLinks(updatedLinks);
    onSave(updatedLinks); // Update saved links after reordering
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
            <h2 className="text-lg sm:text-xl font-bold mb-2">Let's get you started</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your profiles with everyone!
            </p>
          </div>
        ) : (
          links.map((link, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="mb-4 p-3 sm:p-4 border rounded-lg cursor-move"
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
              </div>
            </div>
          ))
        )}

        <button
          onClick={saveLinks}
          className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 text-sm sm:text-base"
          disabled={links.length === 0}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default LinkTreeEdit;
