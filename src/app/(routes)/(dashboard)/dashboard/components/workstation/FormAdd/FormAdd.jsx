import { Button, Input, Select, SelectItem } from "@nextui-org/react";
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
                label="Nombre"
                isInvalid={errors.name}
                errorMessage="Este campo es requerido"
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="hostname"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                label="Hostname"
                isInvalid={errors.hostname}
                errorMessage="Este campo es requerido"
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="ip"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                label="Ip"
                isInvalid={errors.ip}
                errorMessage="Este campo es requerido"
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="status"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select {...field} label="Status" className="w-full">
                {Gravedads.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
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

const Gravedads = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];
