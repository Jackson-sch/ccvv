import React from "react";
import { CardContent } from "@/components/Card";
import { Button, Divider, Image, ScrollShadow } from "@nextui-org/react";
import { MessageCircle, ThumbsUp } from "lucide-react";

export default function Posts({ data }) {
  return (
    <ScrollShadow hideScrollBar className="w-full">
      <CardContent className="flex justify-center px-20 py-9">
        {data.map((post) => (
          <div key={post._id}>
            <div className="flex items-center mb-3">
              <Image
                src={post.imageUrl}
                alt="Mathew Anderson"
                className="w-10 h-10 rounded-full mr-3"
              />
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
