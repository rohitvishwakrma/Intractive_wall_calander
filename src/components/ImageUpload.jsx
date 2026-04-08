import React, { useState } from 'react';

const ImageUpload = ({ month, onImageUpload, existingImage }) => {
  const [preview, setPreview] = useState(existingImage || null);
  const [isCompressing, setIsCompressing] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const compressAndUpload = (file) => {
    setIsCompressing(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      
      img.onload = () => {
        // Calculate new dimensions (max 400px)
        let width = img.width;
        let height = img.height;
        const maxSize = 400;
        
        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }
        
        // Create canvas and compress
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to JPEG (smaller than PNG)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.5);
        setPreview(compressedDataUrl);
        onImageUpload(month, compressedDataUrl);
        setIsCompressing(false);
      };
    };
    
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
        if (file.size > 2 * 1024 * 1024) {
          alert('File is too large! Please select an image smaller than 2MB');
          return;
        }
        compressAndUpload(file);
      } else {
        alert('Please upload a PNG, JPG, or JPEG file only!');
      }
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageUpload(month, null);
  };

  return (
    <div className="image-upload-card">
      <h3>{monthNames[month]} 2026</h3>
      
      {preview ? (
        <div className="preview-container">
          <img src={preview} alt={`${monthNames[month]} preview`} />
          <button onClick={removeImage} className="remove-btn">
            <i className="ri-close-line"></i> Remove
          </button>
        </div>
      ) : (
        <div className="upload-area">
          <i className="ri-image-add-line"></i>
          <p>{isCompressing ? 'Compressing...' : 'Upload image'}</p>
          <p style={{ fontSize: '10px', color: '#999' }}>PNG, JPG (Max 2MB)</p>
          <label className="upload-label">
            Choose File
            <input type="file" accept="image/png,image/jpeg,image/jpg" onChange={handleFileUpload} hidden />
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;