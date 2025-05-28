import React, { useState } from 'react';
import web3Service from '../services/web3Service';
import ipfsService from '../services/ipfsService';

const AddRecordForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    crime: '',
    location: '',
    victim: '',
    amount: '',
    description: '',
    category: '',
    officer: '',
    file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let ipfsHash = '';
      if (formData.file) {
        ipfsHash = await ipfsService.uploadFile(formData.file);
      }

      await web3Service.init();
      await web3Service.connectWallet();

      await web3Service.addCriminalRecord({
        ...formData,
        ipfsHash,
      });

      alert(' Record added successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to add record');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#1f2937] p-6 rounded shadow-md space-y-4">

      <h2 className="text-xl font-bold text-white">Add Criminal Record</h2>

      <p>
        Fill out the form below to add a new criminal record. Ensure all fields are filled out correctly, and you can upload supporting documents if needed.
      </p>
      {['name', 'crime', 'location', 'victim', 'amount', 'description', 'category', 'officer'].map((field) => (
        <input
          key={field}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="w-full p-2 rounded bg-gray-800 text-white"
          required
        />
      ))}
      <input type="file" name="file" onChange={handleChange} className="text-white" />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
      >
        {isSubmitting ? 'Submitting...' : 'Add Record'}
      </button>
    </form>
  );
};

export default AddRecordForm;
