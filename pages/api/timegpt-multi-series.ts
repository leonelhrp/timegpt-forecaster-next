import { TimeGPTRequestBody, TimeGPTResponse } from '@/types/forecast';
import { TimeGPTStoreFormState } from '@/types/store';
import { convertTimeGPTToGraphData } from '@/utils/functions';
import { MOCK_TIMEGPT_MULTISERIES_REQUEST } from '@/utils/mock';
import type { NextApiRequest, NextApiResponse } from 'next';

const TIMEGPT_MOCK_DATA_ACTIVE = process.env.TIMEGPT_MOCK_DATA === 'true';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '200mb'
    }
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const formData: TimeGPTStoreFormState = req.body;

  if (
    typeof formData.horizon !== 'number'
    || formData.timeSeriesData.columns.length === 0
    || formData.timeSeriesData.data.length === 0
    || typeof formData.frecuency !== 'string'
    || typeof formData.defaultCalendarVar !== 'boolean'
    || typeof formData.finetuneSteps !== 'number'
    || typeof formData.predictionIntervals !== 'number'
  ) {
    if (!TIMEGPT_MOCK_DATA_ACTIVE) {
      return res.status(400).json({ error: 'Invalid body format' });
    }
  }

  console.log('formData: ', formData);

  const body: TimeGPTRequestBody = {
    "fh": formData.horizon,
    "y": formData.timeSeriesData,
    "x": formData.haveExogenousData ? formData.exogenousData : null,
    "freq": formData.frecuency,
    "clean_ex_first": formData.defaultCalendarVar,
    "finetune_steps": formData.finetuneSteps,
    "level": [formData.predictionIntervals]
  }

  try {
    const TIMEGPT_API_KEY = TIMEGPT_MOCK_DATA_ACTIVE
      ? process.env.TIMEGPT_API_KEY
      : req.headers.authorization

    const options = {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'authorization': `Bearer ${TIMEGPT_API_KEY}` as string,
      },
      body: TIMEGPT_MOCK_DATA_ACTIVE
        ? JSON.stringify(MOCK_TIMEGPT_MULTISERIES_REQUEST)
        : JSON.stringify(body)
    }

    const response = await fetch(`${process.env.TIMEGPT_API_URL}/timegpt_multi_series`, options);
    const data: TimeGPTResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error from server');
    }

    const bodyData = convertTimeGPTToGraphData(body.y);
    const resultData = convertTimeGPTToGraphData(data.data.forecast);

    const timeGPTGraphData = {
      bodyData,
      resultData,
    }

    res.status(200).json(timeGPTGraphData);
  } catch (error) {
    console.error('error: ', error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
};
