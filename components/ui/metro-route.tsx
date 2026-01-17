import { cn } from "@/lib/utils";
import { MapPin, CircleDot } from "lucide-react";

export default function MetroRoute({ path }: { path: string[] }) {
  return (
    <div className="relative ml-4 mt-4">
      {/* Vertical red line */}
      <div className="absolute left-2 top-3 h-full w-[3px] bg-red-500"></div>

      <ul className="space-y-6">
        {path.map((station, idx) => (
          <li key={idx} className="relative flex items-center space-x-4">
            {/* Station Bullet */}
            <div
              className={cn(
                "w-4 h-4 rounded-full border-2 flex-shrink-0",
                idx === 0
                  ? "bg-green-500 border-green-600"       // Start
                  : idx === path.length - 1
                  ? "bg-blue-500 border-blue-600"        // End
                  : "bg-white border-red-500"            // Intermediate
              )}
            ></div>

            {/* Station Name */}
            <span
              className={cn(
                "text-sm font-medium",
                idx === 0 || idx === path.length - 1 ? "font-semibold" : ""
              )}
            >
              {station}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
