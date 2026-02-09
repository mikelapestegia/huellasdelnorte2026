// Weather API service using OpenWeatherMap
// For production, the API key should be stored in environment variables

export interface WeatherData {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
    main: string;
}

export interface ForecastDay {
    date: string;
    dayName: string;
    tempMax: number;
    tempMin: number;
    description: string;
    icon: string;
    main: string;
    precipitationProb: number;
}

export interface WeatherForecast {
    current: WeatherData;
    forecast: ForecastDay[];
    location: string;
}

// OpenWeatherMap icon to emoji mapping
export const weatherIconToEmoji: Record<string, string> = {
    "01d": "☀️",  // clear sky day
    "01n": "🌙",  // clear sky night
    "02d": "⛅",  // few clouds day
    "02n": "☁️",  // few clouds night
    "03d": "☁️",  // scattered clouds
    "03n": "☁️",
    "04d": "☁️",  // broken clouds
    "04n": "☁️",
    "09d": "🌧️", // shower rain
    "09n": "🌧️",
    "10d": "🌦️", // rain day
    "10n": "🌧️", // rain night
    "11d": "⛈️", // thunderstorm
    "11n": "⛈️",
    "13d": "❄️", // snow
    "13n": "❄️",
    "50d": "🌫️", // mist
    "50n": "🌫️",
};

// Dog walking conditions assessment
export function getDogWalkingConditions(weather: WeatherData): {
    rating: "excellent" | "good" | "caution" | "avoid";
    message: string;
    tips: string[];
} {
    const temp = weather.temperature;
    const main = weather.main.toLowerCase();

    // Extreme conditions - avoid
    if (temp > 35 || temp < -5 || main.includes("thunderstorm")) {
        return {
            rating: "avoid",
            message: "Condiciones extremas",
            tips: [
                temp > 35 ? "Temperatura muy alta, riesgo de golpe de calor" : "",
                temp < -5 ? "Temperatura muy baja, riesgo de hipotermia" : "",
                main.includes("thunderstorm") ? "Peligro de tormentas eléctricas" : "",
            ].filter(Boolean),
        };
    }

    // Caution conditions
    if (temp > 28 || temp < 0 || main.includes("rain") || main.includes("snow")) {
        return {
            rating: "caution",
            message: "Precaución recomendada",
            tips: [
                temp > 28 ? "Evita las horas centrales del día" : "",
                temp > 28 ? "Lleva agua extra para tu perro" : "",
                temp < 0 ? "Protege las almohadillas de tu perro del frío" : "",
                main.includes("rain") ? "Lleva un chubasquero para ti y tu perro" : "",
                main.includes("snow") ? "Cuidado con el hielo y la nieve acumulada" : "",
            ].filter(Boolean),
        };
    }

    // Good conditions
    if (temp >= 10 && temp <= 22) {
        return {
            rating: "excellent",
            message: "Condiciones ideales",
            tips: [
                "Temperatura perfecta para pasear",
                "Tu perro estará cómodo durante toda la ruta",
            ],
        };
    }

    // Default good
    return {
        rating: "good",
        message: "Buenas condiciones",
        tips: [
            temp > 22 ? "Busca zonas de sombra durante el paseo" : "",
            temp < 10 ? "Considera un abrigo si tu perro es de pelo corto" : "",
            "Lleva agua suficiente para ambos",
        ].filter(Boolean),
    };
}

// Fetch weather data from OpenWeatherMap
export async function fetchWeather(
    lat: number,
    lon: number,
    apiKey?: string
): Promise<WeatherForecast | null> {
    // If no API key, return mock data
    if (!apiKey) {
        return getMockWeatherData();
    }

    try {
        // Current weather
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`
        );

        if (!currentResponse.ok) {
            console.error("Weather API error:", currentResponse.status);
            return getMockWeatherData();
        }

        const currentData = await currentResponse.json();

        // 5-day forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`
        );

        if (!forecastResponse.ok) {
            console.error("Forecast API error:", forecastResponse.status);
            return getMockWeatherData();
        }

        const forecastData = await forecastResponse.json();

        // Process forecast data - get one entry per day
        const dailyForecasts = processForecastData(forecastData.list);

        return {
            current: {
                temperature: Math.round(currentData.main.temp),
                feelsLike: Math.round(currentData.main.feels_like),
                humidity: currentData.main.humidity,
                windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
                description: currentData.weather[0].description,
                icon: currentData.weather[0].icon,
                main: currentData.weather[0].main,
            },
            forecast: dailyForecasts,
            location: currentData.name,
        };
    } catch (error) {
        console.error("Error fetching weather:", error);
        return getMockWeatherData();
    }
}

// Process forecast data to get daily summaries
function processForecastData(list: any[]): ForecastDay[] {
    const dailyMap = new Map<string, any[]>();

    list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!dailyMap.has(date)) {
            dailyMap.set(date, []);
        }
        dailyMap.get(date)!.push(item);
    });

    const days: ForecastDay[] = [];
    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    dailyMap.forEach((items, dateStr) => {
        if (days.length >= 5) return; // Limit to 5 days

        const date = new Date(dateStr);
        const temps = items.map((i) => i.main.temp);
        const midday = items.find((i) => i.dt_txt.includes("12:00")) || items[0];
        const precipProbs = items.map((i) => i.pop || 0);

        days.push({
            date: dateStr,
            dayName: dayNames[date.getDay()],
            tempMax: Math.round(Math.max(...temps)),
            tempMin: Math.round(Math.min(...temps)),
            description: midday.weather[0].description,
            icon: midday.weather[0].icon,
            main: midday.weather[0].main,
            precipitationProb: Math.round(Math.max(...precipProbs) * 100),
        });
    });

    return days;
}

// Mock weather data for development/demo
function getMockWeatherData(): WeatherForecast {
    const today = new Date();
    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    return {
        current: {
            temperature: 18,
            feelsLike: 17,
            humidity: 65,
            windSpeed: 12,
            description: "parcialmente nublado",
            icon: "02d",
            main: "Clouds",
        },
        forecast: Array.from({ length: 5 }, (_, i) => {
            const date = new Date(today);
            date.setDate(date.getDate() + i + 1);
            const icons = ["01d", "02d", "03d", "10d", "02d"];
            const mains = ["Clear", "Clouds", "Clouds", "Rain", "Clouds"];
            const descriptions = ["despejado", "algo de nubes", "nublado", "lluvia ligera", "parcialmente nublado"];

            return {
                date: date.toISOString().split("T")[0],
                dayName: dayNames[date.getDay()],
                tempMax: 18 + Math.floor(Math.random() * 5),
                tempMin: 10 + Math.floor(Math.random() * 5),
                description: descriptions[i],
                icon: icons[i],
                main: mains[i],
                precipitationProb: i === 3 ? 60 : Math.floor(Math.random() * 30),
            };
        }),
        location: "Zona de la ruta",
    };
}
