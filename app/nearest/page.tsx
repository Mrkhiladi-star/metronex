"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, LandPlot } from "lucide-react";
export default function NearestPage() {
  const [place, setPlace] = useState("");
  const [result, setResult] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const fetchSuggestions = async (q: string) => {
    if (q.length === 0) return setSuggestions([]);
    const res = await fetch(`/api/suggest?q=${q}`);
    const data = await res.json();
    setSuggestions(data);
  };
  const findNearest = async () => {
    const res = await fetch("/api/nearest", {
      method: "POST",
      body: JSON.stringify({ place }),
    });
    const data = await res.json();
    setResult(data);
  };
  return (
    <div className="mt-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold">Nearest Metro Station</h1>
      <div className="relative">
        <Input
          placeholder="Enter tourist place"
          value={place}
          onChange={(e) => {
            setPlace(e.target.value);
            fetchSuggestions(e.target.value);
          }}
        />
        {suggestions.length > 0 && (
          <div className="absolute w-full bg-card text-card-foreground border rounded shadow z-10 mt-1">
            {suggestions.map((s) => (
              <div
                key={s}
                onClick={() => {
                  setPlace(s);
                  setSuggestions([]);
                }}
                className="p-2 border-b hover:bg-muted cursor-pointer text-sm transition"
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>
      <Button onClick={findNearest}>Find Nearest Station</Button>
      {result && !result.error && (
        <div className="p-4 border bg-card text-card-foreground rounded-lg space-y-3">
          <div className="flex items-center space-x-3">
            <LandPlot className="text-blue-600 dark:text-blue-300 w-6 h-6" />
            <h3 className="text-lg font-semibold">{result.place}</h3>
          </div>
          <div className="flex items-center space-x-3 mt-2">
            <MapPin className="text-red-600 dark:text-red-400 w-6 h-6" />
            <p className="text-md">
              <strong>Nearest Station:</strong>{" "}
              <span className="text-red-600 dark:text-red-400 font-semibold">
                {result.nearest}
              </span>
            </p>
          </div>
          {result.correctedFrom && (
            <p className="text-sm text-muted-foreground">
              Corrected from: <strong>{result.correctedFrom}</strong>
            </p>
          )}
        </div>
      )}
      {result && result.error && (
        <div className="p-4 border bg-destructive/10 text-destructive rounded-lg">
          <p className="font-medium">Place not found.</p>
          <p className="text-sm mt-2">{result.error}</p>

          {result.suggestions && (
            <ul className="list-disc ml-6 text-sm mt-2">
              {result.suggestions.map((s: string) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
