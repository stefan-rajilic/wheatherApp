import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Weather } from './weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getWeather(latitude: number, longitude: number): Observable<Weather> {
    let params = new HttpParams()
      .set('latitude', latitude.toString())
      .set('longitude', longitude.toString())
      .set('hourly', 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m')
      .set('forecast_days', '1')
      .set('timezone', 'auto'); // Přidejte správné nastavení časového pásma

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map((response) => {
        console.log('API RESPONSE:', response);

        const hourly = response.hourly;

        const average = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

        return {
          cityName: '',
          time: new Date(response.hourly.time[0]), // První čas v hourly datách
          temperature2m: average(hourly.temperature_2m),
          relativeHumidity2m: average(hourly.relative_humidity_2m),
          apparentTemperature: average(hourly.apparent_temperature),
          isDay: average(hourly.is_day) > 0.5,
          precipitation: average(hourly.precipitation),
          rain: average(hourly.rain),
          showers: average(hourly.showers),
          snowfall: average(hourly.snowfall),
          weatherCode: average(hourly.weather_code), // Může potřebovat vlastní logiku
          cloudCover: average(hourly.cloud_cover),
          pressureMsl: average(hourly.pressure_msl),
          surfacePressure: average(hourly.surface_pressure),
          windSpeed10m: average(hourly.wind_speed_10m),
          windDirection10m: average(hourly.wind_direction_10m),
          windGusts10m: average(hourly.wind_gusts_10m),
        } as Weather;
      })
    );
  }
}
