export interface Weather {
    cityName: string;
    time: Date;
    temperature2m: number;
    relativeHumidity2m: number;
    apparentTemperature: number;
    isDay: boolean;
    precipitation: number;
    rain: number;
    showers: number;
    snowfall: number;
    weatherCode: number;
    cloudCover: number;
    pressureMsl: number;
    surfacePressure: number;
    windSpeed10m: number;
    windDirection10m: number;
    windGusts10m: number;
  }
  