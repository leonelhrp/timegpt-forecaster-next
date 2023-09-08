import { TimeGPTDataFrame, TimeGPTItem, TimeGPTPlotItem } from "@/types/forecast";

export const csvFileToColumsAndDataRequestBody = (file: File): Promise<any> => {
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

        if (headers.length !== 3 || !headers.includes("unique_id") || !headers.includes("ds") || !headers.includes("y")) {
          reject("CSV must have exactly three columns: unique_id, ds, y.");
          return;
        }

        const parsedLines = lines.map(line => {
          const values = line.split(',');

          if (values.length !== 3) {
            reject(`Invalid line: ${line}. Each line must have exactly three columns.`);
            return;
          }

          const uniqueId: string = values[0]?.trim();
          const ds: string = values[1]?.trim();
          const y: number = Number(values[2]?.trim());

          if (isNaN(y)) {
            reject(`Invalid format for 'y' value: ${values[2]}. It must be numeric.`);
            return;
          }

          return [uniqueId, ds, y];
        });

        resolve({
          columns: headers,
          data: parsedLines
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

export const formatDate = (inputDate: string): string => {
  const months: string[] = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  const date = new Date(inputDate);
  const monthName = months[date.getMonth()];
  const day = date.getDate();

  return `${monthName} ${day}`;
}

