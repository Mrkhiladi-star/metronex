import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { ToastProvider } from "@/components/layout/toast-provider";
import { ThemeProvider } from "@/components/layout/theme-provider";

export const metadata = {
  title: "Lucknow Metro Planner",
  description: "Metro route finder for Lucknow city.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* DO NOT put className here */}
      <body>
        <ThemeProvider>
          <Navbar />
          <ToastProvider />
          <main className="max-w-4xl mx-auto p-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
