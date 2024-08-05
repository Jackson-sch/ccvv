"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import ImageUploader from "@/app/(routes)/(dashboard)/dashboard/components/dashboard/ImageUploader";

export default function Formulario({
  handleFormSubmit,
  formData,
  handleInputChange,
  handleResetForm,
  clasificacion,
  ocurrencia,
  zonas,
  numeroCamara,
  operadores,
  turno,
  comisarias,
  gravedades,
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
  const [imageURL, setImageURL] = useState("");


  const handleImageUpload = (url) => {
    setImageURL(url);
    // Actualiza el formData con la url de la imagen
    handleInputChange({ target: { name: "imageUrl", value: url } });
  };

  // Filtrar las ocurrencias por clasificación
  useEffect(() => {
    const nuevasOcurrencias = ocurrencia
      .filter(
        (ocurrencia) => ocurrencia.clasificacion === clasificacionSeleccionada
      )
      .sort((a, b) => a.descripcion.localeCompare(b.descripcion));
    setOcurrenciasFiltradas(nuevasOcurrencias);
  }, [clasificacionSeleccionada, ocurrencia]);

  // Resetear el formulario
  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const handleReset = () => {
    reset(formData);
    handleResetForm();
  };

  const zonasOrdenadas = zonas.sort((a, b) => a.name.localeCompare(b.name));
  const cameras = numeroCamara.sort((a, b) => {
    if (a.nombreCamara === "CN" && b.nombreCamara !== "CN") {
      return -1;
    } else if (a.nombreCamara !== "CN" && b.nombreCamara === "CN") {
      return 1;
    } else {
      return a.numeroCamara.localeCompare(b.numeroCamara);
    }
  });

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
              defaultValue={formData.fecha}
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
                  {turno.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
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
                  {cameras.map((item) => (
                    <SelectItem
                      key={item.numeroCamara}
                      value={item.numeroCamara}
                    >
                      {item.nombreCamara === "CN"
                        ? `CN_${item.numeroCamara}`
                        : item.numeroCamara}
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
                  {operadores.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
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
                  isInvalid={errors.nombres_apellidos}
                  onChange={handleInputChange}
                  errorMessage={
                    errors.nombres_apellidos &&
                    "Los nombres y Apellidos son Requeridos"
                  }
                  readOnly
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
                    <SelectItem
                      key={item.descripcion || item._id}
                      value={item.descripcion}
                    >
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
                    <SelectItem
                      key={item.descripcion || item._id}
                      value={item.descripcion}
                    >
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
                  {comisarias.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
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
                  readOnly
                />
              )}
            />
          </div>
        </div>
        <div className="grid-cols-1 md:grid-cols-2 gap-4 hidden">
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
                  {zonasOrdenadas.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
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
          <Controller
            name="status"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                label="Gravedad"
                className="w-full"
                onChange={handleInputChange}
              >
                {gravedades.map((item) => (
                  <SelectItem key={item.name} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
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
        <div className="grid grid-cols-1 gap-4">
          <ImageUploader onImageUpload={handleImageUpload} />
          <Controller
            name="imageUrl"
            control={control}
            defaultValue={formData.imageUrl}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                label="Imagen"
                value={imageURL}
                onChange={handleInputChange}
                className="hidden"
                readOnly
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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


