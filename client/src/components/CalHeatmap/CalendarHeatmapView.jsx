import React, { useEffect, useRef, useState } from 'react';
import './CalendarHeatmapView.css';

import CalHeatmap from 'cal-heatmap';
import Tooltip from '@cal-heatmap/tooltip'; // Correct way for v4





const CalendarHeatmapView = ({ entriesData }) => {
  const calendarContainerRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [cal, setCal] = useState(null);
  
  // Format date for display
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };
  
  const [displayDate, setDisplayDate] = useState(formatMonthYear(currentDate));
  
  useEffect(() => {
    // Convert entriesData to the format expected by cal-heatmap
    const formattedData = entriesData.map(entry => ({
      date: new Date(entry.date),
      value: entry.count
    }));
    
    // Clear any existing calendar
    if (calendarContainerRef.current) {
      calendarContainerRef.current.innerHTML = '';
    }
    
    try {
      // Create a new instance
      const newCal = new CalHeatmap();
      

      
      // Paint the calendar
      newCal.paint({
        itemSelector: calendarContainerRef.current,
        range: 1,
        domain: {
          type: 'month',
          gutter: 10,
          label: {
            text: formatMonthYear(currentDate),
            textAlign: 'center'
          }
        },
        subDomain: {
          type: 'day',
          width: 50,
          height: 25,
          label: 'D',
          radius: 5,
        },
        data: {
          source: formattedData,
          type: 'json',
          x: 'date',
          y: 'value',
        },
        scale: {
          color: {
            type: 'threshold',
            range: ['#eeeeee', '#c8e2b4', '#8cc569', '#5ba743', '#2d7b4f'],
            domain: [1, 2, 3, 4]
          }
        },
        date: {
          start: currentDate,
          highlight: [new Date()]
        }
      });
      
      setCal(newCal);
    } catch (err) {
      console.error("Error initializing calendar:", err);
    }
    
    // Cleanup function
    return () => {
      if (calendarContainerRef.current) {
        calendarContainerRef.current.innerHTML = '';
      }
    };
  }, [entriesData, currentDate]);
  
  const handlePrevious = (e) => {
    e.preventDefault();
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
    setDisplayDate(formatMonthYear(newDate));
  };
  
  const handleNext = (e) => {
    e.preventDefault();
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
    setDisplayDate(formatMonthYear(newDate));
  };
  
  return (
    <div className="heatmap-widget">
      <div className="calendar-header">
        <h3 className="current-month">{displayDate}</h3>
      </div>
      <div
        className="heatmap-container"
        ref={calendarContainerRef}
      ></div>
      <div className="calendar-navigation">
        <button
          className="calendar-nav-btn"
          onClick={handlePrevious}
        >
          ← Previous
        </button>
        <button
          className="calendar-nav-btn"
          onClick={handleNext}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default CalendarHeatmapView;