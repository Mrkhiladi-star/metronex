import TouristCard from "@/components/ui/tourist-card";
import { connectDB } from "@/lib/db";
import Tourist from "@/models/Tourist";

export default async function ExplorePage() {
  await connectDB();

  const places = await Tourist.find().lean();

  return (
    <div className="mt-6 space-y-6">
      <h1 className="text-xl font-semibold">Explore Lucknow</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {places.map((p: any) => (
          <TouristCard
            key={p.place}
            place={p.place}
            nearest={p.nearest}
            image={`/explore/${p.place
              .toLowerCase()
              .replace(/ /g, "-")}.jpg`}
          />
        ))}
      </div>
    </div>
  );
}
