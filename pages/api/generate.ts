import { NextApiRequest, NextApiResponse } from 'next';
import * as dfd from 'danfojs-node';

interface PredictFromApiBody {
  df: any;
  horizon: number;
  X_df: any;
  X_df_future: any;
  finetune_steps: number;
  level: number;
  clean_ex_first: boolean;
  freq: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    df,
    horizon,
    X_df,
    X_df_future,
    finetune_steps,
    level,
    clean_ex_first,
    freq,
  }: PredictFromApiBody = req.body;

  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: req.headers.authorization!,
  };

  const inputSizeRes = await fetch(process.env.INPUT_SIZE_ENDPOINT!, {
    method: 'POST',
    headers,
    body: JSON.stringify({ freq }),
  });

  const inputSizeData = await inputSizeRes.json();
  console.log('inputSizeData: ', inputSizeData);

  const payload = {
    y: [], // TODO: work in progress
    x: [], // TODO: work in progress
    fh: horizon,
    level,
    finetune_steps,
    clean_ex_first,
    freq,
  };

  const forecastRes = await fetch(process.env.FORECAST_ENDPOINT!, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  const forecastData = await forecastRes.json();
  console.log('forecastData: ', forecastData);

  res.status(200).json(forecastData);
}
