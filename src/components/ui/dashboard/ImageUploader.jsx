import { Input, Image, Button } from "@nextui-org/react";
import { CloudUpload, Trash } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageUploader({ onImageUpload }) {
  const [selectedImage, setSelectedImage] = useState(null);

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

        // Enviar la URL de la imagen al componente padre
        onImageUpload(imageUrl);

        // Establecer la URL de la imagen seleccionada
        setSelectedImage(URL.createObjectURL(acceptedFiles[0]));
      } catch (error) {
        console.error("Error subiendo la imagen:", error);
      }
    },
    [onImageUpload]
  );

  const handleRemoveImage = () => {
    setSelectedImage(null);
    // Notificar al componente padre que la imagen ha sido eliminada
    onImageUpload(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="bg-gradient-to-t from-transparent to-default-100 shadow-md rounded-xl px-8 pt-6 pb-8 mb-6 flex w-full items-center justify-center"
      {...getRootProps()}
    >
      <div>
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <CloudUpload />
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Deje caer los archivos aquí ...</p>
          ) : (
            <>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Haga clic para cargar</span> o
                arrastre la imagen aquí
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 2560x1440px)
              </p>
            </>
          )}

          {selectedImage && (
            <div className="mt-4">
              <Image
                isBlurred
                width={200}
                src={selectedImage}
                alt="Imagen seleccionada"
              />
              <Button
                size="sm"
                isIconOnly
                variant="flat"
                color="danger"
                onClick={handleRemoveImage}
                className="mt-4 translate-x-1 -translate-y-12 z-50"
              >
                <Trash />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
