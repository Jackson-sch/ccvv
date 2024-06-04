import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { CardContent } from "../Card";
import PageTitle from "../PageTitle";
import Link from "next/link";

export default function Formulario({
  onSubmit,
  editingClasificacion,
  isEditing,
}) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: editingClasificacion,
  });

  useEffect(() => {
    reset(editingClasificacion);
  }, [editingClasificacion, reset]);

  return (
    <CardContent className="w-full lg:w-1/2 m-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full m-auto p-8"
      >
        <PageTitle
          className={"mb-10"}
          title={isEditing ? "Editar Clasificación" : "Nueva Clasificación"}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Controller
              name="descripcion"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Descripción"
                  isInvalid={errors.name}
                  errorMessage="Este campo es requerido"
                />
              )}
            />
          </div>
          <div className="flex justify-end items-center gap-4">
            <Link href="/dashboard/clasificacion">
              <Button
                color="danger"
                size="lg"
                variant="shadow"
                onClick={() => reset()}
              >
                Cancelar
              </Button>
            </Link>
            <Button type="submit" color="secondary" size="lg" variant="shadow">
              {isEditing ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </div>
      </form>
    </CardContent>
  );
}
