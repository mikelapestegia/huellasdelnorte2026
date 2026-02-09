"use client";

import { useEffect, useState } from "react";
import {
    ThermometerSun, Wind, Droplets, CloudRain,
    AlertTriangle, CheckCircle2, Dog, Loader2
} from "lucide-react";
import {
    WeatherForecast,
    fetchWeather,
    getDogWalkingConditions,
    weatherIconToEmoji
} from "@/lib/weather";

interface RouteWeatherProps {
    coordinates: [number, number]; // [lng, lat]
    routeName: string;
}

const ratingColors = {
    excellent: "bg-green-50 border-green-200 text-green-800",
    good: "bg-blue-50 border-blue-200 text-blue-800",
    caution: "bg-amber-50 border-amber-200 text-amber-800",
    avoid: "bg-red-50 border-red-200 text-red-800",
};

const ratingIcons = {
    excellent: <CheckCircle2 className="h-5 w-5 text-green-600" />,
    good: <CheckCircle2 className="h-5 w-5 text-blue-600" />,
    caution: <AlertTriangle className="h-5 w-5 text-amber-600" />,
    avoid: <AlertTriangle className="h-5 w-5 text-red-600" />,
};

export default function RouteWeather({ coordinates, routeName }: RouteWeatherProps) {
    const [weather, setWeather] = useState<WeatherForecast | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadWeather() {
            setLoading(true);
            setError(null);

            try {
                // Note: In production, API key should come from environment variable
                // For now, we use mock data (passing no API key)
                const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
                const data = await fetchWeather(coordinates[1], coordinates[0], apiKey);

                if (data) {
                    setWeather(data);
                } else {
                    setError("No se pudo cargar el tiempo");
                }
            } catch (err) {
                setError("Error al cargar datos meteorológicos");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadWeather();
    }, [coordinates]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-3 text-foreground/60">Cargando datos meteorológicos...</span>
            </div>
        );
    }

    if (error || !weather) {
        return (
            <div className="text-center py-8">
                <CloudRain className="h-12 w-12 text-foreground/30 mx-auto mb-3" />
                <p className="text-foreground/60">{error || "Datos no disponibles"}</p>
            </div>
        );
    }

    const conditions = getDogWalkingConditions(weather.current);

    return (
        <div className="space-y-6">
            {/* Current weather */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Temperature card */}
                <div className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-foreground/60 mb-1">Ahora en {weather.location}</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-bold text-foreground">
                                    {weather.current.temperature}°
                                </span>
                                <span className="text-2xl">
                                    {weatherIconToEmoji[weather.current.icon] || "🌤️"}
                                </span>
                            </div>
                            <p className="text-foreground/70 capitalize mt-1">
                                {weather.current.description}
                            </p>
                        </div>
                        <ThermometerSun className="h-8 w-8 text-primary/60" />
                    </div>
                </div>

                {/* Details card */}
                <div className="rounded-xl bg-secondary/30 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-foreground/70">
                            <ThermometerSun className="h-4 w-4" />
                            Sensación
                        </span>
                        <span className="font-semibold text-foreground">
                            {weather.current.feelsLike}°C
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-foreground/70">
                            <Droplets className="h-4 w-4" />
                            Humedad
                        </span>
                        <span className="font-semibold text-foreground">
                            {weather.current.humidity}%
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-foreground/70">
                            <Wind className="h-4 w-4" />
                            Viento
                        </span>
                        <span className="font-semibold text-foreground">
                            {weather.current.windSpeed} km/h
                        </span>
                    </div>
                </div>
            </div>

            {/* Dog walking conditions */}
            <div className={`rounded-xl border p-4 ${ratingColors[conditions.rating]}`}>
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                        {ratingIcons[conditions.rating]}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Dog className="h-5 w-5" />
                            <span className="font-semibold">{conditions.message}</span>
                        </div>
                        {conditions.tips.length > 0 && (
                            <ul className="space-y-1">
                                {conditions.tips.map((tip, i) => (
                                    <li key={i} className="text-sm flex items-start gap-2">
                                        <span>•</span>
                                        <span>{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/* 5-day forecast */}
            <div>
                <h4 className="font-semibold text-foreground mb-3">Próximos días</h4>
                <div className="grid grid-cols-5 gap-2">
                    {weather.forecast.map((day) => (
                        <div
                            key={day.date}
                            className="rounded-xl bg-secondary/30 p-3 text-center"
                        >
                            <p className="text-xs font-semibold text-foreground/60 mb-1">
                                {day.dayName}
                            </p>
                            <p className="text-2xl mb-1">
                                {weatherIconToEmoji[day.icon] || "🌤️"}
                            </p>
                            <p className="text-sm font-semibold text-foreground">
                                {day.tempMax}°
                            </p>
                            <p className="text-xs text-foreground/60">
                                {day.tempMin}°
                            </p>
                            {day.precipitationProb > 30 && (
                                <p className="text-xs text-blue-600 mt-1 flex items-center justify-center gap-0.5">
                                    <Droplets className="h-3 w-3" />
                                    {day.precipitationProb}%
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Best times to walk */}
            <div className="rounded-xl bg-primary/5 p-4">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Dog className="h-5 w-5 text-primary" />
                    Mejores horas para pasear
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-foreground/70">Mañana temprano (7:00-10:00)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-foreground/70">Tarde-noche (18:00-21:00)</span>
                    </div>
                    {weather.current.temperature > 25 && (
                        <div className="col-span-2 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                            <span className="text-foreground/70">Evitar horas centrales (12:00-17:00)</span>
                        </div>
                    )}
                </div>
            </div>

            <p className="text-xs text-foreground/40 text-center">
                Datos proporcionados por OpenWeatherMap. Actualizado hace unos minutos.
            </p>
        </div>
    );
}
