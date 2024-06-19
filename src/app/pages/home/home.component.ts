import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { Weather } from '../../weather.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  citiesWeather: Weather[] = [];
  cities = [
    { name: 'Praha', lat: 50.0755, lon: 14.4378 },
    { name: 'Brno', lat: 49.1951, lon: 16.6068 },
    { name: 'Ostrava', lat: 49.8209, lon: 18.2625 },
    { name: 'Plzeň', lat: 49.7384, lon: 13.3736 },
    { name: 'Hradec Králové', lat: 50.2092, lon: 15.8328 },
  ];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loadCitiesWeather();
  }

  loadCitiesWeather() {
    this.cities.forEach((city) => {
      this.weatherService.getWeather(city.lat, city.lon).subscribe((data) => {
        data.cityName = city.name;
        this.citiesWeather.push(data);
      });
    });
  }
}
