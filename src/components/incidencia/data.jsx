import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
  User,
} from "@nextui-org/react";
import ActionsButtons from "../TableUI/Actions";
import { EyeIcon } from "lucide-react";
import ContentDetails from "./ContentDetailsModal";
import { Children } from "react";

/**
 * Arreglo que contiene las columnas de la tabla de usuarios.
 * Cada objeto en el arreglo representa una columna y tiene las siguientes propiedades:
 * - name: El nombre de la columna.
 * - uid: El identificador único de la columna.
 * - sortable: Indica si la columna es sortable (ordenable) o no.
 */
const columns = [
  { name: "ID", uid: "_id" },
  { name: "OCURRENCIA", uid: "ocurrencia", sortable: true },
  { name: "N° CAMARA", uid: "camara", sortable: true },
  { name: "NOMBRES Y APELLIDOS", uid: "nombres_apellidos", sortable: true },
  { name: "FECHA", uid: "fecha", sortable: true },
  { name: "HORA", uid: "hora", sortable: true },
  { name: "TURNO", uid: "turno", sortable: true },
  { name: "CLASIFICACIÓN", uid: "clasificacion", sortable: true },
  { name: "DIRECCIÓN", uid: "direccion", sortable: true },
  { name: "LATITUD", uid: "latitud" },
  { name: "LONGITUD", uid: "longitud" },
  { name: "ZONA", uid: "zona" },
  { name: "COMISARÍA", uid: "comisaria" },
  { name: "SECTOR MAPA", uid: "sector_mapa" },
  { name: "DETALLES", uid: "detalles" },
  { name: "OBSERVACIONES", uid: "observaciones", sortable: true },
  { name: "GRAVEDAD", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

/**
 * Variedad de opciones de estado.
 *
 * @type {Array<{ name: string, uid: string }>}
 */
const statusOptions = [
  { name: "Leve", uid: "Leve" },
  { name: "Alta", uid: "Alta" },
];

/**
 * Columnas visibles iniciales para la tabla.
 */
const INITIAL_VISIBLE_COLUMNS = [
  "nombres_apellidos",
  "ocurrencia",
  "camara",
  "direccion",
  "observaciones",
  "status",
  "actions",
];

/**
 * La URL para el tablero.
 * @type {string}
 */
const url = "/dashboard/ubicacion";

/**
 * Array de campos que se pueden usar para buscar en la tabla.
 */
const searchFields = [
  "ocurrencia",
  "direccion",
  "status",
  "camara",
  "nombres_apellidos",
  "fecha",
  "hora",
  "turno",
  "clasificacion",
];

/**
 * Objeto de configuración para representar columnas en una tabla.
 */
const columnConfig = {
  ocurrencia: {
    render: (item) => (
      <User
        avatarProps={{ radius: "lg", src: item.imageUrl }}
        description={item.clasificacion}
        name={item.ocurrencia}
      >
        {item.clasificacion}
      </User>
    ),
  },
  camara: {
    render: (item) => (
      <div className="flex flex-col">
        <p className="text-bold text-small capitalize">Cámara {item.camara}</p>
        <div className="flex flex-col">
          <p className="text-bold text-tiny capitalize text-default-400">
            {item.fecha}
          </p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {item.hora}
          </p>
        </div>
      </div>
    ),
  },
  /* fecha: {
    render: (item) => (
      <div className="flex flex-col">
        <p className="text-bold text-small capitalize">{item.fecha}</p>
        <p className="text-bold text-tiny capitalize text-default-400">
          {item.hora}
        </p>
      </div>
    ),
  }, */
  nombres_apellidos: {
    render: (item) => (
      <div className="flex flex-col">
        <p className="text-bold text-small capitalize">
          {item.nombres_apellidos}
        </p>
        <p className="text-bold text-tiny capitalize text-default-400">
          {item.operador}
        </p>
      </div>
    ),
  },
  direccion: {
    render: (item) => (
      <div className="flex flex-col">
        <p className="text-bold text-small capitalize line-clamp-1">
          {item.direccion.split(",")[0]}
        </p>
        {/* <p className="text-bold text-tiny capitalize text-default-400 flex gap-2 justify-between">
          <span className="text-default-400 text-xs">Latitud:</span>{" "}
          {item.latitud}{" "}
          <span className="text-default-400 text-xs">Longitud:</span>{" "}
          {item.longitud}
        </p> */}
        <p className="text-bold text-tiny capitalize text-default-400">
          {item.zona}
        </p>
      </div>
    ),
  },
  observaciones: {
    render: (item) => (
      <div className="flex flex-col w-64">
        <p className="text-bold text-small capitalize line-clamp-1">
          {item.observaciones}
        </p>
        <p className="text-bold text-tiny capitalize text-default-400">
          {item.detalles}
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
      <div className="relative flex items-center gap-2">
        <ModalView item={item} />
        <ActionsButtons item={item} handleDelete={handleDelete} />
      </div>
    ),
  },
};

// Mapear los colores de estado a los colores de NextUI
const statusColorMap = {
  Leve: "success",
  Alta: "warning",
};

// Manejar los datos iniciales del formulario
const formInitialData = {
  fecha: "",
  turno: "",
  nombres_apellidos: "",
  clasificacion: "",
  ocurrencia: "",
  operador: "",
  hora: "",
  camara: "",
  direccion: "",
  latitud: "",
  longitud: "",
  zona: "",
  comisaria: "",
  sector_mapa: "",
  detalles: "",
  observaciones: "",
  imageUrl: "",
  status: "",
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

// Función modal View
export function ModalView({ item }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip content="Details">
        <Button onPress={onOpen} isIconOnly className="bg-transparent">
          <EyeIcon className="w-4 h-4 text-orange-400" />
        </Button>
      </Tooltip>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        className="bg-default-50"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b border-default-300">
                Detalles de la Ocurrencia
              </ModalHeader>
              <ModalBody>
                <ContentDetails item={item}>{Children}</ContentDetails>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
