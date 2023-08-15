import {
  Card,
  Title,
  Text,
  LineChart,
  TabList,
  Tab,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";

import { useState } from "react";
import { startOfYear, subDays } from "date-fns";

export interface Result {
  Date: string;
  Prediction: number;
}

function generateForecastData(): Result[] {
  const data: Result[] = [];
  const startDate = new Date(2022, 0, 1);
  const endDate = new Date(2022, 11, 31);

  let currentValue = 0.5;  // Un valor de inicio. Puede ser cualquier número en el rango deseado.

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    // Generamos una fluctuación aleatoria en la predicción
    const randomChange = (Math.random() - 0.5) * 0.05;
    currentValue = currentValue + randomChange;

    // Nos aseguramos de que el valor generado esté dentro de un rango deseado
    if (currentValue < 0) currentValue = 0;
    if (currentValue > 1) currentValue = 1;

    const formattedDate = `${("0" + d.getDate()).slice(-2)}.${("0" + (d.getMonth() + 1)).slice(-2)}.${d.getFullYear()}`;
    data.push({
      Date: formattedDate,
      Price: Number(currentValue.toFixed(2))
    });
  }
  return data;
}

const result: Result[] = generateForecastData();

const dataFormatter = (number: number) => `${Intl.NumberFormat("us").format(number).toString()}s`;

export default function LineChartResultTabs() {
  const [selectedIndex, setSelectedIndex] = useState(4);

  const getDate = (dateString: string) => {
    const [day, month, year] = dateString.split(".").map(Number);
    return new Date(year, month - 1, day);
  };

  const filterData = (startDate: Date, endDate: Date) =>
    result.filter((item) => {
      const currentDate = getDate(item.Date);
      return currentDate >= startDate && currentDate <= endDate;
    });

  const getFilteredData = (index: number) => {
    const lastAvailableDate = getDate(result[result.length - 1].Date);
    switch (index) {
      case 0:  // 1M
        const oneMonthStartDate = subDays(lastAvailableDate, 30);
        return filterData(oneMonthStartDate, lastAvailableDate);
      case 1:  // 2M
        const twoMonthsStartDate = subDays(lastAvailableDate, 60);
        return filterData(twoMonthsStartDate, lastAvailableDate);
      case 2:  // 6M
        const sixMonthsStartDate = subDays(lastAvailableDate, 180);
        return filterData(sixMonthsStartDate, lastAvailableDate);
      case 3:  // YTD
        const ytdStartDate = startOfYear(lastAvailableDate);
        return filterData(ytdStartDate, lastAvailableDate);
      default:  // Max
        return result;
    }
  };

  return (
    <Card>
      <Title>Time Series Forecast Tabs</Title>
      <Text>Daily predictions based on historical data</Text>
      <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex} className="mt-10">
        <TabList variant="line">
          <Tab>1M</Tab>
          <Tab>2M</Tab>
          <Tab>6M</Tab>
          <Tab>YTD</Tab>
          <Tab>Max</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LineChart
              className="h-80 mt-8"
              data={getFilteredData(selectedIndex)}
              index="Date"
              categories={["Price"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              showLegend={false}
              yAxisWidth={48}
            />
          </TabPanel>
          <TabPanel>
            <LineChart
              className="h-80 mt-8"
              data={getFilteredData(selectedIndex)}
              index="Date"
              categories={["Price"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              showLegend={false}
              yAxisWidth={48}
            />
          </TabPanel>
          <TabPanel>
            <LineChart
              className="h-80 mt-8"
              data={getFilteredData(selectedIndex)}
              index="Date"
              categories={["Price"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              showLegend={false}
              yAxisWidth={48}
            />
          </TabPanel>
          <TabPanel>
            <LineChart
              className="h-80 mt-8"
              data={getFilteredData(selectedIndex)}
              index="Date"
              categories={["Price"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              showLegend={false}
              yAxisWidth={48}
            />
          </TabPanel>
          <TabPanel>
            <LineChart
              className="h-80 mt-8"
              data={getFilteredData(selectedIndex)}
              index="Date"
              categories={["Price"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              showLegend={false}
              yAxisWidth={48}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
}
