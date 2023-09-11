export type TimeGPTItem = (string | number)[]

export interface TimeGPTDataFrame {
  columns: string[];
  data: TimeGPTItem[];
}

export interface TimeGPTRequestBody {
  fh: number;
  y: TimeGPTDataFrame;
  x: TimeGPTDataFrame | null;
  freq: string;
  clean_ex_first: boolean;
  finetune_steps: number;
  level: number[]
}

export interface TimeGPTResponse {
  data: {
    forecast: TimeGPTDataFrame;
  };
  message: string;
  details: string;
  code: string;
  requestID: string;
  support: string;
}

export interface TimeGPTPlotCountryHolidays {
  [key: string]: boolean;
}

export type TimeGPTPlotItem = {
  [key: string]: string | number | boolean | TimeGPTPlotCountryHolidays;
}

export interface TimeGPTPlotProps {
  selectedUid: string | null;
  data: TimeGPTPlotItem[] | null;
  forecastResults: TimeGPTPlotItem[] | null;
  horizon: number;
  level: number;
}

export interface TimeGPTGraphData {
  bodyData: TimeGPTPlotItem[]
  resultData: TimeGPTPlotItem[]
}

export interface TimeGPTImportanceExogenousVarsProps {
  weightsData: {
    features: string[];
    weights: number[];
  };
}