import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('artist', "artist");
    formData.append('category', "category");
    formData.append('name', "name");
    formData.append('style', "style");

    axios.post('http://localhost:5000/upload', formData)
      .then(response => {
        setUploadStatus('Image uploaded successfully!');
        console.log(response.data);
      })
      .catch(error => {
        setUploadStatus('Error uploading image.');
        console.error('Error uploading image:', error);
      });
  };

  return (
    <div>
      <h2>Image Uploader</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default ImageUploader;
