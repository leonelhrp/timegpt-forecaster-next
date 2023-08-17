import moment from 'moment';
import Holidays from 'date-holidays';
import * as dfd from 'danfojs';

export function datesToDataframe({
  data,
  freq,
  horizon,
  defaultCalVars,
  countries
}: {
  data: dfd.DataFrame,
  freq: string,
  horizon: number,
  defaultCalVars: boolean,
  countries: string
}): dfd.DataFrame {
  const startDate = data['ds'].min();
  // Generate a list of dates for the entire period, including the horizon
  const dateRange = dfd.dateRange({ start: startDate, period: data.shape[0] + horizon, freq: freq });
  const dateRangeArray = Array.from(dateRange);
  let df = new dfd.DataFrame({ ds: dateRangeArray });
  let sf = new dfd.Series(dateRange)

  if (countries != "") {
    const countriesArray = countries.split(',');
    for (const country of countriesArray) {
      // Get a list of holidays for that country in the date range
      const hd = new Holidays(country);
      const years = df['ds'].apply((x: any) => new Date(x).getFullYear());
      const yearsArray: number[] = years['$data'];
      const uniqueYears: number[] = Array.from(new Set(yearsArray.map(y => Number(y))));
      const countryHolidays = uniqueYears.flatMap(year => hd.getHolidays(year));

      // Create new column in dataframe for that country
      df[country] = df['ds'].apply((x: any) => countryHolidays.includes(x) ? 1 : 0);
    }
  }
  if (defaultCalVars) {
    // Frequencies containing day information
    const dayFreqs = ["D", "B", "H", "T", "S", "L", "U", "N"];
    // Frequencies containing week or month information
    const weekMonthFreqs = ["W", "M", "Q", "A", "Y"];
    if (dayFreqs.some(day_freq => freq.startsWith(day_freq))) {
      df['day_of_week'] = df['ds'].apply((x: any) => {
        const dayOfWeek = new Date(x).getDate();
        return dayOfWeek
      });
      df['is_weekend'] = df['day_of_week'].apply((x: any) => {
        const isWeekend = [5, 6].includes(x) ? 1 : 0;
        return isWeekend
      });
      df['week_number'] = df['ds'].apply((x: any) => {
        const weekNumber = moment(x).isoWeek();
        return weekNumber
      });

      console.log('df: ', df);
      df.print();

      let dayDummies = dfd.getDummies(df['day_of_week'], { prefix: 'day', prefixSeparator: '_' });
      let dayColumns = dayDummies.columns;
      for (let col of dayColumns) {
          dayDummies.asType(col, "int32");
      }

      df = dfd.concat({ dfList: [df, dayDummies], axis: 1 }) as dfd.DataFrame;

      df['month'] = df['ds'].apply((x: any) => new Date(x).getMonth());

      // Convert month to dummy variables
      let monthDummies = dfd.getDummies(df['month'], { prefix: 'month' });
      let monthColumns = monthDummies.columns;
      for (let col of monthColumns) {
          monthDummies.asType(col, "int32");
      }

      df = dfd.concat({ dfList: [df, monthDummies], axis: 1 }) as dfd.DataFrame;

      //df.print();
      //df.drop({ columns: ['month', 'day_of_week'], inplace: true });
    }
    if (weekMonthFreqs.some(weekMonthFreq => freq.startsWith(weekMonthFreq))) {
      //df['week_number'] = moment(df['ds']).isoWeek();
      df['month'] = df['ds'].apply((x: any) => new Date(x).getMonth());
      // Convert month to dummy variables
      let monthDummies = dfd.getDummies(df['month'], { prefix: 'month' });
      let monthColumns = monthDummies.columns;
      for (let col of monthColumns) {
          monthDummies.asType(col, "int32");
      }

      df = dfd.concat({ dfList: [df, monthDummies], axis: 1 }) as dfd.DataFrame;
      df.drop({ columns: ['month'], inplace: true });
    }
  }
  return df;
}
