import { TimeGPTData, TimeGPTItem, TimeGPTYData } from "@/types/forecast";

export const csvFileToYRequestBody = (file: File): Promise<any> => {
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
        const data: TimeGPTYData[] = []

        lines.map(line => {
          let values = line.split(',');

          if (values.length !== 3) {
            reject(`Invalid line: ${line}. Each line must have exactly three columns.`);
            return;
          }

          const obj: { [key: string]: any } = {};
          headers.forEach((header, index) => {
            obj[header.trim()] = values[index]?.trim();
          });

          if (!obj.y || isNaN(Number(obj.y))) {
            reject(`Invalid format for 'y' value: ${obj.y}. It must be numeric.`);
            return;
          }

          data.push([obj.unique_id, obj.ds, Number(obj.y)]);

          return obj;
        });

        resolve({
          columns: headers,
          data,
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

export const convertTimeGPTToGraphData = (timeGPTData: TimeGPTData): TimeGPTItem[] => {
  const { columns, data } = timeGPTData;

  return data.map((row) => {
    let item: TimeGPTItem = {} as TimeGPTItem;

    row.forEach((cell, index) => {
      item[columns[index]] = cell;
    });

    return item;
  });
}