import { Input } from "@nextui-org/react";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageUploader({ onImageUpload }) {
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        const imageUrl = data.secure_url;

        //Enviar la url de la imagen al componente padre
        onImageUpload(imageUrl);
      } catch {
        console.error("Error subiendo la imagen");
      }
    },
    [onImageUpload]
  );
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });
  return (
    <div>
      <div
        className="bg-gradient-to-t from-transparent to-default-100 shadow-md rounded-xl px-8 pt-6 pb-8 mb-6 border-dashed border-2 border-default-300"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Deje caer los archivos aquí ...</p>
        ) : (
          <p>Arrastre las imágenes aquí, o haga clic para seleccionar</p>
        )}
      </div>

      {acceptedFiles[0] && (
        <Image
          isBlurred
          width={300}
          height={300}
          src={URL.createObjectURL(acceptedFiles[0])}
          alt=""
        />
      )}
    </div>
  );
}
