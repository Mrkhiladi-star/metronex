"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
const links = [
  { name: "Route", href: "/route" },
  { name: "Nearest", href: "/nearest" },
  { name: "Recharge", href: "/recharge" },
  { name: "Map", href: "/map" },
  { name: "Explore", href: "/explore" },
];
export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <header className="w-full border-b bg-white dark:bg-neutral-900 dark:border-neutral-700">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full overflow-hidden shadow-md border dark:border-neutral-700 bg-white flex items-center justify-center">
            <Image
              src="/logo.svg"
              width={80}
              height={80}
              alt="Metronex Logo"
              className="object-contain"
            />
          </div>
          <span className="text-2xl font-bold tracking-wide text-red-600 dark:text-red-400">
            Metronex
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition",
                pathname === link.href
                  ? "text-red-600 underline dark:text-red-400"
                  : "text-gray-700 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
              )}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
          >
            {mounted ? (
              theme === "light" ? <Moon size={20} /> : <Sun size={20} />
            ) : null}
          </button>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-white dark:bg-neutral-900 border-t dark:border-neutral-700 p-4 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
          >
            {mounted ? (
              theme === "light" ? <Moon size={20} /> : <Sun size={20} />
            ) : null}
          </button>
        </div>
      )}
    </header>
  );
}
