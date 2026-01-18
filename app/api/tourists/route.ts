"use server";
import { connectDB } from "@/lib/db";
import Tourist from "@/models/Tourist";
export async function GET() {
  try {
    await connectDB();
    const places = await Tourist.find().lean();
    return Response.json(places);
  } catch (error) {
    console.error("Error fetching tourist places:", error);
    return Response.json({ error: "Failed to load tourist places" }, { status: 500 });
  }
}
