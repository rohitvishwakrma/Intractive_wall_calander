import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

const ImageManager = ({ onImagesUpdate }) => {
  const [images, setImages] = useState({});
  const [saveStatus, setSaveStatus] = useState('');
  const [compressedImages, setCompressedImages] = useState({});

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const savedImages = localStorage.getItem('calendarImages');
    if (savedImages) {
      const parsed = JSON.parse(savedImages);
      setImages(parsed);
      onImagesUpdate(parsed);
    }
  }, []);

  // Compress image function
  const compressImage = (base64String, maxWidth = 400, maxHeight = 400, quality = 0.6) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64String;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        
        // Create canvas and compress
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Compress and convert to JPEG (smaller than PNG)
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
    });
  };

  const handleImageUpload = async (month, imageData) => {
    if (imageData) {
      // Compress image before saving
      const compressed = await compressImage(imageData, 400, 400, 0.5);
      setImages(prev => ({ ...prev, [month]: compressed }));
    } else {
      const newImages = { ...images };
      delete newImages[month];
      setImages(newImages);
    }
    setSaveStatus('unsaved');
  };

  const saveAllImages = () => {
    try {
      // Check total size before saving
      let totalSize = 0;
      Object.values(images).forEach(img => {
        const size = Math.ceil((img.length * 3) / 4);
        totalSize += size;
      });
      
      // Convert to MB
      const totalSizeMB = totalSize / (1024 * 1024);
      
      if (totalSizeMB > 4.5) {
        alert(`Total images size is ${totalSizeMB.toFixed(2)}MB. Please compress images more or remove some images.`);
        return;
      }
      
      localStorage.setItem('calendarImages', JSON.stringify(images));
      onImagesUpdate(images);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
      alert('All images saved successfully!');
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        alert('Storage quota exceeded! Please use smaller images (max 400x400 pixels) or upload fewer images.');
      } else {
        alert('Error saving images: ' + error.message);
      }
    }
  };

  const clearAllImages = () => {
    if (window.confirm('Are you sure you want to clear all images?')) {
      setImages({});
      localStorage.removeItem('calendarImages');
      onImagesUpdate({});
      setSaveStatus('cleared');
      setTimeout(() => setSaveStatus(''), 2000);
    }
  };

  const completedCount = Object.keys(images).length;

  return (
    <div className="image-manager">
      <div className="manager-header">
        <div>
          <h2>2026 Wall Calendar Images</h2>
          <p>Upload PNG images for each month (Auto-compressed to 400x400)</p>
        </div>
        <div className="manager-actions">
          <button onClick={saveAllImages} className="save-btn">
            <i className="ri-save-line"></i> Save All
          </button>
          <button onClick={clearAllImages} className="clear-btn">
            <i className="ri-delete-bin-line"></i> Clear All
          </button>
        </div>
      </div>

      {saveStatus === 'saved' && (
        <div className="success-message">
          <i className="ri-checkbox-circle-line"></i> All images saved successfully!
        </div>
      )}

      {saveStatus === 'cleared' && (
        <div className="success-message" style={{ background: '#fee2e2', color: '#dc2626' }}>
          <i className="ri-delete-bin-line"></i> All images cleared!
        </div>
      )}

      <div className="progress-bar">
        <div className="progress-info">
          <span>
            <i className="ri-cloud-upload-line"></i> Upload Progress
          </span>
          <span>
            <i className="ri-image-line"></i> {completedCount}/12 months completed
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${(completedCount / 12) * 100}%` }}></div>
        </div>
        <div className="storage-warning" style={{ marginTop: '8px', fontSize: '11px', color: '#666' }}>
          <i className="ri-alert-line"></i> Images are compressed to save storage space (max 400x400 pixels)
        </div>
      </div>

      <div className="images-grid">
        {monthNames.map((month, index) => (
          <ImageUpload 
            key={index}
            month={index} 
            onImageUpload={handleImageUpload}
            existingImage={images[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageManager;