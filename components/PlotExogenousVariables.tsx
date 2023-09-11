import { getColorSequence } from "@/utils/functions";
import { useRef, useState, useEffect } from "react";
import Plot from 'react-plotly.js';

interface Props {
  df: any[];
  xDf: any[];
  inputSize: number;
  selectedUid: string;
}

const PlotExogenousVariables = ({ df, xDf, inputSize, selectedUid }: Props) => {
  const [fig, setFig] = useState<any>({});
  const plotRef = useRef(null);

  useEffect(() => {
    if (!df || !xDf || !selectedUid) return;

    const xDf_uid = xDf.filter(data => data.unique_id === selectedUid).slice(-inputSize);
    const x_cols = Object.keys(xDf[0]).filter(col => col !== "unique_id" && col !== "ds")

    const colorSteps = x_cols.length + 1;
    const colorSequence = getColorSequence(colorSteps);

    const subplotTitles = [`Time Series ${selectedUid}`, ...x_cols];
    const traces: any[] = [];
    const annotations: any[] = [];

    const mapMaxYPositionPerColumn = new Map();

    subplotTitles.forEach((col_name, j) => {
      let xValues: any[] = [];
      let yValues: any[] = [];
      let xAxis: string = "x";
      let yAxis: string = "y";
      let color: string = "blue";

      if (j === 0) {
        xValues = df.map(item => item.ds);
        yValues = df.map(item => item.y);
      } else {
        xValues = xDf_uid.map(item => item.ds);
        yValues = xDf_uid.map(item => item[col_name]);
        xAxis = `x${j + 1}`;
        yAxis = `y${j + 1}`;
        color = colorSequence[j - 1];
      }

      traces.push({
        x: xValues,
        y: yValues,
        xaxis: xAxis,
        yaxis: yAxis,
        type: 'scatter',
        mode: "lines",
        line: { color },
        showlegend: false,
      });

      const maxForThisColumn = Math.max(...yValues);
      const yPosition = maxForThisColumn !== 0 ? maxForThisColumn : 1;

      if (mapMaxYPositionPerColumn.has(col_name)) {
        const currentMax = mapMaxYPositionPerColumn.get(col_name);
        if (currentMax < yPosition) {
          mapMaxYPositionPerColumn.set(col_name, yPosition);
        }
      } else {
        mapMaxYPositionPerColumn.set(col_name, yPosition);
      }

      annotations.push({
        xref: xAxis,
        yref: yAxis,
        x: xValues[0],
        y: mapMaxYPositionPerColumn.get(col_name),
        xanchor: 'top',
        yanchor: 'bottom',
        text: col_name,
        showarrow: false,
      });
    });

    const rows = x_cols.length + 1;

    setFig({
      data: traces,
      layout: {
        title: 'Plot of Exogenous Variables',
        grid: {
          rows,
          columns: 1,
          pattern: 'independent',
        },
        height: 200 * rows,
        annotations,
        autosize: true,
      },
      config: {
        displayModeBar: false,
        scrollZoom: true,
        showLink: false,
      },
      style: {
        width: '100%',
        height: '100%'
      }
    });

  }, [df, xDf, inputSize, selectedUid]);

  return (
    <Plot
      ref={plotRef}
      data={fig.data}
      layout={fig.layout}
      config={fig.config}
      style={fig.style}
      useResizeHandler={true}
    />
  );
};

export default PlotExogenousVariables;
