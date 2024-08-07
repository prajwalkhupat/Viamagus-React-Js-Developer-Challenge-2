// src/components/CreatePost.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreatePost.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (description.length > 1000) {
      setError('Description should not exceed 1000 characters');
      return;
    }

    // Submit post via API call
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body: description,
        userId: 1, // Assuming a user ID for the post
      });

      // Display success message
      setSuccessMessage('Post submitted successfully!');

      // Redirect to the previous post listing screen after a delay
      setTimeout(() => {
        navigate('/'); // Update the path as needed
      }, 2000);
    } catch (error) {
      console.error('Error submitting post:', error);
      setError('Error submitting post. Please try again.');
    }
  };

  return (
    <div className="create-post-container">
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description (max 1000 characters)</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
