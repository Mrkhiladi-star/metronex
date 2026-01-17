import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Station from "@/models/Station";
import { createFuzzySearch, fuzzyCorrect } from "@/utils/fuzzy";
import { bfsRoute } from "@/utils/bfs";
import { dijkstraRoute } from "@/utils/dijkstra";
import { calcFare, calcTime } from "@/utils/calc";

export async function POST(req: NextRequest) {
  const body = await req.json();
  let { source, destination, type } = body;

  await connectDB();

  // fetch stations
  const stations = await Station.find().lean();
  const names = stations.map((s: any) => s.name);

  // fuzzy matcher
  const fuse = createFuzzySearch(names);

  // fuzzy correct inputs
  const srcCorrect = fuzzyCorrect(fuse, source);
  const destCorrect = fuzzyCorrect(fuse, destination);

  if (!srcCorrect || !destCorrect) {
    return Response.json(
      {
        error: "Invalid station name",
        suggestions: { srcCorrect, destCorrect },
      },
      { status: 400 }
    );
  }

  const srcIndex = stations.findIndex((s: any) => s.name === srcCorrect);
  const destIndex = stations.findIndex((s: any) => s.name === destCorrect);

  let result: any;

  if (type === "bfs") {
    const path = bfsRoute(stations, srcIndex, destIndex);
    result = { path, lineChanges: 0, instructions: [] };
  } else {
    result = dijkstraRoute(stations, srcIndex, destIndex);
  }

  // --- SAFE FALLBACKS TO REMOVE TS ERRORS ---
  const safePath: number[] = Array.isArray(result.path) ? result.path : [];
  const safeLineChanges: number =
    typeof result.lineChanges === "number" ? result.lineChanges : 0;

  const safeInstructions: any[] = Array.isArray(result.instructions)
    ? result.instructions
    : [];

  const stops = safePath.length > 1 ? safePath.length - 1 : 0;

  return Response.json({
    source: srcCorrect,
    destination: destCorrect,

    path: safePath.map((i: number) => stations[i]?.name || "Unknown Station"),

    interchanges: safeLineChanges,
    fare: calcFare(stops, safeLineChanges),
    time: calcTime(stops, safeLineChanges),

    instructions: safeInstructions
      .map((step: any) => {
        if (step.type === "board")
          return `Board the ${step.line.toUpperCase()} line at ${step.station}`;
        if (step.type === "interchange")
          return `Change to ${step.toLine.toUpperCase()} line at ${step.station}`;
        if (step.type === "exit")
          return `Exit at ${step.station}`;
        return null;
      })
      .filter(Boolean), // remove nulls
  });
}
