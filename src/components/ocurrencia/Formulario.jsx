"use client";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { CardContent } from "../Card";
import PageTitle from "../PageTitle";
import Link from "next/link";

export default function Formulario({
  onSubmit,
  editingOcurrencia,
  isEditing,
  clasificaciones,
}) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: editingOcurrencia,
  });

  useEffect(() => {
    reset(editingOcurrencia);
  }, [editingOcurrencia, reset]);

  return (
    <CardContent className="w-full lg:w-1/2 m-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full m-auto p-8"
      >
        <PageTitle
          className={"mb-10"}
          title={isEditing ? "Editar Ocurrencia" : "Nueva Ocurrencia"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Controller
              name="clasificacion"
              control={control}
              defaultValue={editingOcurrencia ? editingOcurrencia.clasificacion : ""}
              render={({ field }) => (
                <Select
                  {...field}
                  selectedKeys={[field.value]}
                  label="Clasificación"
                  className="w-full"
                >
                  {clasificaciones.map((item) => (
                    <SelectItem
                      key={item.descripcion}
                      value={item.descripcion}
                    >
                      {item.descripcion}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>

          <div>
            <Controller
              name="descripcion"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Descripción Ocurrencia"
                  isInvalid={errors.descripcion}
                  errorMessage="Este campo es requerido"
                />
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Link href="/dashboard/ocurrencias">
            <Button onClick={() => reset()} variant="shadow" color="danger">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" variant="shadow" color="secondary">
            {isEditing ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </CardContent>
  );
}
