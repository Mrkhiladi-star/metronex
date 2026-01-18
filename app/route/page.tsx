"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MetroRoute from "@/components/ui/metro-route";
import Instructions from "@/components/ui/instructions";
import { toast } from "sonner";
import { saveHistory, loadHistory } from "@/utils/history";
import { saveHomeStation, loadHomeStation } from "@/utils/home";
export default function RoutePage() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeField, setActiveField] =
    useState<"source" | "destination" | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [home, setHome] = useState<string | null>(null);
  useEffect(() => {
    setHistory(loadHistory());
    const h = loadHomeStation();
    if (h) {
      setHome(h);
      if (!source) setSource(h);
    }
  }, []);
  const fetchSuggestions = async (q: string) => {
    try {
      const res = await fetch(`/api/suggest?q=${q}`);
    const data = await res.json();
      setSuggestions(data);
    } catch {
      setSuggestions([]);
    }
  };
  const handleChange = (value: string, field: "source" | "destination") => {
    if (field === "source") setSource(value);
    else setDestination(value);
    setActiveField(field);
    if (value.trim()) fetchSuggestions(value);
    else setSuggestions([]);
  };
  const findRoute = async () => {
    if (!source || !destination) {
      toast.error("Please enter both source and destination");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/route", {
      method: "POST",
      body: JSON.stringify({ source, destination, type: "dijkstra" }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) {
      toast.error(data.error);
      setRoute(data);
      return;
    }
    toast.success("Route found!");
    saveHistory({
      source,
      destination,
      timestamp: Date.now(),
    });
    setHistory(loadHistory());
    setRoute(data);
  };
  return (
    <div className="mt-6 space-y-4 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold">Find Metro Route</h1>
      {home && (
        <div className="p-2 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded border dark:border-blue-700">
          <strong>Home Station:</strong> {home}
        </div>
      )}
      {history.length > 0 && (
        <div className="p-3 border bg-white dark:bg-gray-800 dark:border-gray-700 rounded">
          <h3 className="font-medium mb-2 dark:text-gray-200">
            Recently Searched
          </h3>
          <div className="space-y-2">
            {history.map((h, i) => (
              <div
                key={i}
                onClick={() => {
                  setSource(h.source);
                  setDestination(h.destination);
                  toast.info(`${h.source} → ${h.destination}`);
                }}
                className="p-2 rounded border bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <p className="font-medium dark:text-gray-100">
                  {h.source} → {h.destination}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(h.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="relative">
        <Input
          placeholder="Source Station"
          value={source}
          onChange={(e) => handleChange(e.target.value, "source")}
        />
        {home && (
          <button
            onClick={() => setSource(home)}
            className="text-xs text-green-600 dark:text-green-400 underline mt-1"
          >
            Use Home Station
          </button>
        )}
        {source && (
          <button
            onClick={() => {
              saveHomeStation(source);
              setHome(source);
              toast.success(`${source} set as Home Station`);
            }}
            className="text-xs text-blue-600 dark:text-blue-400 underline ml-2"
          >
            Set as Home Station
          </button>
        )}
        {activeField === "source" && suggestions.length > 0 && (
          <div className="absolute w-full bg-white dark:bg-gray-700 border rounded shadow top-full z-10">
            {suggestions.map((s) => (
              <div
                key={s}
                onClick={() => {
                  setSource(s);
                  setSuggestions([]);
                }}
                className="p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-sm transition rounded"
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="relative">
        <Input
          placeholder="Destination Station"
          value={destination}
          onChange={(e) => handleChange(e.target.value, "destination")}
        />
        {activeField === "destination" && suggestions.length > 0 && (
          <div className="absolute w-full bg-white dark:bg-gray-700 border dark:border-gray-600 rounded shadow z-10">
            {suggestions.map((s) => (
              <div
                key={s}
                onClick={() => {
                  setDestination(s);
                  setSuggestions([]);
                }}
                className="p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-sm transition rounded"
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>
      <Button onClick={findRoute} disabled={loading}>
        {loading ? "Searching..." : "Search Route"}
      </Button>
      {route && !route.error && (
        <div className="mt-6 p-4 border bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg space-y-4">
          <h2 className="font-semibold text-lg dark:text-gray-100">
            Route Details
          </h2>
          <p className="dark:text-gray-200">
            <strong>From:</strong> {route.source}
          </p>
          <p className="dark:text-gray-200">
            <strong>To:</strong> {route.destination}
          </p>
          <p className="dark:text-gray-200">
            <strong>Fare:</strong> ₹{route.fare}
          </p>
          <p className="dark:text-gray-200">
            <strong>Time:</strong> {route.time} min
          </p>
          <p className="dark:text-gray-200">
            <strong>Interchanges:</strong> {route.interchanges}
          </p>
          <MetroRoute path={route.path} />
          <Instructions steps={route.instructions || []} />
        </div>
      )}
      {route && route.error && (
        <div className="mt-6 p-4 border bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-lg">
          <h2 className="font-semibold text-lg">Station not found</h2>
          <p className="mt-1">{route.error}</p>
          {route.suggestions && (
            <div className="mt-3">
              <h3 className="font-semibold text-sm mb-1">Closest matches:</h3>
              <ul className="list-disc ml-6 text-sm">
                {Object.values(route.suggestions).map((s: any, i) =>
                  s ? <li key={i}>{s}</li> : null
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
