import { Button, Input } from "@nextui-org/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export default function FormAdd({ onClose, onSubmit }) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Controller
            name="name"
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
        <div className="flex flex-col-1 items-center justify-end gap-4">
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button type="submit" color="primary" onPress={onClose}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
