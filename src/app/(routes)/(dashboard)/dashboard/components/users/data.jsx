import { Chip, User } from "@nextui-org/react";
import ActionsButtons from "@/components/TableUI/Actions";

/**
 * Arreglo que contiene las columnas de la tabla de usuarios.
 * Cada objeto en el arreglo representa una columna y tiene las siguientes propiedades:
 * - name: El nombre de la columna.
 * - uid: El identificador único de la columna.
 * - sortable: Indica si la columna es sortable (ordenable) o no.
 * 
 * @type {Array<Object>}
 */
const columns = [
  { name: "ID", uid: "_id", sortable: true },
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "IMAGE", uid: "imageUrl", sortable: true },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

/**
 * Variedad de opciones de estado para usuarios.
 *
 * @type {Array<{ name: string, uid: string }>}
 */
const statusOptions = [
  { name: "Verificado", uid: "verified" },
  { name: "Inactivo", uid: "inactive" },
  { name: "bloqueado", uid: "blocked" },
  { name: "pendiente", uid: "pending" },
];

/**
 * Columnas visibles iniciales para la tabla de usuarios.
 * @type {string[]}
 */
const INITIAL_VISIBLE_COLUMNS = ["name", "rol", "status", "actions"];

/**
 * La URL para el tablero de usuarios.
 * @type {string}
 */
const url = "/dashboard/admin/users/";

/**
 * Array de campos que se pueden usar para buscar usuarios.
 * @type {string[]}
 */
const searchFields = ["name", "email", "rol", "status"];

/**
 * Configuration object for rendering columns in a table.
 *
 * @typedef {Object} ColumnConfig
 * @property {Object} name - Configuration for the "name" column.
 * @property {Function} name.render - Function that renders the content for the "name" column.
 * @property {Object} rol - Configuration for the "rol" column.
 * @property {Function} rol.render - Function that renders the content for the "rol" column.
 * @property {Object} status - Configuration for the "status" column.
 * @property {Function} status.render - Function that renders the content for the "status" column.
 * @property {Object} actions - Configuration for the "actions" column.
 * @property {Function} actions.render - Function that renders the content for the "actions" column.
 */
const columnConfig = {
  name: {
    render: (item) => (
      <User
        avatarProps={{ radius: "lg", src: item.imageUrl }}
        description={item.email}
        name={item.name}
      >
        {item.email}
      </User>
    ),
  },
  rol: {
    render: (item) => (
      <div className="flex flex-col">
        <p className="text-bold text-small capitalize">{item.rol}</p>
        <p className="text-bold text-tiny capitalize text-default-400">
          {item.rol}
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
    render: (item, handleDelete) => <ActionsButtons item={item} handleDelete={handleDelete} />,
  },
};

const statusColorMap = {
  verified: "success",
  inactive: "warning",
  blocked: "danger",
  pending: "secondary",
};

export { columns, statusOptions, INITIAL_VISIBLE_COLUMNS, url, searchFields, columnConfig };
