// src/components/CriminalRecordSystem.js
import React, { useState } from 'react';
import AddRecordForm from './AddRecordForm';
import SearchBar from './SearchBar';
import web3Service from '../services/web3Service';
import ipfsService from '../services/ipfsService';

const CriminalRecordSystem = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (name) => {
    setLoading(true);
    try {
      await web3Service.init();
      const found = await web3Service.searchRecordsByName(name);
      setRecords(found);
    } catch (err) {
      console.error(err);
      alert(' Search failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 bg-[#111827] text-white">
      <h1 className="text-3xl font-bold mb-4">Criminal Record Dashboard</h1>

      {/* Add Form */}
      <AddRecordForm />

      {/* Search Bar */}
      <div className="mt-10">
        <SearchBar onSearch={handleSearch} />

        {loading && <p className="text-blue-400">Searching...</p>}

        {/* Display Results */}
        <div className="mt-4 space-y-4">
          {records.map((rec, i) => (
            <div key={i} className="bg-[#1f2937] p-4 rounded shadow">
              <p><strong>Name:</strong> {rec.name}</p>
              <p><strong>Crime:</strong> {rec.crime}</p>
              <p><strong>Location:</strong> {rec.location}</p>
              <p><strong>Victim:</strong> {rec.victim}</p>
              <p><strong>Amount:</strong> {rec.amount}</p>
              <p><strong>Officer:</strong> {rec.officer}</p>
              <p><strong>Description:</strong> {rec.description}</p>
              <p><strong>IPFS File:</strong>{' '}
                <a href={ipfsService.getFileUrl(rec.ipfsHash)} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                  View
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CriminalRecordSystem;
