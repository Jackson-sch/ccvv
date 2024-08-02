import { Chip, User } from "@nextui-org/react";
import ActionsButtons from "@/components/TableUI/Actions";

/**
 * Arreglo que contiene las columnas de la tabla de usuarios.
 * Cada objeto en el arreglo representa una columna y tiene las siguientes propiedades:
 * - name: El nombre de la columna.
 * - uid: El identificador único de la columna.
 * - sortable: Indica si la columna es sortable (ordenable) o no.
 */
const columns = [
  { name: "ID", uid: "_id", sortable: true },
  { name: "NOMBRE DE CÁMARA", uid: "nombreCamara", sortable: true },
  { name: "DIRECCIÓN", uid: "direccion", sortable: true },
  { name: "LATITUD", uid: "latitud" },
  { name: "LONGITUD", uid: "longitud" },
  { name: "ESTADO", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

/**
 * Variedad de opciones de estado.
 *
 * @type {Array<{ name: string, uid: string }>}
 */
const statusOptions = [
  { name: "Active", uid: "Active" },
  { name: "Inactive", uid: "Inactive" },
  { name: "Unstable", uid: "Unstable" },
];

/**
 * Columnas visibles iniciales para la tabla.
 */
const INITIAL_VISIBLE_COLUMNS = [
  "nombreCamara",
  "direccion",
  "status",
  "actions",
];

/**
 * La URL para el tablero.
 * @type {string}
 */
const url = "/dashboard/admin/ubicacion";

/**
 * Array de campos que se pueden usar para buscar en la tabla.
 */
const searchFields = ["nombreCamara", "direccion", "status", "numeroCamara"];

/**
 * Objeto de configuración para representar columnas en una tabla.
 */
const columnConfig = {
  nombreCamara: {
    render: (item) => (
      <User
        avatarProps={{ radius: "lg", src: item.avatar }}
        description={item.numeroCamara}
        name={item.nombreCamara}
      >
        {item.numeroCamara}
      </User>
    ),
  },
  direccion: {
    render: (item) => (
      <div className="flex flex-col">
        <p className="text-bold text-small capitalize">{item.direccion}</p>
        <p className="text-bold text-tiny capitalize text-default-400">
          <span className="text-default-400">Latitud:</span> {item.latitud}{" "}
          <span className="text-default-400">Longitud:</span> {item.longitud}
        </p>
      </div>
    ),
  },
  status: {
    render: (item) => (
      <Chip
        className="capitalize"
        color={statusColorMap[item.status]}
        size="sm"
        variant="flat"
      >
        {item.status}
      </Chip>
    ),
  },
  actions: {
    render: (item, handleDelete) => (
      <ActionsButtons item={item} handleDelete={handleDelete} />
    ),
  },
};

// Mapear los colores de estado a los colores de NextUI
const statusColorMap = {
  Active: "success",
  Inactive: "danger",
  unstable: "warning",
};

// Manejar los datos iniciales del formulario
const formInitialData = {
  nombreCamara: "",
  numeroCamara: "",
  status: "",
  direccion: "",
  latitud: "",
  longitud: "",
};

// Exportar las constantes
export {
  columns,
  statusOptions,
  INITIAL_VISIBLE_COLUMNS,
  url,
  searchFields,
  columnConfig,
  formInitialData,
};
