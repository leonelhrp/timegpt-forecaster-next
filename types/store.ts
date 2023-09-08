import { TimeGPTDataFrame, TimeGPTGraphData } from "./forecast"

export interface TimeGPTStoreFormState {
  apiKey: string;
  frecuency: string;
  horizon: number;
  finetuneSteps: number;
  predictionIntervals: number;
  loading: boolean;
  isSubmitting: boolean;
  status: string;
  isSuccess: boolean;
  completed: boolean;
  defaultCalendarVar: boolean;
  countryHolidays: string[];
  timeSeriesData: TimeGPTDataFrame;
  haveExogenousData: boolean;
  exogenousData: TimeGPTDataFrame | null
}

export interface TimeGPTStoreInitialState {
  form: TimeGPTStoreFormState
  result: TimeGPTGraphData
}

export interface TimeGPTStoreActions {
  sendTimeGPTMultiSeriesForm: () => Promise<void>
  setPropertyForm: (
    { key, value }: { key: keyof TimeGPTStoreFormState, value: any }
  ) => void
}