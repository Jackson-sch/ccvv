"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import ImageUploader from "@/components/ui/dashboard/ImageUploader";

export default function Formulario({
  handleFormSubmit,
  formData,
  handleInputChange,
  handleResetForm,
}) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

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
              defaultValue={formData.placa}
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
              name="modelo"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Modelo"
                  className="w-full"
                  onChange={handleInputChange}
                >
                  {Modelo.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
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
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Gravedad"
                  className="w-full"
                  onChange={handleInputChange}
                >
                  {Prioridad.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
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
          <ImageUploader onImageUpload={handleImageUpload} />
          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="Imagen"
                value={imageURL}
                onChange={handleInputChange}
                className=""
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

const Prioridad = [
  { value: "Leve", label: "Leve" },
  { value: "Media", label: "Media" },
  { value: "Alta", label: "Alta" },
];

const Modelo = [
  { value: "toyota", label: "Toyota" },
  { value: "honda", label: "Honda" },
  { value: "ford", label: "Ford" },
  { value: "chevrolet", label: "Chevrolet" },
  { value: "volkswagen", label: "Volkswagen" },
  // ... add more items here
  { value: "audi", label: "Audi" },
  { value: "bmw", label: "BMW" },
  { value: "mercedes-benz", label: "Mercedes-Benz" },
  { value: "nissan", label: "Nissan" },
  { value: "subaru", label: "Subaru" },
  { value: "mazda", label: "Mazda" },
  { value: "hyundai", label: "Hyundai" },
  { value: "kia", label: "Kia" },
  { value: "volvo", label: "Volvo" },
  { value: "jaguar", label: "Jaguar" },
  { value: "land-rover", label: "Land Rover" },
  { value: "porsche", label: "Porsche" },
  { value: "tesla", label: "Tesla" },
  { value: "lexus", label: "Lexus" },
  { value: "maserati", label: "Maserati" },
];
