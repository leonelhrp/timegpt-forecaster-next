import Holidays from 'date-holidays';
import { TimeGPTPlotCountryHolidays, TimeGPTPlotItem } from "@/types/forecast";

export const formatDate = (inputDate: string): string => {
  const months: string[] = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  const date = new Date(inputDate);
  const monthName = months[date.getMonth()];
  const day = date.getDate();

  return `${monthName} ${day}`;
}

export const getDateRange = (data: TimeGPTPlotItem[], horizon: number): Date[] => {
  const startDate = new Date(data[0].ds as string);
  const endDate = new Date(data[data.length - 1].ds as string);
  const dateRange: Date[] = [];
  let currentDate = new Date(startDate.getTime());
  while (currentDate <= endDate) {
    dateRange.push(new Date(currentDate.getTime()));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  for (let i = 0; i < horizon; i++) {
    const nextDate = new Date(endDate.getTime());
    nextDate.setDate(nextDate.getDate() + i + 1);
    dateRange.push(nextDate);
  }
  return dateRange;
};

export const createDataFrame = (dateRange: Date[]): TimeGPTPlotItem[] => {
  return dateRange.map((date) => ({ ds: date.toISOString().slice(0, 10) }));
};

export const addCountryHolidays = (df: TimeGPTPlotItem[], dateRange: Date[], countries: string) => {
  if (countries !== "") {
    const countryCodes = countries.split(",");
    for (const countryCode of countryCodes) {
      const countryHolidays: TimeGPTPlotCountryHolidays = {};
      const hd = new Holidays(countryCode);
      for (const date of dateRange) {
        const isHoliday = hd.isHoliday(date);
        countryHolidays[date.toISOString().slice(0, 10)] = Array.isArray(isHoliday) ? true : isHoliday;
      }
      for (const row of df) {
        row[countryCode] = countryHolidays[row.ds as string];
      }
    }
  }
};

export const getWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export const addDefaultColumns = (df: TimeGPTPlotItem[], freq: string) => {
  const dayFreqs = ["D", "B", "H", "T", "S", "L", "U", "N"];
  const weekMonthFreqs = ["W", "M", "Q", "A", "Y"];

  if (dayFreqs.some((dayFreq) => freq.startsWith(dayFreq))) {
    for (const row of df) {
      const date = new Date(row.ds as string);
      row["day_of_week"] = date.getDay();
      row["is_weekend"] = date.getDay() === 0 || date.getDay() === 6;
      row["week_number"] = getWeekNumber(date);
      for (let i = 0; i < 7; i++) {
        row[`day${i}`] = i === date.getDay() ? 1 : 0;
      }
      row["month"] = date.getMonth() + 1;
      for (let i = 2; i <= 12; i++) {
        row[`month${i}`] = i === date.getMonth() + 1 ? 1 : 0;
      }
    }
  }

  if (weekMonthFreqs.some((weekMonthFreq) => freq.startsWith(weekMonthFreq))) {
    for (const row of df) {
      const date = new Date(row.ds as string);
      row["month"] = date.getMonth() + 1;
      for (let i = 2; i <= 12; i++) {
        row[`month${i}`] = i === date.getMonth() + 1 ? 1 : 0;
      }
    }
  }
};