export type ExogenousQuestionType = {
  id: number,
  name: String,
  description: String,
  value: Boolean,
}

export interface ForecastObjectType {
  columns: string[];
  data:    Array<Array<Date | number | string>>;
}

export interface ForecastResult {
  forecast:  ForecastObjectType;
  weights_x: number[];
}

export interface FormState {
  loading: boolean;
  isSubmitting: boolean;
  status: string;
  isSuccess: boolean;
  completed: boolean;
  haveExogenousData: boolean | null;
  frecuency: string;
  horizon: number;
  finetuneSteps: number;
  predictionIntervals: number;
  defaultCalendarVar: boolean;
  countryHolidays: string[];
}
