import { MOCK_TIMEGPT_MULTISERIES_REQUEST } from '@/utils/mock';
import type { NextApiRequest, NextApiResponse } from 'next';

type TimeSeriesData = {
  columns: string[];
  data: [string, string, number][];
};

type TimeGPTRequestBody = {
  fh: number;
  y: TimeSeriesData;
  freq: string;
  clean_ex_first: boolean;
  finetune_steps: number;
};

type TimeGPTResponse = {
  data: {
    forecast: TimeSeriesData;
  };
  message: string;
  details: string;
  code: string;
  requestID: string;
  support: string;
};

const TIMEGPT_MOCK_DATA_ACTIVE = process.env.TIMEGPT_MOCK_DATA === 'true';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const body: TimeGPTRequestBody = req.body;

  if (
    typeof body.fh !== 'number'
    || !Array.isArray(body.y.columns)
    || !Array.isArray(body.y.data)
    || typeof body.freq !== 'string'
    || typeof body.clean_ex_first !== 'boolean'
    || typeof body.finetune_steps !== 'number'
  ) {
    if (!TIMEGPT_MOCK_DATA_ACTIVE) {
      return res.status(400).json({ error: 'Invalid body format' });
    }
  }

  try {
    const TIMEGPT_API_KEY = TIMEGPT_MOCK_DATA_ACTIVE
      ? process.env.TIMEGPT_API_KEY
      : req.headers.authorization

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${TIMEGPT_API_KEY}` as string,
      },
      body: TIMEGPT_MOCK_DATA_ACTIVE
        ? JSON.stringify(MOCK_TIMEGPT_MULTISERIES_REQUEST)
        : JSON.stringify(body)
    }

    const response = await fetch(`${process.env.TIMEGPT_API_URL}/timegpt_multi_series`, options);
    const data: TimeGPTResponse = await response.json();

    if (!response.ok) {
      console.error(`Error with requestID: ${data.requestID}`);
      throw new Error(data.details);
    }

    // Filter the response to send only relevant data to the client.
    const clientResponse = {
      data: data.data.forecast,
      message: data.message,
      details: data.details
    };

    res.status(200).json(clientResponse);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};
