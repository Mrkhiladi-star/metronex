import Image from "next/image";

export default function TouristCard({
  place,
  nearest,
  image,
}: {
  place: string;
  nearest: string;
  image: string;
}) {
  return (
    <div
      className="
      border 
      rounded-lg 
      overflow-hidden 
      shadow 
      bg-white 
      dark:bg-neutral-900 
      dark:border-neutral-700
      transition
    "
    >
      <Image
        src={image}
        alt={place}
        width={500}
        height={300}
        className="w-full h-48 object-cover"
      />

      <div className="p-3 space-y-1">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {place}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Nearest Station:</strong> {nearest}
        </p>
      </div>
    </div>
  );
}
