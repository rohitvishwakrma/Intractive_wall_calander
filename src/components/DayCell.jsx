import React from 'react';
import { isSameDay, isDateInRange } from '../utils/calendarUtils';

const DayCell = ({ date, isCurrentMonth, dayNumber, startDate, endDate, onDateClick, holidays }) => {
  
  const getRangeState = () => {
    if (startDate && isSameDay(date, startDate)) return 'start';
    if (endDate && isSameDay(date, endDate)) return 'end';
    if (isDateInRange(date, startDate, endDate)) return 'in-range';
    return null;
  };

  const isToday = () => {
    return isSameDay(date, new Date());
  };

  const rangeState = getRangeState();
  const today = isToday();
  const holiday = holidays[dayNumber];
  
  let cellClasses = "aspect-square flex flex-col items-center justify-center rounded-2xl cursor-pointer transition-all duration-200 relative ";
  
  if (!isCurrentMonth) cellClasses += "opacity-35 bg-[#faf7f2] ";
  else cellClasses += "bg-white ";
  
  if (rangeState === 'start') cellClasses += "bg-gradient-to-br from-[#c4a265] to-[#b8925a] text-white shadow-md ";
  if (rangeState === 'end') cellClasses += "bg-gradient-to-br from-[#b8925a] to-[#a07d48] text-white shadow-md ";
  if (rangeState === 'in-range') cellClasses += "bg-[#f5ede2] ";
  if (today && isCurrentMonth && !rangeState) cellClasses += "border-2 border-[#c4b498] bg-[#f0e8dc] ";
  if (holiday && !rangeState) cellClasses += "bg-[#fff5e8] ";

  return (
    <div
      className={cellClasses}
      onClick={() => onDateClick(date)}
    >
      {rangeState === 'in-range' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#c4a265]/15 to-[#b8925a]/15 rounded-2xl pointer-events-none"></div>
      )}
      
      <span className="text-base font-medium relative z-10">{dayNumber}</span>
      
      {holiday && !rangeState && (
        <span className="absolute bottom-1 right-1 text-xs opacity-70" title={holiday}>
          <i className="ri-gift-line text-xs"></i>
        </span>
      )}
      
      {(rangeState === 'start' || rangeState === 'end') && (
        <span className="absolute bottom-1 text-[10px] font-bold uppercase tracking-wide z-10 flex items-center gap-0.5">
          <i className={`${rangeState === 'start' ? 'ri-play-mini-fill' : 'ri-stop-mini-fill'} text-[10px]`}></i>
          <span>{rangeState === 'start' ? 'Start' : 'End'}</span>
        </span>
      )}
      
      {today && isCurrentMonth && !rangeState && (
        <i className="absolute top-1 right-1 text-[10px] text-[#c4a265] ri-circle-fill"></i>
      )}
    </div>
  );
};

export default DayCell;