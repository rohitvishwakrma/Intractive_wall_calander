import { useState, useCallback } from 'react';
import { isSameDay } from '../utils/calendarUtils';

export const useDateRange = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateClick = useCallback((clickedDate) => {
    if (!startDate) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (isSameDay(clickedDate, startDate)) {
        setStartDate(null);
        setEndDate(null);
      } else if (clickedDate < startDate) {
        setEndDate(startDate);
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
      }
    } else if (startDate && endDate) {
      setStartDate(clickedDate);
      setEndDate(null);
    }
  }, [startDate, endDate]);

  const clearRange = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
  }, []);

  return {
    startDate,
    endDate,
    handleDateClick,
    clearRange
  };
};