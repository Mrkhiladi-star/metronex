"use server";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Tourist from "@/models/Tourist";
import Fuse from "fuse.js";
export async function POST(req: NextRequest) {
  const { place } = await req.json();
  await connectDB();
  const allPlaces = await Tourist.find().lean();
  const fuse = new Fuse(allPlaces, {
    keys: ["place"],
    threshold: 0.4,
  });
  const result = fuse.search(place);
  if (result.length === 0) {
    return Response.json(
      {
        error: "Place not found",
        suggestions: ["Try a different spelling", "Use a popular place"],
      },
      { status: 404 }
    );
  }
  const best = result[0].item;
  return Response.json({
    place: best.place,
    nearest: best.nearest,
    correctedFrom: place,
  });
}
