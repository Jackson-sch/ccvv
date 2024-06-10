"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";

export default function Formulario({
  handleFormSubmit,
  formData,
  handleInputChange,
  handleResetForm,
  clasificacion,
  ocurrencia,
}) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  // Estado para filtrar las ocurrencias por clasificación
  const [clasificacionSeleccionada, setClasificacionSeleccionada] = useState(
    formData.clasificacion
  );
  // Estado para almacenar las ocurrencias filtradas
  const [ocurrenciasFiltradas, setOcurrenciasFiltradas] = useState([]);

  // Filtrar las ocurrencias por clasificación
  useEffect(() => {
    
    const nuevasOcurrencias = ocurrencia
      .filter(
        (ocurrencia) => ocurrencia.clasificacion === clasificacionSeleccionada
      )
      .sort((a, b) => a.descripcion.localeCompare(b.descripcion));
    setOcurrenciasFiltradas(nuevasOcurrencias);
  }, [clasificacionSeleccionada]);

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
        className="flex flex-col w-full m-auto gap-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Controller
              name="fecha"
              control={control}
              defaultValue={formData.turno}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Fecha"
                  type="date"
                  onChange={(event) => {
                    field.onChange(event);
                    handleInputChange(event);
                  }}
                  isInvalid={Boolean(errors.fecha)}
                  errorMessage={errors.fecha && "La fecha es requerida"}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="hora"
              control={control}
              defaultValue={formData.hora}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Hora"
                  type="time"
                  step="2"
                  isInvalid={errors.hora}
                  onChange={handleInputChange}
                  errorMessage={errors.hora && "La hora es requerida"}
                />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Controller
              name="turno"
              control={control}
              defaultValue={formData.turno}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Turno"
                  className="w-full"
                  onChange={handleInputChange}
                >
                  {Turno.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
          <div>
            <Controller
              name="camara"
              control={control}
              defaultValue={formData.camara}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="N° de Cámara"
                  labelPlacement="inside"
                  className="max-w-xs"
                  onChange={handleInputChange}
                >
                  {NumeroCam.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
          <div>
            <Controller
              name="operador"
              control={control}
              defaultValue={formData.operador}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Operador"
                  className="w-full"
                  onChange={handleInputChange}
                >
                  {Operadores.map((item) => (
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
              name="nombres_apellidos"
              control={control}
              defaultValue={formData.nombres_apellidos}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Nombres y Apellidos"
                  onChange={handleInputChange}
                  isInvalid={errors.nombres_apellidos}
                  errorMessage={
                    errors.nombres_apellidos &&
                    "Los nombres y Apellidos son Requeridos"
                  }
                />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <Controller
              name="clasificacion"
              control={control}
              defaultValue={formData.clasificacion}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Clasificación"
                  className="w-full"
                  onChange={(e) => {
                    handleInputChange(e);
                    setClasificacionSeleccionada(e.target.value);
                  }}
                >
                  {clasificacion.map((item) => (
                    <SelectItem key={item.descripcion || item._id} value={item.descripcion}>
                      {item.descripcion}
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
              name="ocurrencia"
              control={control}
              defaultValue={formData.ocurrencia}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Ocurrencia"
                  className="w-full"
                  onChange={handleInputChange}
                >
                  {ocurrenciasFiltradas.map((item) => (
                    <SelectItem key={item.descripcion || item._id} value={item.descripcion}>
                      {item.descripcion}
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
              name="comisaria"
              control={control}
              defaultValue={formData.comisaria}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Comisaría"
                  className="w-full"
                  onChange={handleInputChange}
                >
                  {Comisarias.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
          <div>
            <Controller
              name="sector_mapa"
              control={control}
              defaultValue={formData.sector_mapa}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Sector"
                  placeholder="Ejemplo: 3/4"
                  onChange={handleInputChange}
                />
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  errorMessage={errors.latitud && "La dirección es requerida"}
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
                  onChange={handleInputChange}
                  errorMessage={errors.longitud && "La longitud es requerida"}
                />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Controller
              name="zona"
              control={control}
              defaultValue={formData.zona}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Zona"
                  className="w-full"
                  onChange={handleInputChange}
                >
                  {Zonas.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
          <div>
            <Controller
              name="detalles"
              control={control}
              defaultValue={formData.detalles}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Detalles Relevantes"
                  placeholder="Ejemplo: Blanco - T5A532"
                  onChange={handleInputChange}
                />
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <Controller
              name="observaciones"
              control={control}
              defaultValue={formData.observaciones}
              render={({ field }) => (
                <Textarea
                  {...field}
                  type="text"
                  label="Observaciones"
                  placeholder="Observaciones"
                  onChange={handleInputChange}
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

const NumeroCam = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "22", label: "22" },
  { value: "23", label: "23" },
  { value: "24", label: "24" },
  { value: "25", label: "25" },
  { value: "26", label: "26" },
  { value: "27", label: "27" },
  { value: "28", label: "28" },
  { value: "29", label: "29" },
  { value: "30", label: "30" },
  { value: "31", label: "31" },
  { value: "32", label: "32" },
  { value: "33", label: "33" },
  { value: "34", label: "34" },
  { value: "35", label: "35" },
  { value: "36", label: "36" },
  { value: "37", label: "37" },
  { value: "38", label: "38" },
  { value: "39", label: "39" },
  { value: "40", label: "40" },
  { value: "41", label: "41" },
  { value: "42", label: "42" },
  { value: "43", label: "43" },
  { value: "44", label: "44" },
  { value: "45", label: "45" },
  { value: "46", label: "46" },
  { value: "47", label: "47" },
  { value: "48", label: "48" },
  { value: "49", label: "49" },
  { value: "50", label: "50" },
  { value: "51", label: "51" },
  { value: "52", label: "52" },
  { value: "53", label: "53" },
  { value: "54", label: "54" },
  { value: "55", label: "55" },
  { value: "56", label: "56" },
  { value: "57", label: "57" },
  { value: "58", label: "58" },
  { value: "59", label: "59" },
  { value: "60", label: "60" },
  { value: "61", label: "61" },
  { value: "62", label: "62" },
  { value: "63", label: "63" },
  { value: "64", label: "64" },
  { value: "65", label: "65" },
  { value: "66", label: "66" },
  { value: "67", label: "67" },
  { value: "68", label: "68" },
  { value: "69", label: "69" },
  { value: "70", label: "70" },
  { value: "71", label: "71" },
  { value: "72", label: "72" },
  { value: "73", label: "73" },
  { value: "74", label: "74" },
  { value: "75", label: "75" },
  { value: "76", label: "76" },
  { value: "77", label: "77" },
  { value: "78", label: "78" },
  { value: "79", label: "79" },
  { value: "80", label: "80" },
];

const Operadores = [
  { value: "Omega01", label: "Omega01" },
  { value: "Omega02", label: "Omega02" },
  { value: "Omega03", label: "Omega03" },
  { value: "Omega04", label: "Omega04" },
  { value: "Omega05", label: "Omega05" },
  { value: "Omega06", label: "Omega06" },
  { value: "Omega07", label: "Omega07" },
  { value: "Omega08", label: "Omega08" },
  { value: "Omega09", label: "Omega09" },
  { value: "Omega10", label: "Omega10" },
  { value: "Omega11", label: "Omega11" },
  { value: "Omega12", label: "Omega12" },
];

const Comisarias = [
  { value: "Nicolas Alcazar", label: "Nicolas Alcazar" },
  { value: "Sanchez Carrion", label: "Sanchez Carrion" },
];

const Turno = [
  { value: "Mañana", label: "Mañana" },
  { value: "Tarde", label: "Tarde" },
  { value: "Noche", label: "Noche" },
];

const Zonas = [
  { value: "El Porvenir Central", label: "El Porvenir Central" },
  { value: "Mampuesto", label: "Mampuesto" },
  { value: "La Merced", label: "La Merced" },
  { value: "Rio Seco I", label: "Rio Seco I" },
  { value: "Rio Seco II", label: "Rio Seco II" },
  { value: "Rio Seco III", label: "Rio Seco III" },
  { value: "Rio Seco IV", label: "Rio Seco IV" },
  { value: "Rio Seco V", label: "Rio Seco V" },
  { value: "Miguel Grau", label: "Miguel Grau" },
  { value: "Alan Garcia", label: "Alan Garcia" },
];
