import { useState, useEffect } from 'react';

const DropdownSelectDate = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [years, setYears] = useState<number[]>([]);
  const [days, setDays] = useState<number[]>([]);

  useEffect(() => {
    const yearsArray = [];
    const currentYear = today.getFullYear();
    const endYear = currentYear + 5;
    for (let i = currentYear; i <= endYear; i++) {
      yearsArray.push(i);
    }
    setYears(yearsArray);
  }, [today]);

  useEffect(() => {
    setDays([]);
    const daysCount = getDaysInMonth(date.getMonth(), date.getFullYear());
    const daysArray = [];
    for (let i = 1; i <= daysCount; i++) {
      daysArray.push(i);
    }
    setDays(daysArray);
  }, [date]);

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const day = parseInt(e.target.value);
    const newDate = new Date(date);
    newDate.setDate(day);
    setDate(newDate);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(e.target.value);
    const newDate = new Date(date);
    newDate.setMonth(month);
    setDate(newDate);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(e.target.value);
    const newDate = new Date(date);
    newDate.setFullYear(year);
    setDate(newDate);
  };

  const getDaysInMonth = (month: number, year: number) => {
    if (month === 1) {
      // February
      return isLeapYear(year) ? 29 : 28;
    } else {
      // Other months
      const daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
      return daysInMonth[month];
    }
  };

  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };
  return (
    <div className="flex gap-2 items-center">
      <select id="select-day" value={date.getDate()} onChange={handleDayChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white">
        {days.map(day => <option key={day} value={day}>{day}</option>)}
      </select>
      <select id="select-month" value={date.getMonth()} onChange={handleMonthChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white">
        <option value={0}>January</option>
        <option value={1}>February</option>
        <option value={2}>March</option>
        <option value={3}>April</option>
        <option value={4}>May</option>
        <option value={5}>June</option>
        <option value={6}>July</option>
        <option value={7}>August</option>
        <option value={8}>September</option>
        <option value={9}>October</option>
        <option value={10}>November</option>
        <option value={11}>December</option>
      </select>
      <select id="select-year" value={date.getFullYear()} onChange={handleYearChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white">
        {years.map(year => <option key={year} value={year}>{year}</option>)}
      </select>
    </div>
  );
};

export default DropdownSelectDate;
