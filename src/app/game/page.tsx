"use client";

import React from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Gamepad2, Trophy, Zap, Code2, Play, Lock, User } from "lucide-react";

export default function GamesPage() {
  const solahGames = [
    {
      id: "game1",
      title: "💰 Money Runner",
      description:
        "Collect Malaysian Ringgit bills in a 3D open world! Move your stickman and grab RM1-RM100 bills.",
      status: "Play Now",
      color: "neon-primary",
      icon: Gamepad2,
      enabled: true,
    },
    {
      id: "game2",
      title: "⚡ Super Saiyan Quest",
      description:
        "Play as Super Saiyan Goku! Place bombs to destroy walls, avoid enemies, and collect Ringgit bills. Go beyond your limits!",
      status: "Play Now",
      color: "neon-primary",
      icon: Gamepad2,
      enabled: true,
    },
    {
      id: "game3",
      title: "Not po-kemong",
      description: "Not po-kemong game",
      status: "Play Now",
      color: "gray-500",
      icon: Gamepad2,
      enabled: true,
    },
    {
      id: "game4",
      title: "Game 4",
      description: "Coming soon - Locked",
      status: "Locked",
      color: "gray-500",
      icon: Lock,
      enabled: false,
    },
    {
      id: "game5",
      title: "Game 5",
      description: "Coming soon - Locked",
      status: "Locked",
      color: "gray-500",
      icon: Lock,
      enabled: false,
    },
  ];

  const nabilGames = [
    {
      id: "game6",
      title: "Game 6",
      description: "Nabil's first game - Active and ready!",
      status: "Active",
      color: "neon-secondary",
      icon: Zap,
      enabled: true,
    },
    {
      id: "game7",
      title: "Game 7",
      description: "Nabil's second game - Active and ready!",
      status: "Active",
      color: "neon-secondary",
      icon: Zap,
      enabled: true,
    },
    {
      id: "game8",
      title: "Game 8",
      description: "Coming soon - Locked",
      status: "Locked",
      color: "gray-500",
      icon: Lock,
      enabled: false,
    },
    {
      id: "game9",
      title: "Game 9",
      description: "Coming soon - Locked",
      status: "Locked",
      color: "gray-500",
      icon: Lock,
      enabled: false,
    },
    {
      id: "game10",
      title: "Game 10",
      description: "Coming soon - Locked",
      status: "Locked",
      color: "gray-500",
      icon: Lock,
      enabled: false,
    },
  ];

  return (
    <main className="min-h-screen pb-20 overflow-hidden">
      <PageHero
        title="Game Zone"
        subtitle="Experimental games built by Kracked Devs. Test, play, and break things."
      />

      {/* Dev Playground Section */}
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full">
          <Card className="border-white/10 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,143,17,0.15)_0%,transparent_70%)] pointer-events-none" />
            <CardContent className="pt-16 pb-16 md:pt-20 md:pb-20 relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 text-center">
                🎮 Dev Playground
              </h2>
              <p className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto text-center font-light text-blue-100 leading-relaxed">
                Welcome to our experimental game development zone! Each game is a
                sandbox for testing new ideas, learning game mechanics, and
                shipping interactive experiences. Click on any game to play or
                view the code.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Solah's Games Section */}
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full">
          <div className="flex items-center gap-3 mb-8 md:mb-10">
            <User className="w-8 h-8 text-neon-primary" />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-primary to-white">
              Solah's Games
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {solahGames.map((game) => {
              const IconComponent = game.icon;

              const cardContent = (
                <Card
                  className={`border-white/10 backdrop-blur-sm transition-all duration-300 h-full ${
                    game.enabled
                      ? "bg-black/60 hover:border-neon-primary/50 cursor-pointer hover:scale-[1.02] group"
                      : "bg-black/30 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <IconComponent
                          className={`w-8 h-8 ${
                            game.enabled
                              ? "text-neon-primary group-hover:scale-110"
                              : "text-gray-600"
                          } transition-transform`}
                        />
                        <CardTitle className="text-xl">{game.title}</CardTitle>
                      </div>
                      {game.enabled ? (
                        <Play className="w-6 h-6 text-white/40 group-hover:text-white group-hover:scale-110 transition-all" />
                      ) : (
                        <Lock className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <CardDescription className="text-sm">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          game.enabled
                            ? "bg-neon-primary/10 text-neon-primary border border-neon-primary/20"
                            : "bg-gray-800 text-gray-600 border border-gray-700"
                        }`}
                      >
                        {game.status}
                      </span>
                      {game.enabled && (
                        <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">
                          Play →
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );

              return game.enabled ? (
                <Link href={`/game/${game.id}`} key={game.id}>
                  {cardContent}
                </Link>
              ) : (
                <div key={game.id}>{cardContent}</div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Nabil's Games Section */}
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full">
          <div className="flex items-center gap-3 mb-8 md:mb-10">
            <User className="w-8 h-8 text-neon-secondary" />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-secondary to-white">
              Nabil's Games
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {nabilGames.map((game) => {
              const IconComponent = game.icon;

              const cardContent = (
                <Card
                  className={`border-white/10 backdrop-blur-sm transition-all duration-300 h-full ${
                    game.enabled
                      ? "bg-black/60 hover:border-neon-secondary/50 cursor-pointer hover:scale-[1.02] group"
                      : "bg-black/30 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <IconComponent
                          className={`w-8 h-8 ${
                            game.enabled
                              ? "text-neon-secondary group-hover:scale-110"
                              : "text-gray-600"
                          } transition-transform`}
                        />
                        <CardTitle className="text-xl">{game.title}</CardTitle>
                      </div>
                      {game.enabled ? (
                        <Play className="w-6 h-6 text-white/40 group-hover:text-white group-hover:scale-110 transition-all" />
                      ) : (
                        <Lock className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <CardDescription className="text-sm">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          game.enabled
                            ? "bg-neon-secondary/10 text-neon-secondary border border-neon-secondary/20"
                            : "bg-gray-800 text-gray-600 border border-gray-700"
                        }`}
                      >
                        {game.status}
                      </span>
                      {game.enabled && (
                        <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">
                          Play →
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );

              return game.enabled ? (
                <Link href={`/game/${game.id}`} key={game.id}>
                  {cardContent}
                </Link>
              ) : (
                <div key={game.id}>{cardContent}</div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dev Notes Section */}
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full">
          <Card className="border-white/10 bg-black/60 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              🛠️ Developer Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-center">
              <p className="text-muted-foreground">
                Each game page is a separate Next.js route under{" "}
                <code className="bg-white/10 px-2 py-1 rounded">
                  /game/[gameId]
                </code>
              </p>
              <p className="text-muted-foreground">
                Feel free to experiment with HTML5 Canvas, Three.js, Phaser, or
                any game framework you want to try!
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <span className="text-xs px-3 py-1 rounded-full bg-neon-primary/10 text-neon-primary border border-neon-primary/20">
                  Next.js 15
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-neon-secondary/10 text-neon-secondary border border-neon-secondary/20">
                  TypeScript
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-neon-accent/10 text-neon-accent border border-neon-accent/20">
                  React
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </main>
  );
}
