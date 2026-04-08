// Get days in month
export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Get first day of month (0 = Sunday)
export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

// Format date to YYYY-MM-DD
export const formatYMD = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// Check if two dates are the same day
export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

// Check if date is in range
export const isDateInRange = (date, start, end) => {
  if (!start) return false;
  if (end) {
    return (date > start && date < end) || (date > end && date < start);
  }
  return false;
};

// 2026 WALL CALENDAR IMAGES - HAR MONTH KI ALAG WALL CALENDAR PHOTO
export const getMonthImage = (month) => {
  const images = {
    // January 2026 - Yellow letters wall calendar
    0: './image',
    
    // February 2026 - Black background calendar
    1: 'https://images.pexels.com/photos/568021/pexels-photo-568021.jpeg?w=800&h=600&fit=crop',
    
    // March 2026 - Blue 3D letters calendar
    2: 'https://images.pexels.com/photos/56866/garden-spring-flower-meadow-56866.jpeg?w=800&h=600&fit=crop',
    
    // April 2026 - Modern black calendar
    3: 'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?w=800&h=600&fit=crop',
    
    // May 2026 - 3D render calendar
    4: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?w=800&h=600&fit=crop',
    
    // June 2026 - Pastel green letters calendar
    5: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?w=800&h=600&fit=crop',
    
    // July 2026 - Abstract blue background calendar
    6: 'https://images.pexels.com/photos/842519/pexels-photo-842519.jpeg?w=800&h=600&fit=crop',
    
    // August 2026 - Red dates calendar
    7: 'https://images.pexels.com/photos/1151418/pexels-photo-1151418.jpeg?w=800&h=600&fit=crop',
    
    // September 2026 - 3D text calendar
    8: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?w=800&h=600&fit=crop',
    
    // October 2026 - Minimal style calendar
    9: 'https://images.pexels.com/photos/163166/leaf-nature-autumn-yellow-163166.jpeg?w=800&h=600&fit=crop',
    
    // November 2026 - Dark background calendar
    10: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?w=800&h=600&fit=crop',
    
    // December 2026 - Large 3D text calendar
    11: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?w=800&h=600&fit=crop',
  };
  return images[month];
};

// Get holidays
export const getHolidays = (year, month) => {
  const holidays = {
    '1-1': 'New Year\'s Day',
    '2-14': 'Valentine\'s Day',
    '3-17': 'St. Patrick\'s Day',
    '7-4': 'Independence Day',
    '10-31': 'Halloween',
    '11-28': 'Thanksgiving',
    '12-25': 'Christmas Day',
    '12-31': 'New Year\'s Eve'
  };
  
  const monthKey = month + 1;
  const result = {};
  
  Object.keys(holidays).forEach(key => {
    const [holidayMonth, holidayDay] = key.split('-').map(Number);
    if (holidayMonth === monthKey) {
      result[holidayDay] = holidays[key];
    }
  });
  
  return result;
};

// Generate calendar grid
export const generateCalendarGrid = (year, month) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);
  const cells = [];

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    const dayNum = prevMonthDays - i;
    const date = new Date(year, month - 1, dayNum);
    cells.push({ date, isCurrentMonth: false, dayNumber: dayNum });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    cells.push({ date, isCurrentMonth: true, dayNumber: d });
  }

  // Next month days
  const remaining = 42 - cells.length;
  for (let n = 1; n <= remaining; n++) {
    const date = new Date(year, month + 1, n);
    cells.push({ date, isCurrentMonth: false, dayNumber: n });
  }

  return cells;
};

// Month names
export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Week day names
export const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// Seasonal messages
export const seasonalMessages = {
  winter: { text: 'Winter Magic 2026', icon: 'ri-snowflake-line' },
  spring: { text: 'Spring Blossoms 2026', icon: 'ri-flower-line' },
  summer: { text: 'Summer Sunshine 2026', icon: 'ri-sun-line' },
  autumn: { text: 'Autumn Colors 2026', icon: 'ri-leaf-line' }
};

export const getSeason = (month) => {
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
};