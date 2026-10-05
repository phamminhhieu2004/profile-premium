import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Cloud,
  Sun,
  CloudSun,
  CloudRain,
  CloudLightning,
  CloudFog,
  Wind,
  Droplets,
  Clock,
  RotateCw,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  MapPin,
  Umbrella,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CityConfig {
  name: string;
  country: string;
  lat: number;
  lon: number;
  tz: string;
}

const CITIES: CityConfig[] = [
  { name: "Thái Nguyên", country: "VN", lat: 21.5942, lon: 105.8412, tz: "Asia/Bangkok" },
  { name: "Hà Nội", country: "VN", lat: 21.0285, lon: 105.8542, tz: "Asia/Bangkok" },
  { name: "TP. Hồ Chí Minh", country: "VN", lat: 10.8231, lon: 106.6297, tz: "Asia/Bangkok" },
  { name: "Đà Nẵng", country: "VN", lat: 16.0544, lon: 108.2022, tz: "Asia/Bangkok" },
  { name: "Hải Phòng", country: "VN", lat: 20.8449, lon: 106.6881, tz: "Asia/Bangkok" },
  { name: "Tokyo", country: "JP", lat: 35.6762, lon: 139.6503, tz: "Asia/Tokyo" },
  { name: "Seoul", country: "KR", lat: 37.5665, lon: 126.978, tz: "Asia/Seoul" },
  { name: "Singapore", country: "SG", lat: 1.3521, lon: 103.8198, tz: "Asia/Singapore" },
  { name: "London", country: "GB", lat: 51.5074, lon: -0.1278, tz: "Europe/London" },
  { name: "New York", country: "US", lat: 40.7128, lon: -74.006, tz: "America/New_York" },
];

