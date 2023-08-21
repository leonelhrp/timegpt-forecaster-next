// Base Types
type TimeGPTUID = string;
type TimeGPTDateString = string;

export type TimeGPTYData = [TimeGPTDateString, TimeGPTDateString, number]

export interface TimeGPTData {
  columns: string[];
  data: TimeGPTYData[];
}

export interface TimeGPTRequestBody {
  fh: number;
  y: TimeGPTData;
  freq: string;
  clean_ex_first: boolean;
  finetune_steps: number;
  level: number[]
}

export interface TimeGPTResponse {
  data: {
    forecast: TimeGPTData;
  };
  message: string;
  details: string;
  code: string;
  requestID: TimeGPTUID;
  support: string;
}

export interface TimeGPTItem {
  unique_id: TimeGPTUID;
  ds: TimeGPTDateString;
  [key: string]: number | string
}

export interface TimeGPTPlotProps {
  selectedUid: TimeGPTUID | null;
  data: TimeGPTItem[] | null;
  forecastResults: TimeGPTItem[] | null;
  horizon: number;
  level: number;
}

export interface TimeGPTGraphData {
  bodyData: TimeGPTItem[]
  resultData: TimeGPTItem[]
}