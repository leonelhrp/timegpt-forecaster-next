import { ForecastResult } from "@/types/forecast";

const generateRandomData = (): any[][] => {
  const countries = ["BE", "DE", "FR", "NP", "PJM"];
  const dates = ["2016-12-31", "2017-12-31", "2018-12-24"];

  const generateHoursForDate = (date: string): string[] => {
    const hours: string[] = [];
    for (let i = 0; i < 24; i++) {
      hours.push(`${date} ${i.toString().padStart(2, '0')}:00:00`);
    }
    return hours;
  };

  const fullDates = dates.flatMap(date => generateHoursForDate(date));

  const getRandomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };

  const data: any[][] = [];

  countries.forEach((country) => {
    fullDates.forEach((fullDate) => {
      const baseValue = getRandomNumber(20, 50);
      const lowerLimit = baseValue - getRandomNumber(0, 5);
      const upperLimit = baseValue + getRandomNumber(0, 5);
      data.push([country, fullDate, baseValue, lowerLimit, upperLimit]);
    });
  });

  return data;
};

const generateRandomWeights = (): number[] => {
  const getRandomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };

  const getRandomLargeNumber = (): number => {
    return (Math.random() > 0.5 ? 1 : -1) * getRandomNumber(173580048342800, 173580048342900);
  };

  const getRandomSmallNumber = (): number => {
    return getRandomNumber(-15, 15);
  };

  const weights: number[] = [];

  for (let i = 0; i < 20; i++) {
    if (i < 2) {
      weights.push(getRandomLargeNumber());
    } else if (i >= 2 && i < 7) {
      weights.push(getRandomSmallNumber());
    } else {
      weights.push(0);
    }
  }

  return weights;
};


export const MOCK_FORECAST_REPONSE: ForecastResult = {
  "forecast": {
    "columns": [
      "unique_id",
      "ds",
      "TimeGPT",
      "TimeGPT-lo-90",
      "TimeGPT-hi-90"
    ],
    "data": generateRandomData(),
  },
  "weights_x": generateRandomWeights()
}
