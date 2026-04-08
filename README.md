#  Interactive Wall Calendar

1. PROJECT OVERVIEW
1.1 Project Name
** Interactive Wall Calendar - Frontend Engineering Challenge


1.2 Objective
** Build a polished, interactive React component inspired by a physical wall calendar, featuring date range selection, integrated notes, and responsive design.


1.3 Target Audience
**Users who want to plan their monthly schedule**

**Individuals who need to track date ranges and add notes**

**Mobile and desktop users who prefer a beautiful calendar interface**

## ✨ Features
![alt text](<Screenshot 2026-04-08 152132.png>) ![alt text](<Screenshot 2026-04-08 190802.png>) ![alt text](<Screenshot 2026-04-08 190751.png>) ![alt text](<Screenshot 2026-04-08 190701.png>) ![alt text](<Screenshot 2026-04-08 190640.png>)

### 🎯 Core Requirements


| Feature | Status | Description |
|---------|--------|-------------|
| 🖼️ **Wall Calendar Aesthetic** | ✅ | Physical calendar look with monthly hero images |
| 📅 **Day Range Selector** | ✅ | Select start/end dates with visual states |
| 📝 **Integrated Notes Section** | ✅ | Auto-save notes with localStorage |
| 📱 **Fully Responsive** | ✅ | Desktop, tablet, and mobile layouts |


### 🎨 Creative Additions

| Feature                   | Status | Description                               |
|---------------------------|--------|-------------------------------------------|
| 🎉 **Holiday Markers**   | ✅     |Special dates marked with icons            |
| 📍 **Today Indicator**   | ✅     |Current date highlighted                   |
| 🖼️ **Image Upload**      | ✅     | Upload PNG images for each month          |
| 🔄 **Image Compression** | ✅     | Auto-compress images to 400x400           |
| 💾 **LocalStorage Save** | ✅     | All data persists in browser              |
| 📊 **Progress Bar**      | ✅     | Track upload completion                   |
| 🌸 **Seasonal Messages** | ✅     |Dynamic messages with icons                |
| ✨ **Smooth Animations** | ✅     | Month transitions and hover effects       |

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/interactive-wall-calendar.git

# Navigate to project directory
cd interactive-wall-calendar

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser and visit
http://localhost:5173
## folder-structure
```
interactive-wall-calendar/
├── public/
│   └── images/
│       └── calendar/           # Monthly calendar images
│           ├── january-2026.jpg
│           ├── february-2026.jpg
│           └── ...
├── src/
│   ├── components/
│   │   ├── Calendar.jsx        # Main calendar component
│   │   ├── CalendarHeader.jsx  # Month navigation
│   │   ├── CalendarGrid.jsx    # Calendar grid layout
│   │   ├── DayCell.jsx         # Individual day cell
│   │   ├── HeroSection.jsx     # Hero image section
│   │   ├── NotesPanel.jsx      # Notes section
│   │   ├── RangeInfo.jsx       # Range selection info
│   │   ├── ImageManager.jsx    # Image upload manager
│   │   └── ImageUpload.jsx     # Individual image upload
│   ├── hooks/
│   │   ├── useCalendar.js      # Calendar state & navigation
│   │   ├── useDateRange.js     # Date range selection logic
│   │   └── useLocalStorage.js  # LocalStorage operations
│   ├── utils/
│   │   └── calendarUtils.js    # Helper functions
│   ├── App.jsx                 # Main application
│   ├── App.css                 # Global styles
│   └── main.jsx               # Entry point
├── package.json
├── README.md
└── index.html

