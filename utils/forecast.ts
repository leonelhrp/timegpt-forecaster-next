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

interface PreprocessExogenousParams {
  file: string | null;
  calDf: dfd.DataFrame | null;
  horizon: number;
}

async function preprocessExogenous({
  file, calDf, horizon
}: PreprocessExogenousParams): Promise<[dfd.DataFrame | null, dfd.DataFrame | null]> {
  if (file != null) {
    let XDf = await dfd.readCSV(file);
    let requiredColumns = ["unique_id", "ds"];
    // Check if all required columns are present in X_df
    if (!requiredColumns.every(column => XDf.columns.includes(column))) {
      throw new Error("Not all required columns are present in the exogenous data.");
    }
    XDf['ds'] = XDf['ds'].to_datetime();
    XDf['unique_id'] = XDf['unique_id'].astype('string');
    if (calDf != null) {
      XDf = XDf.merge(calDf);
    }
    let XDfTest = XDf.groupby(['unique_id']).apply((group) => group.tail(horizon));
    let XDfTrain = XDf.drop({ index: XDfTest.index });
    return [XDfTrain, XDfTest];
  } else if (calDf != null) {
    let XDfTest = calDf.groupby(['unique_id']).apply((group) => group.tail(horizon));
    let XDfTrain = calDf.drop({ index: XDfTest.index });
    return [XDfTrain, XDfTest];
  } else {
    return [null, null];
  }
}

interface PredictFromApiParams {
  df: dfd.DataFrame;
  horizon: number;
  XDf: dfd.DataFrame | null;
  XDfFuture: dfd.DataFrame | null;
  finetuneSteps: number;
  level: Array<number>;
  cleanExFirst: boolean;
  freq: string;
}

async function predictFromApi({
  df,
  horizon,
  XDf,
  XDfFuture,
  finetuneSteps,
  level,
  cleanExFirst,
  freq
}: PredictFromApiParams) {
  return [df, null];
}

interface PerformForecastParams {
  file: string;
  fileEx: string | null;
  freq: string;
  horizon: number;
  finetuneSteps: number;
  level: Array<number>;
  addDefaultCalVars: boolean;
  countries: string;
}

async function performForecast({
  file,
  fileEx,
  freq,
  horizon,
  finetuneSteps,
  level,
  addDefaultCalVars,
  countries
}: PerformForecastParams): Promise<[dfd.DataFrame, dfd.DataFrame | null, dfd.DataFrame | null, dfd.DataFrame | null, dfd.DataFrame | null]> {
  let df = await dfd.readCSV(file);

  df['unique_id'] = df['unique_id'].astype('string');
  let requiredColumns = ["unique_id", "ds", "y"];
  // Check if all required columns are present in df
  if (!requiredColumns.every(column => df.columns.includes(column))) {
    throw new Error("Not all required columns are present in the data.");
  }
  df['ds'] = df['ds'].to_datetime();
  let calDf = null;
  if (addDefaultCalVars || countries != "") {
    calDf = df.groupby(['unique_id']).apply((group) => datesToDataframe({
      data: group,
      freq: freq,
      horizon: horizon,
      defaultCalVars: addDefaultCalVars,
      countries: countries
    })).reset_index().drop({ columns: ['level_1'] });
  }
  const [XDf, XDfFuture] = await preprocessExogenous({ file: fileEx, calDf: calDf, horizon: horizon });
  const [forecastResults, weights] = await predictFromApi({
    df: df,
    horizon: horizon,
    XDf: XDf,
    XDfFuture: XDfFuture,
    finetuneSteps: finetuneSteps,
    level: level,
    cleanExFirst: true,
    freq: freq
  });
  let weightsDf = null;
  if (XDf != null) {
    weightsDf = new dfd.DataFrame({
      features: XDf.drop({ columns: ['unique_id', 'ds'] }).columns,
      weights: weights
    });
  }
  return [df, XDf, XDfFuture, forecastResults, weightsDf];
}
