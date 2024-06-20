export interface Weather {
  humidity: any;
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

export interface CurrentWeather {
  cityName: string;
  apparent_temperature: number;
  cloud_cover: number;
  interval:number;
  rain: number;
  relative_humidity_2m: number;
  temperature_2m:number;
  time: number;
  weather_code: number;
  wind_speed_10m:number;
  background_image: string;
}
