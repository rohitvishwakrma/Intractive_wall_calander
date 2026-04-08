import React from 'react';
import { monthNames, getSeason, seasonalMessages } from '../utils/calendarUtils';

const HeroSection = ({ currentDate, getMonthImage, uploadedImages }) => {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const monthImage = getMonthImage(month);
  const season = getSeason(month);
  const seasonData = seasonalMessages[season];
  const hasImage = uploadedImages[month];

  // If no image uploaded, show upload prompt
  if (!hasImage) {
    return (
      <div className="hero-placeholder">
        <div className="placeholder-content">
          <i className="ri-image-line text-6xl text-[#c4a265] mb-4"></i>
          <h3 className="text-xl font-semibold text-[#2c2418] mb-2">No Image Uploaded</h3>
          <p className="text-[#9b8568] text-sm">Please upload {monthNames[month]}  Image</p>
          <p className="text-[#9b8568] text-xs mt-2">Click "Manage Images" button to upload</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-section-modern">
      <div className="hero-card">
        <div className="hero-image-container">
          <img 
            src={monthImage}
            alt={`${monthNames[month]} 2026 Wall Calendar`}
            className="hero-image"
          />
          <div className="hero-overlay">
            <div className="hero-badge">
              <i className={`${seasonData.icon}`}></i>
              <span>{seasonData.text}</span>
            </div>
          </div>
        </div>
        <div className="hero-info">
          <h3 className="font-bold">{monthNames[month]} {year}</h3>
          <p className="font-bold">Wall Calendar Collection.</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;