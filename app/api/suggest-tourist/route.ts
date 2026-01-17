import { connectDB } from "@/lib/db";
import Tourist from "@/models/Tourist";

let cachedPlaces: string[] | null = null;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  if (!q) return Response.json([]);

  // Cache tourist places
  if (!cachedPlaces) {
    await connectDB();
    const places = await Tourist.find({}, "place").lean();
    cachedPlaces = places.map((p: any) => p.place.toLowerCase());
  }

  // Filter results
  const result = cachedPlaces.filter((name) => name.includes(q));

  return Response.json(result.slice(0, 5));
}
