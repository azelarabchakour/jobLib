import React, { useState } from 'react';
import axios from 'axios';
import EmployerNavbar from '../EmployeeNavbar/EmployeeNavbar';
import './UploadCvStyle.css';

function UploadCv() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const fileSize = Math.round(selectedFile.size / 1024);
      if (fileSize <= 10240) { // Check if file size is less than or equal to 10MB
        // Create FormData object
        const formData = new FormData();
        formData.append('cv', selectedFile);

        // Send file to the server using Axios
        axios.post('http://127.0.0.1:8000/employee/uploadCv/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          // Handle response from server
          console.log('File uploaded successfully:', response.data);
          // You can perform further actions here, such as displaying a success message
        })
        .catch(error => {
          // Handle errors
          console.error('Error uploading file:', error);
          // You can display an error message to the user
        });
      } else {
        alert('File size exceeds the limit (10MB). Please choose a smaller file.');
      }
    } else {
      alert('Please choose a file to upload.');
    }
  };

  return (
    <>
    <EmployerNavbar/>
    <div className="upload-container">
      <h2>Upload Your CV</h2>
      <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
      <p>{selectedFile && `Selected File: ${selectedFile.name}`}</p>
      <button onClick={handleUpload}>Upload</button>
    </div>  
    </>
  );
}

export default UploadCv;
