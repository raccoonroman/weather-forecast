export interface CityDto {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export interface CityOption extends CityDto {
  fromHistory: boolean;
}

export interface WeatherDto {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
  };
  forecast: {
    forecastday: [
      {
        date: string;
        date_epoch: number;
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          avgtemp_c: number;
          maxwind_kph: number;
          condition: {
            text: string;
            icon: string;
            code: number;
          };
        };
      },
    ];
  };
}