export const WeatherWidget: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<CityConfig>(CITIES[0]);
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const [weather, setWeather] = useState<{
    temp: number;
    humidity: number;
    wind: number;
    rain: number;
    uv: string;
    weatherCode: number;
    isDay: boolean;
    updatedAt: string;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-GB", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
      setCurrentDate(
        now.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  const fetchWeather = async (city: CityConfig) => {
    setLoading(true);
    const cacheKey = `weather_${city.lat}_${city.lon}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < 10 * 60 * 1000) {
          setWeather(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        // Fallback to fresh fetch on parse error
      }
    }

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation_probability,weather_code,is_day,uv_index&timezone=${encodeURIComponent(
        city.tz
      )}&forecast_days=1`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Weather API error");
      const data = await res.json();
      const c = data.current;

      const now = new Date();
      const updatedTimeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      const weatherResult = {
        temp: Math.round(c.temperature_2m),
        humidity: c.relative_humidity_2m,
        wind: Math.round(c.wind_speed_10m),
        rain: c.precipitation_probability || 0,
        uv: c.uv_index !== undefined ? Number(c.uv_index).toFixed(1) : "0.0",
        weatherCode: c.weather_code || 0,
        isDay: Boolean(c.is_day),
        updatedAt: updatedTimeStr,
      };

      setWeather(weatherResult);
      sessionStorage.setItem(cacheKey, JSON.stringify({ data: weatherResult, timestamp: Date.now() }));
    } catch (err) {
      // Graceful fallback values so UI never crashes
      setWeather({
        temp: 26,
        humidity: 68,
        wind: 12,
        rain: 10,
        uv: "3.5",
        weatherCode: 2,
        isDay: true,
        updatedAt: "Mặc định",
      });
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
    const interval = setInterval(() => {
      fetchWeather(selectedCity);
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedCity]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    const cacheKey = `weather_${selectedCity.lat}_${selectedCity.lon}`;
    sessionStorage.removeItem(cacheKey);
    fetchWeather(selectedCity);
  };

  const getWeatherIcon = (code: number, isDay: boolean) => {
    if (code === 0 || code === 1) {
      return isDay ? <Sun className="w-6 h-6 text-amber-400" /> : <Sun className="w-6 h-6 text-cyan-300" />;
    }
    if (code === 2) return <CloudSun className="w-6 h-6 text-amber-300" />;
    if (code === 3) return <Cloud className="w-6 h-6 text-slate-400" />;
    if ([45, 48].includes(code)) return <CloudFog className="w-6 h-6 text-slate-400" />;
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
      return <CloudRain className="w-6 h-6 text-cyan-400" />;
    if ([95, 96, 99].includes(code)) return <CloudLightning className="w-6 h-6 text-amber-500" />;
    return <Cloud className="w-6 h-6 text-cyan-400" />;
  };

  const getWeatherDesc = (code: number, isDay: boolean): string => {
    if (language === "vi") {
      const descriptions: Record<number, string> = {
        0: isDay ? "Nắng đẹp trời quang" : "Đêm quang mây",
        1: isDay ? "Trời ít mây" : "Đêm ít mây",
        2: "Có mây rải rác",
        3: "Nhiều mây",
        45: "Sương mù",
        48: "Sương mù băng tuyết",
        51: "Mưa phùn nhẹ",
        53: "Mưa phùn vừa",
        55: "Mưa phùn nặng hạt",
        61: "Mưa nhỏ rải rác",
        63: "Mưa vừa",
        65: "Mưa to",
        80: "Mưa rào nhẹ",
        81: "Mưa rào vừa",
        82: "Mưa rào rất to",
        95: "Dông sét",
        96: "Dông kèm mưa đá",
        99: "Dông bão mạnh",
      };
      return descriptions[code] || "Quang đãng";
    } else {
      const descriptions: Record<number, string> = {
        0: isDay ? "Clear Sky" : "Clear Night",
        1: isDay ? "Mostly Clear" : "Clear Night",
        2: "Partly Cloudy",
        3: "Overcast",
        45: "Foggy",
        48: "Depositing Rime Fog",
        51: "Light Drizzle",
        53: "Moderate Drizzle",
        55: "Dense Drizzle",
        61: "Slight Rain",
        63: "Moderate Rain",
        65: "Heavy Rain",
        80: "Light Showers",
        81: "Moderate Showers",
        82: "Violent Showers",
        95: "Thunderstorm",
        96: "Thunderstorm with Hail",
        99: "Severe Thunderstorm",
      };
      return descriptions[code] || "Clear Sky";
    }
  };

  const filteredCities = CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Minimized Floating Pill - Always visible at bottom-left */}
      <AnimatePresence>
        {isMinimized && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            onClick={() => setIsMinimized(false)}
            className="fixed bottom-6 left-6 z-40 flex items-center gap-3 px-3.5 py-2 rounded-full bg-slate-900/90 dark:bg-dark-card/90 border border-cyan-500/40 hover:border-cyan-400 shadow-xl shadow-black/50 backdrop-blur-md text-left transition-all hover:scale-105 group"
            aria-label="Xem chi tiết thời tiết"
          >
            <div className="p-1.5 rounded-full bg-cyan-500/10 text-cyan-400">
              {weather ? getWeatherIcon(weather.weatherCode, weather.isDay) : <CloudSun className="w-5 h-5 text-cyan-400" />}
            </div>
            <div className="flex flex-col pr-1">
              <span className="font-heading font-bold text-sm text-white tracking-wide leading-none">
                {weather ? `${weather.temp}°C` : "--°C"}
              </span>
              <span className="text-[11px] text-cyan-400 font-mono tracking-tight leading-tight mt-0.5">
                {selectedCity.name}
              </span>
            </div>
            <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors ml-1" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Weather Modal Card */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-50 w-[300px] sm:w-[320px] rounded-2xl bg-slate-900/95 dark:bg-dark-card/95 border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 backdrop-blur-xl p-5 text-white overflow-hidden"
          >
            {/* Header: Icon, Location, Time & Close button */}
            <div className="flex items-start justify-between gap-3 mb-3.5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  {weather ? getWeatherIcon(weather.weatherCode, weather.isDay) : <Cloud className="w-6 h-6 text-cyan-400" />}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-cyan-400 text-xs font-semibold uppercase tracking-wider font-mono">
                    <MapPin className="w-3 h-3" />
                    {selectedCity.name}, {selectedCity.country}
                  </div>
                  <div className="font-mono text-lg font-bold text-white tracking-wider leading-tight">
                    {currentTime || "--:--:--"}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono leading-none">
                    {currentDate}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                aria-label="Thu nhỏ widget thời tiết"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* City search box */}
            <div className="relative mb-3.5">
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 absolute left-3 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder={t("weather.search")}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl pl-9 pr-8 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 text-slate-400 hover:text-white text-xs"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* City selector dropdown */}
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-slate-950 border border-slate-700 rounded-xl shadow-xl z-20 p-1 divide-y divide-slate-800/50"
                >
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city) => (
                      <button
                        key={`${city.name}-${city.country}`}
                        onClick={() => {
                          setSelectedCity(city);
                          setSearchQuery("");
                          setShowDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                          selectedCity.name === city.name
                            ? "bg-cyan-500/20 text-cyan-300 font-semibold"
                            : "hover:bg-slate-800 text-slate-300"
                        }`}
                      >
                        <span>{city.name}</span>
                        <span className="text-[10px] font-mono text-slate-500">{city.country}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-xs text-slate-500 italic text-center">
                      Không tìm thấy
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Temperature & Description */}
            <div className="mb-3.5">
              {loading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-10 w-24 bg-slate-800 rounded-lg" />
                  <div className="h-4 w-36 bg-slate-800 rounded" />
                </div>
              ) : weather ? (
                <>
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-extrabold text-white tracking-tight">
                      {weather.temp}
                    </span>
                    <span className="text-xl text-cyan-400 font-medium">°C</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 font-medium">
                    {getWeatherDesc(weather.weatherCode, weather.isDay)}
                  </p>
                </>
              ) : null}
            </div>

            {/* Meteorological Telemetry Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3.5">
              <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-2 flex items-center gap-2.5">
                <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {t("weather.humidity")}
                  </span>
                  <strong className="text-xs font-semibold text-slate-100 font-mono">
                    {weather ? `${weather.humidity}%` : "--"}
                  </strong>
                </div>
              </div>

              <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-2 flex items-center gap-2.5">
                <Wind className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {t("weather.wind")}
                  </span>
                  <strong className="text-xs font-semibold text-slate-100 font-mono">
                    {weather ? `${weather.wind} km/h` : "--"}
                  </strong>
                </div>
              </div>

              <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-2 flex items-center gap-2.5">
                <Umbrella className="w-4 h-4 text-teal-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {t("weather.rain")}
                  </span>
                  <strong className="text-xs font-semibold text-slate-100 font-mono">
                    {weather ? `${weather.rain}%` : "--"}
                  </strong>
                </div>
              </div>

              <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-2 flex items-center gap-2.5">
                <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {t("weather.uv")}
                  </span>
                  <strong className="text-xs font-semibold text-slate-100 font-mono">
                    {weather ? weather.uv : "--"}
                  </strong>
                </div>
              </div>
            </div>

            {/* Footer with update time & refresh button */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                {t("weather.updated")} {weather?.updatedAt || "--:--"}
              </span>
              <button
                onClick={handleManualRefresh}
                disabled={isRefreshing}
                className="p-1 rounded hover:text-cyan-400 transition-colors flex items-center gap-1"
                title={t("weather.refresh")}
              >
                <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-cyan-400" : ""}`} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
