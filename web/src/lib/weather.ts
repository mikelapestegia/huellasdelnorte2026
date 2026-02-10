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
// Returns translation KEYS, not final text
export function getDogWalkingConditions(weather: WeatherData): {
    rating: "excellent" | "good" | "caution" | "avoid";
    message: string; // Translation key
    tips: string[]; // Translation keys
} {
    const temp = weather.temperature;
    const main = weather.main.toLowerCase();

    // Extreme conditions - avoid
    if (temp > 35 || temp < -5 || main.includes("thunderstorm")) {
        return {
            rating: "avoid",
            message: "conditions.avoid",
            tips: [
                temp > 35 ? "tips.heat_warning" : "",
                temp < -5 ? "tips.cold_warning" : "",
                main.includes("thunderstorm") ? "tips.storm_warning" : "",
            ].filter(Boolean),
        };
    }

    // Caution conditions
    if (temp > 28 || temp < 0 || main.includes("rain") || main.includes("snow")) {
        return {
            rating: "caution",
            message: "conditions.caution",
            tips: [
                temp > 28 ? "tips.avoid_midday" : "",
                temp > 28 ? "tips.extra_water" : "",
                temp < 0 ? "tips.paw_protection" : "",
                main.includes("rain") ? "tips.raincoat" : "",
                main.includes("snow") ? "tips.snow_caution" : "",
            ].filter(Boolean),
        };
    }

    // Good conditions
    if (temp >= 10 && temp <= 22) {
        return {
            rating: "excellent",
            message: "conditions.excellent",
            tips: [
                "tips.ideal_temp",
                "tips.comfortable",
            ],
        };
    }

    // Default good
    return {
        rating: "good",
        message: "conditions.good",
        tips: [
            temp > 22 ? "tips.shade" : "",
            temp < 10 ? "tips.coat" : "",
            "tips.water",
        ].filter(Boolean),
    };
}

// Fetch weather data from OpenWeatherMap
export async function fetchWeather(
    lat: number,
    lon: number,
    apiKey?: string,
    locale: string = "es"
): Promise<WeatherForecast | null> {
    // If no API key, return mock data
    if (!apiKey) {
        return getMockWeatherData(locale);
    }

    try {
        // Current weather
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=${locale}&appid=${apiKey}`
        );

        if (!currentResponse.ok) {
            console.error("Weather API error:", currentResponse.status);
            return getMockWeatherData(locale);
        }

        const currentData = await currentResponse.json();

        // 5-day forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=${locale}&appid=${apiKey}`
        );

        if (!forecastResponse.ok) {
            console.error("Forecast API error:", forecastResponse.status);
            return getMockWeatherData(locale);
        }

        const forecastData = await forecastResponse.json();

        // Process forecast data - get one entry per day
        const dailyForecasts = processForecastData(forecastData.list, locale);

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
        return getMockWeatherData(locale);
    }
}

// Process forecast data to get daily summaries
function processForecastData(list: any[], locale: string): ForecastDay[] {
    const dailyMap = new Map<string, any[]>();

    list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!dailyMap.has(date)) {
            dailyMap.set(date, []);
        }
        dailyMap.get(date)!.push(item);
    });

    const days: ForecastDay[] = [];

    // Use Intl for day names relative to locale
    const dateFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });

    dailyMap.forEach((items, dateStr) => {
        if (days.length >= 5) return; // Limit to 5 days

        const date = new Date(dateStr);
        let dayName = "";
        try {
            dayName = dateFormatter.format(date);
            // Capitalize first letter
            dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
        } catch (e) {
            dayName = date.toLocaleDateString();
        }

        const temps = items.map((i) => i.main.temp);
        const midday = items.find((i) => i.dt_txt.includes("12:00")) || items[0];
        const precipProbs = items.map((i) => i.pop || 0);

        days.push({
            date: dateStr,
            dayName: dayName,
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
function getMockWeatherData(locale: string): WeatherForecast {
    const today = new Date();
    const dateFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });

    return {
        current: {
            temperature: 18,
            feelsLike: 17,
            humidity: 65,
            windSpeed: 12,
            description: locale === "es" ? "parcialmente nublado" : "partly cloudy",
            icon: "02d",
            main: "Clouds",
        },
        forecast: Array.from({ length: 5 }, (_, i) => {
            const date = new Date(today);
            date.setDate(date.getDate() + i + 1);

            let dayName = "";
            try {
                dayName = dateFormatter.format(date);
                dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
            } catch (e) {
                dayName = "Day " + (i + 1);
            }

            const icons = ["01d", "02d", "03d", "10d", "02d"];
            const descriptionsEs = ["despejado", "algo de nubes", "nublado", "lluvia ligera", "parcialmente nublado"];
            const descriptionsEn = ["clear", "few clouds", "cloudy", "light rain", "partly cloudy"];
            const descriptions = locale === "es" ? descriptionsEs : descriptionsEn;

            return {
                date: date.toISOString().split("T")[0],
                dayName: dayName,
                tempMax: 18 + Math.floor(Math.random() * 5),
                tempMin: 10 + Math.floor(Math.random() * 5),
                description: descriptions[i] || "cloudy",
                icon: icons[i],
                main: "Clouds",
                precipitationProb: i === 3 ? 60 : Math.floor(Math.random() * 30),
            };
        }),
        location: "Route Zone", // Generic name
    };
}
