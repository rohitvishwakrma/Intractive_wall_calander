import { useState, useCallback } from 'react';
import { generateCalendarGrid } from '../utils/calendarUtils';

export const useCalendar = (initialDate = new Date()) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [isAnimating, setIsAnimating] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendarCells = generateCalendarGrid(year, month);

  const changeMonth = useCallback((newDate) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentDate(newDate);
      setIsAnimating(false);
    }, 200);
  }, []);

  const goToPreviousMonth = useCallback(() => {
    changeMonth(new Date(year, month - 1, 1));
  }, [year, month, changeMonth]);

  const goToNextMonth = useCallback(() => {
    changeMonth(new Date(year, month + 1, 1));
  }, [year, month, changeMonth]);

  const goToToday = useCallback(() => {
    changeMonth(new Date());
  }, [changeMonth]);

  return {
    currentDate,
    year,
    month,
    calendarCells,
    isAnimating,
    goToPreviousMonth,
    goToNextMonth,
    goToToday
  };
};