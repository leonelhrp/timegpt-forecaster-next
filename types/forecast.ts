export type ForecastYDataType = Array<Array<Date | number | string>>;

export interface ForecastObjectType {
  columns: string[];
  data: ForecastYDataType;
}

export interface ForecastResult {
  forecast:  ForecastObjectType;
  weights_x: number[];
}

export interface FormState {
  apiKey: string;
  loading: boolean;
  isSubmitting: boolean;
  status: string;
  isSuccess: boolean;
  completed: boolean;
  frecuency: string;
  horizon: number;
  finetuneSteps: number;
  predictionIntervals: number;
  defaultCalendarVar: boolean;
  countryHolidays: string[];
  timeSeriesData: ForecastObjectType | null
}
