import React, { useState, useEffect, useId, useRef } from 'react';
import Plot from 'react-plotly.js';
import { TimeGPTPlotProps } from '@/types/forecast';

const TimeSeriesPlot = ({ selectedUid, data, forecastResults, horizon, level }: TimeGPTPlotProps) => {
  const [fig, setFig] = useState<any>({});
  const plotId = useId()
  const plotRef = useRef(null);

  useEffect(() => {
    if (!data || !forecastResults) return;

    const inputSize = 7 * horizon;
    const df = data.filter(d => d.unique_id === selectedUid).slice(-inputSize);
    const forecast_df = forecastResults.filter(d => d.unique_id === selectedUid);

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
        title: 'Time Series ' + selectedUid,
        xaxis: { title: 'Date' },
        yaxis: { title: 'Value' }
      }
    });
  }, [data, forecastResults, horizon, level, selectedUid]);

  return (
    <div>
      <Plot
        ref={plotRef}
        key={selectedUid}
        divId={selectedUid || ''}
        data={fig.data}
        layout={fig.layout}
        config={{ displayModeBar: false }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default TimeSeriesPlot;
