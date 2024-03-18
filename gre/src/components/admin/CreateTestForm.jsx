"use client"

import axios from 'axios';
import React, { useState } from 'react';

const CreateTestForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [sections, setSections] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("entered");
      const response = await axios.post('/api/createTest', {
        name:name,
        description:description,
        duration:duration,
        sections: sections.split(',').map(section => section.trim()) // Split sections by comma and trim whitespace
      });
      console.log('Test created:', response.data);
      // Handle success, e.g., show a success message or redirect
    } catch (error) {
      console.error('Error creating test:', error.response.data.error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Duration:
        <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
      </label>
      <label>
        Sections:
        <input type="text" value={sections} onChange={(e) => setSections(e.target.value)} />
        <small>Separate sections by comma</small>
      </label>
      <button type="submit">Create Test</button>
    </form>
  );
};

export default CreateTestForm;
