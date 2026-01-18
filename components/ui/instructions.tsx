"use client";
import { MapPin } from "lucide-react";
export default function Instructions({ steps }: { steps: string[] }) {
  if (!steps || steps.length === 0) return null;
  return (
    <div className="space-y-2">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex items-start space-x-3 p-3 rounded-lg border 
                     bg-white dark:bg-gray-700 
                     border-gray-200 dark:border-gray-600
                     text-gray-800 dark:text-gray-200
                     shadow-sm"
        >
          <MapPin className="text-red-500 dark:text-red-400 mt-1" />
          <p className="text-sm">{step}</p>
        </div>
      ))}
    </div>
  );
}
