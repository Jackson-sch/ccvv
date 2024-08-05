import React from "react";
import { CardContent } from "@/components/Card";
import { Avatar, Button, Divider, Image, ScrollShadow } from "@nextui-org/react";
import { MessageCircle, ThumbsUp } from "lucide-react";
import CardSkeleton from "@/components/CardSkeleton/CardSkeleton";

export default function Posts({ data, dataUser }) {
  const image = dataUser?.imageUrl

  // si data es vacio, no hay posts carga este Skeleton
  if (!data || data.length === 0) {
    return <CardSkeleton />;
  }

  return (
    <ScrollShadow hideScrollBar className="w-full">
      <CardContent className="flex justify-center px-20 py-9">
        {data.map((post) => (
          <div key={post._id}>
            <div className="flex items-center mb-6 gap-2">
              <Avatar src={image} size="md" name={post.nombres_apellidos} />
              <div>
                <h3 className="font-semibold">{post.nombres_apellidos}</h3>
                <p className="text-xs text-gray-400">
                  Publicado {post.fecha} {post.hora}
                </p>
              </div>
            </div>

            <p className="mb-4 text-sm">{post.observaciones}</p>

            <Image
              isBlurred
              src={post.imageUrl}
              alt={post.observaciones}
              width={800}
              height={400}
            />

            <div className="flex gap-4 items-center my-6">
              <Button variant="light">
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
