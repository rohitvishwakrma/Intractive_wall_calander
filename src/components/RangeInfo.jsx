import React from 'react';

const RangeInfo = ({ startDate, endDate, onClear }) => {
  if (!startDate && !endDate) return null;

  return (
    <div className="mt-6 p-4 bg-[#f5ede2] rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3 animate-fade-in">
      <div className="flex flex-wrap gap-3 text-sm">
        {startDate && (
          <span className="flex items-center gap-2 text-[#5c4b32]">
            <i className="ri-play-circle-fill text-[#c4a265] text-base"></i>
            <span>Start: {startDate.toLocaleDateString()}</span>
          </span>
        )}
        {endDate && (
          <span className="flex items-center gap-2 text-[#5c4b32]">
            <i className="ri-stop-circle-fill text-[#a07d48] text-base"></i>
            <span>End: {endDate.toLocaleDateString()}</span>
          </span>
        )}
      </div>
      
      <button
        onClick={onClear}
        className="px-4 py-1.5 bg-white border border-[#d4c4a8] rounded-full text-sm text-[#9b8568] hover:bg-[#e8d9c8] hover:text-[#5c4b32] transition-all flex items-center gap-1"
      >
        <i className="ri-close-line text-sm"></i>
        <span>Clear Selection</span>
      </button>
    </div>
  );
};

export default RangeInfo;