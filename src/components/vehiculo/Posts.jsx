import React from "react";
import { CardContent } from "@/components/Card";
import { Button, Divider, Image, ScrollShadow } from "@nextui-org/react";
import { MessageCircle, ThumbsUp } from "lucide-react";

export default function PostsVehiculos({ data }) {
  return (
    <ScrollShadow hideScrollBar className="w-full">
      <CardContent className="flex flex-col items-center px-4 py-9 md:px-20">
        {data.map((item) => (
          <div key={item._id}>
            <div className="flex items-center mb-3">
              <img
                src={item.imageUrl}
                alt="Mathew Anderson"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold uppercase text-lg md:text-xl">{item.placa}</p>
                <p className="text-xs text-gray-400 capitalize">
                  {item.marca} {item.color}
                </p>
              </div>
            </div>

            <p className="mb-4 text-sm capitalize text-pretty">
              {item.detalles}
            </p>

            <Image
              isBlurred
              src={item.imageUrl}
              alt={item.placa}
              width={800}
              height={400}
            />

            <div className="flex gap-4 items-center my-6">
              <Button variant="light" aria-label="Like">
                <ThumbsUp size={20} /> 34
              </Button>
              <Button variant="light" aria-label="Take a photo">
                <MessageCircle /> 34
              </Button>
            </div>

            <Divider className="my-6" />
          </div>
        ))}
      </CardContent>
    </ScrollShadow>
  );
}
