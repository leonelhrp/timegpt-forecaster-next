import { TimeGPTDataFrame, TimeGPTGraphData, TimeGPTItem, TimeGPTPlotItem } from "@/types/forecast";
import { addCountryHolidays, addDefaultColumns, createDataFrame, getDateRange } from "@/utils/dates";

export const csvFileToColumnsAndDataRequestBody = (
  { file, type }: { file: File, type: 'y' | 'x' }
): Promise<TimeGPTDataFrame> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const csv = (event.target?.result ?? "") as string;
        let lines = csv.split('\n');

        if (!lines[lines.length - 1]) {
          lines.pop();
        }

        const headersLine = lines.shift();
        const headers = headersLine ? headersLine.split(',') : [];

        if (type === 'y' && (headers.length !== 3 || !headers.includes("unique_id") || !headers.includes("ds") || !headers.includes("y"))) {
          reject("CSV must have exactly three columns for 'y': unique_id, ds, y.");
          return;
        }

        if (type === 'x' && (!headers.includes("unique_id") || !headers.includes("ds"))) {
          reject("CSV for 'x' must at least include columns: unique_id and ds.");
          return;
        }

        const parsedLines = lines.map(line => {
          const values = line.split(',');

          if (type === 'y' && values.length !== 3) {
            reject(`Invalid line for 'y': ${line}. Each line must have exactly three columns.`);
            return;
          }

          if (type === 'y') {
            const uniqueId: string = values[0]?.trim();
            const ds: string = values[1]?.trim();
            const y: number = Number(values[2]?.trim());

            if (isNaN(y)) {
              reject(`Invalid format for 'y' value: ${values[2]}. It must be numeric.`);
              return;
            }
            return [uniqueId, ds, y];
          }

          if (type === 'x') {
            const uniqueId: string = values[0]?.trim();
            const ds: string = values[1]?.trim();
            const exogenous = values.slice(2).map(v => Number(v.trim()));

            if (exogenous.some(val => isNaN(val))) {
              reject(`Invalid format for exogenous values. All values after 'ds' must be numeric.`);
              return;
            }
            return [uniqueId, ds, ...exogenous];
          }

        });

        resolve({
          columns: headers,
          data: parsedLines.filter(Boolean) as TimeGPTItem[]
        });

      } catch (error) {
        reject("Error processing CSV file: " + error);
      }
    };

    reader.onerror = (error) => {
      reject("Error reading the file: " + error);
    };

    reader.readAsText(file);
  });
};


export const convertTimeGPTToGraphData = (timeGPTData: TimeGPTDataFrame): TimeGPTPlotItem[] => {
  const { columns, data } = timeGPTData;

  const graphData = data.map((row: TimeGPTItem) => {
    const item: TimeGPTPlotItem = {};
    columns.forEach((col, index) => {
      item[col] = row[index];
    });
    return item;
  });

  return graphData;
}

export const getColorSequence = (colorSteps: number): string[] => {
  const colorSequence = Array.from({ length: colorSteps }, (_, i) => {
    const r = Math.floor(255 * (i / colorSteps));
    const b = 255 - r;
    return `rgb(${r}, 0, ${b})`;
  });

  return colorSequence;
}

export const downloadCSV = (result: TimeGPTGraphData): void => {
  if (!result.resultData || result.resultData.length === 0) {
    alert("No data available to download.");
    return;
  }

  const jsonObject = result.resultData;
  const replacer = (key: string, value: any) => value === null ? '' : value;
  const header = Object.keys(jsonObject[0]);

  let csvRows: string[] = jsonObject.map(row =>
    header.map(fieldName => JSON.stringify((row as any)[fieldName], replacer)).join(',')
  );

  csvRows.unshift(header.join(','));
  const csv: string = csvRows.join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'forecast-timegpt.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const datesToDataFrame = (
  data: TimeGPTPlotItem[],
  freq: string,
  horizon: number,
  isDefaultColumns: boolean,
  countries: string
): TimeGPTPlotItem[] => {
  const dateRange = getDateRange(data, horizon);
  const df = createDataFrame(dateRange);
  addCountryHolidays(df, dateRange, countries);
  if (isDefaultColumns) {
    addDefaultColumns(df, freq);
  }
  return df;
};