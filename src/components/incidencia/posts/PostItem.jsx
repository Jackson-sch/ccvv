import React from "react";
import { Image, Button, Divider } from "@nextui-org/react";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { Container } from "@/components/Card";

export default function PostItem({ post, image }) {
  return (
    <div className="mt-6">
      <div className="flex flex-col-1 justify-between items-center mb-3">
        <div className="flex items-center">
          <Image
            src={image}
            alt={post.nombres_apellidos}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-semibold">{post.nombres_apellidos}</h3>
            <p className="text-xs text-gray-400">
              Publicado {post.fecha} {post.hora}
            </p>
          </div>
        </div>
        <div>
          <Container className="flex justify-center items-center p-3 rounded-full gap-1">
            <p className="text-xs text-default-500">Cámara:</p>
            <p className="text-xs text-default-800">{post.camara}</p>
          </Container>
        </div>
      </div>

      <p className="mb-4 text-sm">{post.observaciones}</p>

      <Image
        isBlurred
        src={post.imageUrl}
        alt={post.observaciones}
        height={400}
        className="w-full"
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
  );
}
