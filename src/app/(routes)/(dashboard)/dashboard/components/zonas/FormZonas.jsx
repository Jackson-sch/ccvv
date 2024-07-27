import { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export default function FormZonas({ onSubmit, coordinates, handleCancel }) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    /* defaultValues: editingZona, */
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <CardContent className="w-full lg:w-1/2 m-auto mb-4">
      <PageTitle title="Nueva Zona" />
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col w-full m-auto p-3"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Nombre"
                  isInvalid={errors.name}
                  errorMessage="Este campo es requerido"
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="color"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="color"
                  {...field}
                  label="Color"
                  isInvalid={!!errors.color}
                  errorMessage={errors.color ? "Este campo es requerido" : ""}
                />
              )}
            />
          </div>
        </div>
        <div className="flex justify-end items-center gap-4">
          <Button type="submit" color="success" size="sm" variant="shadow">
            Guardar
          </Button>
          <Button
            color="danger"
            size="sm"
            variant="shadow"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </CardContent>
  );
}
