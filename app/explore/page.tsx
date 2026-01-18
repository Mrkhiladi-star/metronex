"use client";

import { useEffect, useState } from "react";
import TouristCard from "@/components/ui/tourist-card";

export default function ExplorePage() {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch("/api/tourists");
        const data = await res.json();
        setPlaces(data);
      } catch (err) {
        console.error("Failed to load tourist places", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div className="mt-6 space-y-6">
      <h1 className="text-xl font-semibold">Explore Lucknow</h1>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading places...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {places.map((p: any, i: number) => (
            <TouristCard
              key={i}
              place={p.place}
              nearest={p.nearest}
              image={`/explore/${p.place.toLowerCase().replace(/ /g, "-")}.jpg`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
