"use client";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

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

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const handleReset = () => {
    reset();
    handleResetForm();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col w-full m-auto gap-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Controller
              name="nombreCamara"
              control={control}
              defaultValue={formData.nombreCamara}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Nombre de Cámara"
                  isInvalid={errors.nombreCamara}
                  onChange={handleInputChange}
                  errorMessage={errors.nombreCamara && "El nombre es requerido"}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="numeroCamara"
              control={control}
              defaultValue={formData.numeroCamara}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Número de Cámaras"
                  isInvalid={errors.numeroCamara}
                  onChange={handleInputChange}
                  errorMessage={errors.numeroCamara && "El número es requerido"}
                />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <Controller
              name="status"
              control={control}
              defaultValue={formData.status}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Estado"
                  className="w-full"
                  onChange={handleInputChange}
                >
                  {status.map((item) => (
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
              name="direccion"
              control={control}
              defaultValue={formData.direccion}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Dirección"
                  isInvalid={errors.direccion}
                  errorMessage={errors.direccion && "La dirección es requerida"}
                />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Controller
              name="latitud"
              control={control}
              defaultValue={formData.latitud}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Latitud"
                  isInvalid={errors.latitud}
                  errorMessage={errors.latitud && "La latitud es requerida"}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="longitud"
              control={control}
              defaultValue={formData.longitud}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Longitud"
                  isInvalid={errors.longitud}
                  errorMessage={errors.longitud && "La longitud es requerida"}
                />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="shadow" color="danger" onClick={() => handleReset()}>
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


const status = [
  { value: "Active", label: "Activo" },
  { value: "Inactive", label: "Inactivo" },
  { value: "Unstable", label: "Inestable" },
];