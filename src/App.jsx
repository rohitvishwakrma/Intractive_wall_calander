import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import HeroSection from './components/HeroSection';
import NotesPanel from './components/NotesPanel';
import ImageManager from './components/ImageManager';
import { useCalendar } from './hooks/useCalendar';
import { useDateRange } from './hooks/useDateRange';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

function App() {
  const [showImageManager, setShowImageManager] = useState(false);
  const [uploadedImages, setUploadedImages] = useState({});
  
  const {
    currentDate,
    year,
    month,
    calendarCells,
    isAnimating,
    goToPreviousMonth,
    goToNextMonth,
    goToToday
  } = useCalendar();
  
  const {
    startDate,
    endDate,
    handleDateClick,
    clearRange
  } = useDateRange();
  
  const [notes, setNotes] = useLocalStorage('wallCalendarNotes', '');

  // Load uploaded images from localStorage
  useEffect(() => {
    const savedImages = localStorage.getItem('calendarImages');
    if (savedImages) {
      setUploadedImages(JSON.parse(savedImages));
    }
  }, []);

  // Get month image from uploaded images
  const getMonthImage = (month) => {
    return uploadedImages[month] || null;
  };

  return (
    <div className="app-modern">
      <div className="app-container">
        {/* Header with Image Manager Toggle */}
        <header className="app-header">
          <div className="header-brand">
            <div className="brand-icon">
              <i className="ri-calendar-2-line"></i>
            </div>
            <div>
              <h1>Wall Calendar</h1>
              <p>Plan your month with style</p>
            </div>
          </div>
          
          <div className="header-controls">
            <button 
              className="upload-btn" 
              onClick={() => setShowImageManager(!showImageManager)}
            >
              <i className="ri-image-edit-line"></i>
              {showImageManager ? 'View Calendar' : 'Manage Images'}
            </button>
            <button className="today-btn" onClick={goToToday}>
              <i className="ri-calendar-today-line"></i>
              Today
            </button>
            <div className="month-nav">
              <button onClick={goToPreviousMonth}>
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <span>
                {currentDate.toLocaleString('default', { month: 'long' })} {year}
              </span>
              <button onClick={goToNextMonth}>
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        {showImageManager ? (
          <ImageManager onImagesUpdate={setUploadedImages} />
        ) : (
          <>
            <div className="app-main">
              {/* Hero Section */}
              <div className="hero-wrapper">
                <HeroSection 
                  currentDate={currentDate} 
                  getMonthImage={getMonthImage}
                  uploadedImages={uploadedImages}
                />
              </div>

              {/* Calendar Section */}
              <div className="calendar-wrapper">
                <Calendar
                  currentDate={currentDate}
                  year={year}
                  month={month}
                  calendarCells={calendarCells}
                  isAnimating={isAnimating}
                  startDate={startDate}
                  endDate={endDate}
                  onDateClick={handleDateClick}
                  onPrev={goToPreviousMonth}
                  onNext={goToNextMonth}
                  onToday={goToToday}
                  onClearRange={clearRange}
                />
              </div>

              {/* Notes Section */}
              <div className="notes-wrapper">
                <NotesPanel
                  startDate={startDate}
                  endDate={endDate}
                  notes={notes}
                  onNotesChange={setNotes}
                />
              </div>
            </div>

            {/* Range Selection Bar */}
            {(startDate || endDate) && (
              <div className="range-footer">
                <div className="range-info-modern">
                  {startDate && (
                    <div className="range-modern start">
                      <i className="ri-play-circle-fill"></i>
                      <span>From: {startDate.toLocaleDateString()}</span>
                    </div>
                  )}
                  {endDate && (
                    <div className="range-modern end">
                      <i className="ri-stop-circle-fill"></i>
                      <span>To: {endDate.toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                <button className="clear-modern" onClick={clearRange}>
                  <i className="ri-close-line"></i>
                  Clear Selection
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;