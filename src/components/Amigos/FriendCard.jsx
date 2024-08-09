import { Button, Image } from "@nextui-org/react";
import React from "react";
import { CardContent } from "../Card";

const FriendCard = ({ image, name, mutualFriends, onConfirm, viewProfile, user }) => {
  console.log("🚀 ~ FriendCard ~ viewProfile:", user)
  return (
    <CardContent className="m-0 p-0 rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={image}
          alt={name}
          className="w-screen h-48 object-cover rounded-none"
        />
      </div>
      <div className="p-4 ">
        <h3 className="text-white font-bold text-md line-clamp-1">{name}</h3>
        <div className="flex justify-end mt-4">
          <Button size="sm" color="default" onClick={() => viewProfile(user.id)}>
            Ver Perfil
          </Button>
        </div>
      </div>
    </CardContent>
  );
};

export default FriendCard;
