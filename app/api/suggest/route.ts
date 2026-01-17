import { connectDB } from "@/lib/db";
import Station from "@/models/Station";
import Fuse from "fuse.js";

// In-memory cache
let fuse: Fuse<string> | null = null;
let originalNames: string[] = [];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  if (!q) return Response.json([]);

  // Load + cache once
  if (!fuse) {
    await connectDB();
    const stations = await Station.find({}, "name").lean();

    originalNames = stations.map((s: any) => s.name);

    fuse = new Fuse(originalNames, {
      threshold: 0.4,
    });
  }

  // Fuzzy match based on original names
  const result = fuse.search(q).map((r) => r.item).slice(0, 6);

  return Response.json(result);
}
