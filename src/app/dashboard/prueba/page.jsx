'use client';
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Select, SelectItem, DatePicker, TimeInput } from "@nextui-org/react";
import { format } from "@formkit/tempo";
import { formInitialData } from "@/components/incidencia/data";

export default function Page() {
  const [formData, setFormData] = useState(formInitialData);
  const { handleSubmit, control, formState: { errors } } = useForm();

 const fecha = format(new Date(), "short");
 const hora = format(new Date(), "time");
  console.log("🚀 ~ Page ~ fecha:", fecha)
  // Maneja el cambio de los inputs del formulario
  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
     ...prevFormData,
      [name]: value,
    }));

    // Actualiza el estado global de fecha y hora basado en el input cambiado
    if (name === "fecha") {
      setFecha(value);
    } else if (name === "hora") {
      setHora(value);
    }
  };

  // Manejar el envío del formulario
  const handleFormSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    // Asumiendo que onSubmit es una prop o una función definida en otro lugar
    // onSubmit(data);
    setFormData(formInitialData); // Reinicia el formulario después de enviar
  };

  return (
    <div>
      <h1>Prueba</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Controller
              name="fecha"
              control={control}
              defaultValue={fecha || formData.fecha}
              render={({ field }) => (
                <Input
                  {...field}
                  type="date"
                  label="Fecha"
                  value={fecha}
                  onChange={handleInputChange}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="hora"
              control={control}
              defaultValue={hora || formData.hora}
              render={({ field }) => (
                <Input
                  {...field}
                  type="time"
                  label="Hora"
                  granularity="second"
                  value={field.value || hora}
                  onChange={handleInputChange}
                />
              )}
            />
          </div>
        </div>
        <Button auto type="submit">Enviar</Button>
      </form>
    </div>
  );
}
