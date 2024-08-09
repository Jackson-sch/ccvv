"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import FriendCard from "./FriendCard";

export default function FriendsList({ friends, users }) {
  const router = useRouter();

  const viewProfile = (id) => {
    router.push(`/dashboard/amigos/${id}`);
  };

  return (
    <div>
      <h2>Mis Amigos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
        {users.map((user, index) => (
          <FriendCard key={index} user={user} image={user.imageUrl} name={user.name} viewProfile={() => viewProfile(user._id)} />
        ))}
      </div>
    </div>
  );
}
