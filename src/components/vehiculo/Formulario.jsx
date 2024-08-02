"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import ImageUploader from "@/app/(routes)/(dashboard)/dashboard/components/dashboard/ImageUploader";

export default function Formulario({
  handleFormSubmit,
  formData,
  handleInputChange,
  handleResetForm,
  gravedades,
  marcas,
}) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  });

  const [imageURL, setImageURL] = useState("");
  
  const handleImageUpload = (url) => {
    setImageURL(url);
    // Actualiza el formData con la url de la imagen
    handleInputChange({ target: { name: "imageUrl", value: url } });
  };

  // Resetear el formulario
  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const handleReset = () => {
    reset(formData);
    handleResetForm();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col w-full m-auto gap-8 mt-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Controller
              name="placa"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="N° de Placa"
                  isInvalid={errors.placa}
                  onChange={handleInputChange}
                  errorMessage={errors.placa && "La placa es requerida"}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="marca"
              control={control}
              defaultValue={formData ? formData.marca : ""}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  selectedKeys={[field.value]}
                  label="Marca"
                  className="w-full"
                  onChange={handleInputChange}
                >
                  {marcas.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Controller
              name="color"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Color"
                  placeholder="Ejemplo: Blanco"
                  onChange={handleInputChange}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="prioridad"
              control={control}
              defaultValue={formData ? formData.prioridad : ""}
              render={({ field }) => (
                <Select
                  {...field}
                  selectedKeys={[field.value]}
                  label="Prioridad"
                  className="w-full"
                  onChange={handleInputChange}
                >
                  {gravedades.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <Controller
              name="detalles"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  type="text"
                  label="Detalles"
                  placeholder="Ejemplo: Golpe en la parte trasera del vehículo"
                  onChange={handleInputChange}
                />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <ImageUploader onImageUpload={handleImageUpload} imageURL={imageURL} />
          <Controller
            name="imageUrl"
            control={control}
            defaultValue={formData ? formData.imageUrl : ""}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="Imagen"
                onChange={handleInputChange}
                className="hidden"
                readOnly
              />
            )}
          />
        </div>

        <div className="flex gap-4 justify-end">
          <Button variant="shadow" color="danger" onClick={handleReset}>
            Cancelar
          </Button>
          <Button type="submit" variant="shadow" color="secondary">
            Guardar
          </Button>
        </div>
      </form>
    </>
  );
}

