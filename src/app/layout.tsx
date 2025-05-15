import type { Metadata } from "next";
import "../styles/globals.css";
import dynamic from "next/dynamic";

const Game = dynamic(() => import("@/components/game/game"), {
  ssr: !!false,
});

export const metadata: Metadata = {
  title: "Game",
  description: "Created by paraform studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="relative z-0 flex h-screen min-h-screen w-screen">
          <Game />
          {children}
        </main>
      </body>
    </html>
  );
}
