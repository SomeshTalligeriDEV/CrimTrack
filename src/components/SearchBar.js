import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(name);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Search by Name"
        className="p-2 w-full rounded bg-gray-800 text-white"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
