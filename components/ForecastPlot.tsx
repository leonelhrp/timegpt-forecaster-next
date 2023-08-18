import Plot from 'react-plotly.js';
import moment from "moment";
import * as dfd from 'danfojs';
import { datesToDataframe } from "@/utils/forecast"

interface ForecastPlotProps {
  data: any;  // you can type this more strictly later
  forecastResults: any; // you can type this more strictly later
  selected_uid: string;
}

const ForecastPlot = ({ data, forecastResults, selected_uid }: ForecastPlotProps) => {
  const filteredData = data.filter((item: any) => item.unique_id === selected_uid);
  const forecastData = forecastResults.filter((item: any) => item.unique_id === selected_uid);

  // Prepare the data for Plotly
  const trace1 = {
    x: filteredData.map((item: any) => item.ds),
    y: filteredData.map((item: any) => item.y),
    type: 'scatter',
    mode: 'lines',
    marker: { color: 'blue' },
    name: 'Actual Value'
  };

  const trace2 = {
    x: forecastData.map((item: any) => item.ds),
    y: forecastData.map((item: any) => item.TimeGPT),
    type: 'scatter',
    mode: 'lines',
    marker: { color: 'red' },
    name: 'TimeGPT Forecast'
  };


  const dataTest = new dfd.DataFrame({
    ds: [
      new Date('2023-01-01T00:00:00.000Z'),
      new Date('2023-02-01T01:00:00.000Z'),
      new Date('2023-03-01T02:00:00.000Z'),
      new Date('2023-04-01T03:00:00.000Z'),
    ],
  });

  let result = datesToDataframe({
    data: dataTest,
    freq: 'H',
    horizon: 24,
    defaultCalVars: false,
    countries: ''
  });
  console.log('Caso de prueba 1: Sin países ni bandera por defecto:', result);

  result = datesToDataframe({
    data: dataTest,
    freq: 'H',
    horizon: 24,
    defaultCalVars: false,
    countries: 'US,CA'
  });
  console.log('Caso de prueba 2: Con países pero sin bandera por defecto: ', result);


  result = datesToDataframe({
    data: dataTest,
    freq: 'H',
    horizon: 24,
    defaultCalVars: true,
    countries: 'US,CA'
  });
  console.log('Caso de prueba 3: Con países y bandera por defecto: ', result);

  result = datesToDataframe({
    data: dataTest,
    freq: 'H',
    horizon: 24,
    defaultCalVars: true,
    countries: ''
  });
  console.log('Caso de prueba 4: Sin países pero con bandera por defecto: ', result);

  return (
    <Plot
      data={[
        {
          x: [1, 2, 3],
          y: [2, 6, 3],
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
        { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
      ]}
      layout={{ width: 620, height: 340, title: 'A Fancy Plot' }}
    />
  );
}

export default ForecastPlot;
