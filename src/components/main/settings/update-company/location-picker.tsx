"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2, MapPin, Navigation, Search } from "lucide-react";
import type { LocationPickerMapProps } from "./location-picker-map";

const LocationPickerMap = dynamic<LocationPickerMapProps>(
  () => import("./location-picker-map").then((mod) => mod.LocationPickerMap),
  { ssr: false, loading: () => <MapSkeleton /> },
);

function MapSkeleton() {
  return (
    <div className="flex h-[280px] w-full animate-pulse items-center justify-center rounded-lg bg-bg-creamy">
      <MapPin className="size-8 text-primary/40" />
    </div>
  );
}

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationPickerProps {
  lat: number;
  lng: number;
  initialAddress?: string;
  fallbackAddress?: string;
  onChange: (lat: number, lng: number) => void;
  onAddressChange?: (address: string) => void;
  onSearchValueChange?: (value: string) => void;
}

export function LocationPicker({
  lat,
  lng,
  initialAddress,
  fallbackAddress,
  onChange,
  onAddressChange,
  onSearchValueChange,
}: LocationPickerProps) {
  const resolvedFallbackAddress = fallbackAddress ?? initialAddress ?? "";
  const [query, setQuery] = useState(resolvedFallbackAddress);
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [flyToCenter, setFlyToCenter] = useState<[number, number] | null>(null);
  const [isGeolocating, setIsGeolocating] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const skipNextSearchRef = useRef(false);
  const onAddressChangeRef = useRef(onAddressChange);
  const onSearchValueChangeRef = useRef(onSearchValueChange);

  const latNum = Number(lat);
  const lngNum = Number(lng);
  const hasCoordinates =
    Number.isFinite(latNum) &&
    Number.isFinite(lngNum) &&
    (latNum !== 0 || lngNum !== 0);

  useEffect(() => {
    onAddressChangeRef.current = onAddressChange;
  }, [onAddressChange]);

  useEffect(() => {
    onSearchValueChangeRef.current = onSearchValueChange;
  }, [onSearchValueChange]);

  function notifyAddressValueChange(value: string) {
    onSearchValueChangeRef.current?.(value);
    onAddressChangeRef.current?.(value);
  }

  useEffect(() => {
    if (!hasCoordinates) return;

    const controller = new AbortController();

    skipNextSearchRef.current = true;
    setQuery(resolvedFallbackAddress);
    setIsReverseGeocoding(true);
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latNum}&lon=${lngNum}&format=json`,
      {
        headers: { "Accept-Language": "en" },
        signal: controller.signal,
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.display_name) {
          skipNextSearchRef.current = true;
          setQuery(data.display_name);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          skipNextSearchRef.current = true;
          setQuery(resolvedFallbackAddress);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsReverseGeocoding(false);
        }
      });

    return () => controller.abort();
  }, [hasCoordinates, latNum, lngNum, resolvedFallbackAddress]);

  useEffect(() => {
    skipNextSearchRef.current = true;
    setQuery(resolvedFallbackAddress);
  }, [resolvedFallbackAddress]);

  useEffect(() => {
    const trimmed = query.trim();

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      return;
    }

    if (!trimmed) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(trimmed)}&format=json&limit=5`,
          { headers: { "Accept-Language": "en" } },
        );
        const data: NominatimResult[] = await res.json();
        setSuggestions(data);
        setShowDropdown(data.length > 0);
      } catch {
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(result: NominatimResult) {
    const newLat = parseFloat(parseFloat(result.lat).toFixed(6));
    const newLng = parseFloat(parseFloat(result.lon).toFixed(6));
    onChange(newLat, newLng);
    setFlyToCenter([newLat, newLng]);
    skipNextSearchRef.current = true;
    setQuery(result.display_name);
    notifyAddressValueChange(result.display_name);
    setShowDropdown(false);
  }

  function handleUseCurrentLocation() {
    if (!navigator.geolocation) return;
    setIsGeolocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const newLat = parseFloat(pos.coords.latitude.toFixed(6));
        const newLng = parseFloat(pos.coords.longitude.toFixed(6));
        onChange(newLat, newLng);
        setFlyToCenter([newLat, newLng]);
        setIsReverseGeocoding(true);
        setIsGeolocating(false);
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${newLat}&lon=${newLng}&format=json`,
            { headers: { "Accept-Language": "en" } },
          );
          const data = await res.json();
          if (data.display_name) {
            skipNextSearchRef.current = true;
            setQuery(data.display_name);
            notifyAddressValueChange(data.display_name);
            setSuggestions([]);
            setShowDropdown(false);
          }
        } catch {
          // keep existing query
        } finally {
          setIsReverseGeocoding(false);
        }
      },
      () => setIsGeolocating(false),
    );
  }

  async function handleMapChange(newLat: number, newLng: number) {
    onChange(newLat, newLng);
    setIsReverseGeocoding(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${newLat}&lon=${newLng}&format=json`,
        { headers: { "Accept-Language": "en" } },
      );
      const data = await res.json();
      if (data.display_name) {
        skipNextSearchRef.current = true;
        setQuery(data.display_name);
        notifyAddressValueChange(data.display_name);
        setSuggestions([]);
        setShowDropdown(false);
      }
    } catch {
      // keep existing query
    } finally {
      setIsReverseGeocoding(false);
    }
  }

  return (
    <div className="space-y-2">
      <div ref={wrapperRef} className="relative">
        <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray" />
          {(isSearching || isReverseGeocoding) && (
            <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-primary" />
          )}
          <input
            type="text"
            value={query}
            onChange={(e) => {
              const nextValue = e.target.value;
              setQuery(nextValue);
              notifyAddressValueChange(nextValue);
            }}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setShowDropdown(false);
              if (e.key === "Enter") e.preventDefault();
            }}
            placeholder="Search for a location..."
            autoComplete="off"
            className="min-h-10.5 w-full rounded-lg border border-primary bg-[#fbf8eb]/8 py-2 pl-9 pr-9 text-sm font-medium text-dark outline-none placeholder:text-[#98A2B3] focus:border-primary/70"
          />
        </div>

        <button
          type="button"
          onClick={handleUseCurrentLocation}
          disabled={isGeolocating}
          title="Use current location"
          className="flex h-10.5 shrink-0 items-center gap-1.5 rounded-lg border border-primary bg-[#fbf8eb]/8 px-3 text-sm font-medium text-primary transition-colors hover:bg-[#fbf8eb] disabled:opacity-60"
        >
          {isGeolocating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Navigation className="size-4" />
          )}
          <span className="hidden sm:inline">Current</span>
        </button>
        </div>

        {showDropdown && (
          <ul className="absolute z-9999 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-primary/20 bg-background shadow-lg">
            {suggestions.map((result) => (
              <li key={result.place_id}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(result)}
                  className="flex w-full items-start gap-2 px-3 py-2.5 text-left text-sm hover:bg-[#fbf8eb] focus:bg-[#fbf8eb] focus:outline-none"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="line-clamp-2 text-dark">{result.display_name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <LocationPickerMap
        lat={latNum || 0}
        lng={lngNum || 0}
        flyToCenter={flyToCenter}
        onChange={handleMapChange}
      />
    </div>
  );
}
