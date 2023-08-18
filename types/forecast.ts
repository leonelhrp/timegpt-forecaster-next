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