import React, { useState } from 'react';
import { formatYMD } from '../utils/calendarUtils';

const NotesPanel = ({ startDate, endDate, notes, onNotesChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const getContextMessage = () => {
    if (startDate && endDate) {
      return `Selected Range: ${formatYMD(startDate)} → ${formatYMD(endDate)}`;
    }
    if (startDate && !endDate) {
      return `Start Date: ${formatYMD(startDate)} (click another date to complete range)`;
    }
    return `General Monthly Notes`;
  };
  
  const getContextIcon = () => {
    if (startDate && endDate) return 'ri-calendar-range-line';
    if (startDate && !endDate) return 'ri-calendar-star-line';
    return 'ri-sticky-note-line';
  };
  
  const getPlaceholder = () => {
    if (startDate && endDate) {
      return `Write notes for your selected date range (${formatYMD(startDate)} to ${formatYMD(endDate)})...\n\n💡 Ideas: Plan events, track progress, set reminders for this period.`;
    }
    if (startDate && !endDate) {
      return `Add a note for ${formatYMD(startDate)}...\n\n💡 Tip: Select an end date to create a range and take notes for the entire period.`;
    }
    return `Jot down your thoughts, reminders, or special events for this month...\n\n💡 Pro tip: Select a date range to attach notes to specific periods!`;
  };
  
  const getWordCount = () => {
    const words = notes.trim().split(/\s+/).filter(w => w.length > 0);
    return words.length;
  };
  
  const handleClearNotes = () => {
    if (window.confirm('Clear all notes? This action cannot be undone.')) {
      onNotesChange('');
    }
  };

  return (
    <div className="bg-[#fffdf8] rounded-2xl border border-[#f0e6da] overflow-hidden transition-all duration-300 h-full">
      <div 
        className="flex justify-between items-center p-5 bg-[#faf7f2] cursor-pointer hover:bg-[#f5ede2] transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <i className="ri-ball-pen-fill text-2xl text-[#c4a265]"></i>
          <h3 className="font-playfair font-semibold text-xl text-[#2c2418]">Notes & Memos</h3>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-full text-[#9b8568] hover:bg-[#e8d9c8] transition-all">
          <i className={`${isExpanded ? 'ri-subtract-line' : 'ri-add-line'} text-xl`}></i>
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-6 animate-slide-down">
          <div className="mb-5 p-3 bg-[#f5ede2] rounded-xl">
            <div className="flex items-center gap-2 text-base text-[#5c4b32] font-medium">
              <i className={`${getContextIcon()} text-lg`}></i>
              <span>{getContextMessage()}</span>
            </div>
          </div>
          
          <textarea
            className="w-full p-5 border border-[#e8d9c8] rounded-xl font-mono text-base leading-relaxed resize-y focus:outline-none focus:border-[#c4a265] focus:ring-2 focus:ring-[#c4a265]/10 transition-all min-h-[300px]"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder={getPlaceholder()}
            rows={12}
          />
          
          <div className="flex flex-wrap justify-between items-center gap-3 mt-5 pt-4 border-t border-[#f0e6da]">
            <div className="flex gap-5 text-sm text-[#9b8568]">
              <span className="flex items-center gap-1.5">
                <i className="ri-text-line text-base"></i> {notes.length} characters
              </span>
              <span className="flex items-center gap-1.5">
                <i className="ri-book-open-line text-base"></i> {getWordCount()} words
              </span>
              <span className="flex items-center gap-1.5">
                <i className="ri-save-line text-base"></i> Auto-saved
              </span>
            </div>
            
            <button
              onClick={handleClearNotes}
              className="px-4 py-2 border border-[#e8d9c8] rounded-full text-sm text-[#9b8568] hover:bg-[#f5ede2] hover:border-[#c4a265] transition-all flex items-center gap-1.5"
            >
              <i className="ri-delete-bin-line text-base"></i>
              <span>Clear All</span>
            </button>
          </div>
          
          <div className="mt-4 text-center text-sm text-[#b8a88c] flex items-center justify-center gap-1.5">
            <i className="ri-lightbulb-line text-base"></i>
            <span>Tip: Notes are automatically saved to your browser</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPanel;