import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

interface DataItem {
  unique_id: string;
  ds: string;
  y: number;
}

interface ForecastResultItem {
  unique_id: string;
  ds: string;
  TimeGPT: number;
  [key: string]: number | string;
}

interface TimeSeriesPlotProps {
  data: DataItem[];
  forecastResults: ForecastResultItem[];
  horizon: number;
  level: number;
}

const TimeSeriesPlot = ({ data, forecastResults, horizon, level }: TimeSeriesPlotProps) => {
  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const [fig, setFig] = useState<any>({});
  const uids = Array.from(new Set(data.map(d => d.unique_id)));

  useEffect(() => {
    const currentUid = selectedUid || uids[0];

    const inputSize = 7 * horizon;
    const df = data.filter(d => d.unique_id === currentUid).slice(-inputSize);
    const forecast_df = forecastResults.filter(d => d.unique_id === currentUid);

    const traces = [
      {
        x: df.map(d => d.ds),
        y: df.map(d => d.y),
        mode: 'lines',
        line: { color: 'blue' },
        name: 'Actual Value'
      },
      {
        x: forecast_df.map(d => d.ds),
        y: forecast_df.map(d => d.TimeGPT),
        mode: 'lines',
        line: { color: 'red' },
        name: 'TimeGPT Forecast'
      },
      {
        x: [...forecast_df.map(d => d.ds), ...forecast_df.map(d => d.ds).reverse()],
        y: [...forecast_df.map(d => d[`TimeGPT-hi-${level}`]), ...forecast_df.map(d => d[`TimeGPT-lo-${level}`]).reverse()],
        fill: 'toself',
        fillcolor: 'rgba(0,176,246,0.2)',
        line: { color: 'rgba(255,255,255,0)' },
        name: 'Prediction Interval'
      }
    ];

    setFig({
      data: traces,
      layout: {
        title: 'Time Series ' + currentUid,
        xaxis: { title: 'Date' },
        yaxis: { title: 'Value' }
      }
    });
  }, [data, forecastResults, horizon, level, selectedUid]);

  return (
    <div>
      <select value={selectedUid || ''} onChange={e => setSelectedUid(e.target.value)}>
        {uids.map((uid, index) => <option key={index} value={uid}>{uid}</option>)}
      </select>
      <Plot data={fig.data} layout={fig.layout} />
    </div>
  );
};

export default TimeSeriesPlot;
