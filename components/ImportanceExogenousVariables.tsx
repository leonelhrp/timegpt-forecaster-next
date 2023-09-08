import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import { TimeGPTImportanceExogenousVarsProps } from '@/types/forecast';
import FeatureWeightsTable from './FeatureWeightsTable';

const ImportanceExogenousVariables = ({ weightsData }: TimeGPTImportanceExogenousVarsProps) => {
  const [fig, setFig] = useState<any>({});
  const plotRef = useRef(null);

  useEffect(() => {
    if (!weightsData) return;

    const traces = [
      {
        x: weightsData.features,
        y: weightsData.weights,
        type: 'bar',
        marker: { color: 'skyblue' },
        name: 'Weights'
      }
    ];

    setFig({
      data: traces,
      layout: {
        title: 'Weights of Covariates',
        xaxis: { title: 'Covariates', tickmode: 'linear' },
        yaxis: { title: 'Weights', tickmode: 'linear' },
        bargap: 0.2,
        showlegend: false,
      }
    });
  }, [weightsData]);

  return (
    <div>
      <h1 className="text-xl text-center mb-4">Importance of Exogenous Variables</h1>
      <FeatureWeightsTable weightsData={weightsData} />
      <Plot
        ref={plotRef}
        data={fig.data}
        layout={fig.layout}
        config={{ displayModeBar: false }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default ImportanceExogenousVariables;
