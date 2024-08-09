"use client";
import React, {  } from "react";
import { Boxes } from "../ui/BackgroundBoxes";
import { Image } from "@nextui-org/react";

export default function FriendProfile({ user }) {
  return (
    <div className="mx-auto container -mt-12 max-w-screen-lg ">
      {/* Cover Photo */}
      <div className="h-64 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-none">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
      </div>

      <div className="bg-transparent border border-default-50 shadow-md rounded-b-lg px-6 pb-4">
        <div className="flex items-end -mt-20 pb-4">
          <div className="relative">
            <Image
              isBlurred
              src={user.imageUrl}
              alt={user.name}
              className="w-40 h-40 rounded-full  z-20"
            />
          </div>

          {/* Name and Stats */}
          <div className="ml-6 flex-grow">
            <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
            <p className="text-foreground-500">{user.email}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Ver herramientas
            </button>
            <button className="bg-gray-200 text-black px-4 py-2 rounded-md">
              Editar
            </button>
          </div>
        </div>
        {/* Friend Thumbnails */}
        <div className="flex space-x-2 mt-4">
          {[...Array(8)].map((_, i) => (
            <img
              key={i}
              src={`https://api.dicebear.com/9.x/adventurer/svg?seed=Loki-${
                i + 1
              }.jpg`}
              alt={`Friend ${i + 1}`}
              className="w-10 h-10 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
