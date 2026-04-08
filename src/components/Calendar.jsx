import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import RangeInfo from './RangeInfo';

const Calendar = ({ 
  currentDate, 
  year, 
  month, 
  calendarCells, 
  isAnimating,
  startDate, 
  endDate, 
  onDateClick, 
  onPrev, 
  onNext, 
  onToday,
  onClearRange 
}) => {
  return (
    <div className={`w-full transition-all duration-200 ${isAnimating ? 'opacity-70 scale-98' : 'opacity-100 scale-100'}`}>
      <CalendarHeader
        year={year}
        month={month}
        onPrev={onPrev}
        onNext={onNext}
        onToday={onToday}
      />
      
      <CalendarGrid
        calendarCells={calendarCells}
        startDate={startDate}
        endDate={endDate}
        onDateClick={onDateClick}
        currentDate={currentDate}
      />
      
      <RangeInfo
        startDate={startDate}
        endDate={endDate}
        onClear={onClearRange}
      />
    </div>
  );
};

export default Calendar;