import Image from "next/image";
export default function MapPage() {
  return (
    <div className="mt-6 max-w-4xl mx-auto">
      <h1 className="text-lg font-semibold mb-4">Lucknow Metro Map</h1>

      <div className="
        p-4 
        rounded-lg 
        border 
        bg-card 
        text-card-foreground 
        shadow 
        dark:border-neutral-700
        flex 
        justify-center
      ">
        <Image
          src="/lucknow-metro-rail-map.png"
          alt="Lucknow Metro Map"
          width={1000}
          height={800}
          className="
            w-full 
            h-auto 
            rounded 
            border 
            bg-white 
            dark:bg-neutral-800 
            dark:border-neutral-700
          "
        />
      </div>
    </div>
  );
}
