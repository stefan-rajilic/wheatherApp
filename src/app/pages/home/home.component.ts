import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { CurrentWeather, Weather } from '../../weather.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  citiesWeather: Weather[] = [];
  citiesWeatherNow: CurrentWeather[] = [];

  cities = [
    { name: 'Praha', lat: 50.0755, lon: 14.4378 },
    { name: 'Brno', lat: 49.1951, lon: 16.6068 },
    { name: 'Ostrava', lat: 49.8209, lon: 18.2625 },
    { name: 'Plzeň', lat: 49.7384, lon: 13.3736 },
    { name: 'Hradec Králové', lat: 50.2092, lon: 15.8328 },
  ];

  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit(): void {
    this.loadCitiesWeather();
    this.loadCitiesWeatherNow();
  }

  loadCitiesWeather() {
    this.cities.forEach((city) => {
      this.weatherService.getWeather(city.lat, city.lon).subscribe((data) => {
        data.cityName = city.name;
        this.citiesWeather.push(data);
      });
    });
  }

  loadCitiesWeatherNow() {
    this.cities.forEach((city) => {
      this.weatherService.getWeatherNow(city.lat, city.lon).subscribe((data) => {

        const weatherData = {
          cityName: city.name,
          apparent_temperature: data.current.apparent_temperature,
          cloud_cover: data.current.cloud_cover,
          interval:data.current.interval,
          rain: data.current.rain,
          relative_humidity_2m: data.current.relative_humidity_2m,
          temperature_2m:data.current.temperature_2m,
          time: data.current.time,
          weather_code: data.current.weather_code,
          wind_speed_10m:data.current.wind_speed_10m,
          background_image: this.getWeatherBackground(data)
        
        };
        this.citiesWeatherNow.push(weatherData);
      });
    });
  }

  getWeatherBackground(weather: any): string {
    //return("da")
    if (weather.current.wind_speed_10m > 30) {
      return 'https://images.unsplash.com/photo-1621483092616-780665772d83?q=80&w=4455&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    } else if (weather.current.rain > 40) {
      return 'https://images.unsplash.com/photo-1518803194621-27188ba362c9?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFpbnxlbnwwfDB8MHx8fDI%3D';
    } else if (weather.current.cloud_cover > 60) {
      return 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    } else if (weather.current.cloud_cover > 30) {
      return 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    } else {
      return 'https://images.unsplash.com/photo-1572966101025-e199cab72196?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3Vubnl8ZW58MHwwfDB8fHwy';
    }
  }

  goToDetail(cityName: string): void {
    this.router.navigate(['/weatherDetail', cityName]);
  }
}
