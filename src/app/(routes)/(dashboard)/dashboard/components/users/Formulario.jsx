"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { CardContent } from "@/components/Card";
import { Eye, EyeOff } from "lucide-react";
import { initialUserData } from "@/utils/initialUserData";
import Link from "next/link";

export default function Formulario({ onSubmit, editingUser, isEditing }) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: editingUser,
  });
  const [isVisible, setIsInvisible] = useState(false);

  const toggleVisibility = () => {
    setIsInvisible(!isVisible);
  };

  useEffect(() => {
    reset(editingUser);
  }, [editingUser, reset]);

  return (
    <CardContent>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full m-auto p-8"
      >
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Editar" : "Agregar"} usuario
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Nombres y Apellidos"
                  isInvalid={errors.name}
                  errorMessage="Este campo es requerido"
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Usuario"
                  isInvalid={errors.username}
                  errorMessage="Este campo es requerido"
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  label="Correo electrónico"
                  isInvalid={errors.email}
                  errorMessage={
                    errors.email
                      ? errors.email.type === "pattern"
                        ? "Ingresa un correo electrónico valido"
                        : "Este campo es requerido"
                      : ""
                  }
                />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Contraseña"
                  type={isVisible ? "text" : "password"}
                  isInvalid={errors.password}
                  errorMessage="Este campo es requerido"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <Eye className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} label="Dirección" />}
            />
          </div>
          <div>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} label="Teléfono" type="number" />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Controller
              name="rol"
              control={control}
              defaultValue={editingUser ? editingUser.rol : ""}
              render={({ field }) => (
                <Select
                  {...field}
                  selectedKeys={[field.value]}
                  label="Rol"
                  className="w-full"
                >
                  {role.map((rol) => (
                    <SelectItem key={rol.value} value={rol.value}>
                      {rol.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
          <div>
            <Controller
              name="status"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  selectedKeys={[field.value]}
                  label="Estado"
                  className="w-full"
                >
                  {status.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end mt-8 gap-4">
          <Link href="/dashboard/users">
            <Button
              onClick={() => {
                reset(initialUserData);
              }}
              variant="shadow"
              color="danger"
            >
              Cancelar
            </Button>
          </Link>
          <Button type="submit" variant="shadow" color="primary">
            {isEditing ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </CardContent>
  );
}

// Asume que tienes un array de roles y estados para el Select
const role = [
  { value: "administrador", label: "Administrador" },
  { value: "usuario", label: "Usuario" },
  { value: "invitado", label: "Invitado" },
  { value: "operador", label: "Operador" },
];

const status = [
  { value: "active", label: "Activo" },
  { value: "inactive", label: "Inactivo" },
  { value: "blocked", label: "Bloqueado" },
  { value: "pending", label: "Pendiente" },
];
