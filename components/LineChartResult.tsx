import * as Icon from "@phosphor-icons/react";
import {
  Card,
  Text,
  Divider,
  LineChart,
  Title,
  Flex,
  Bold,
  Color,
} from "@tremor/react";

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
      Prediction: Number(currentValue.toFixed(2))
    });
  }
  return data;
}

const result: Result[] = generateForecastData();

export default function LineChartResult() {
  return (
    <Card>
      <div className="text-center">
        <Title className="mt-2">Time Series Forecast</Title>
        <Text className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, nemo. Officia, maxime quis sapiente ipsa quidem fuga id possimus quaerat molestias vitae commodi dolores, reiciendis laboriosam placeat similique cum blanditiis?</Text>
      </div>
      <Divider />
      <LineChart
        className="mt-4 h-80"
        data={result}
        index="Date"
        categories={["Prediction"]}
        colors={["gray"]}
        valueFormatter={(number: number) => `${Intl.NumberFormat("us").format(number).toString()}s`}
        showLegend={false}
        yAxisWidth={48}
      />
    </Card>
  );
}
