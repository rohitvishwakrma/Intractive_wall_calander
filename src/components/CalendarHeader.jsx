import React from 'react';
import { monthNames } from '../utils/calendarUtils';

const CalendarHeader = ({ year, month, onPrev, onNext, onToday }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div className="font-playfair">
        <span className="text-3xl sm:text-4xl font-bold text-[#2c2418]">
          {monthNames[month]}
        </span>
        <span className="text-2xl sm:text-3xl font-normal text-[#8b7355] ml-2">
          {year}
        </span>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={onToday}
          className="px-4 py-2 bg-[#d4c4a8] text-white rounded-full text-sm font-medium hover:bg-[#c4b498] transition-all hover:-translate-y-0.5 shadow-md flex items-center gap-1"
        >
          <i className="ri-calendar-today-line text-sm"></i>
          <span>Today</span>
        </button>
        <button
          onClick={onPrev}
          className="w-10 h-10 bg-[#f5ede2] border border-[#e8d9c8] rounded-full hover:bg-[#e8d9c8] transition-all hover:-translate-y-0.5 flex items-center justify-center"
        >
          <i className="ri-arrow-left-s-line text-xl"></i>
        </button>
        <button
          onClick={onNext}
          className="w-10 h-10 bg-[#f5ede2] border border-[#e8d9c8] rounded-full hover:bg-[#e8d9c8] transition-all hover:-translate-y-0.5 flex items-center justify-center"
        >
          <i className="ri-arrow-right-s-line text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;