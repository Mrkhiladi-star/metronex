import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const items = [
    { title: "Find Route", link: "/route" },
    { title: "Nearest Station", link: "/nearest" },
    { title: "Recharge Smart Card", link: "/recharge" },
    { title: "Metro Map", link: "/map" },
    { title: "Explore Lucknow", link: "/explore" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
      {items.map((item) => (
        <Link key={item.title} href={item.link}>
          <Card className="hover:shadow-lg transition cursor-pointer">
            <CardContent className="p-6 text-center font-semibold">
              {item.title}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
