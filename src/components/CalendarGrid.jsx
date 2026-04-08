import React from 'react';
import DayCell from './DayCell';
import { weekDays, getHolidays } from '../utils/calendarUtils';

const CalendarGrid = ({ calendarCells, startDate, endDate, onDateClick, currentDate }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const holidays = getHolidays(year, month);

  return (
    <div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-bold text-[#9b8568] tracking-wider py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarCells.map((cell, idx) => (
          <DayCell
            key={idx}
            date={cell.date}
            isCurrentMonth={cell.isCurrentMonth}
            dayNumber={cell.dayNumber}
            startDate={startDate}
            endDate={endDate}
            onDateClick={onDateClick}
            holidays={holidays}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;