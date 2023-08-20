import { TimeGPTGraphData, TimeGPTResponse, TimeGPTYData } from "./forecast"

export interface TimeGPTStoreFormState {
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
  timeSeriesData: {
    columns: string[];
    data: TimeGPTYData[];
  };
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