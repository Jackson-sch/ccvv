import { User } from "@nextui-org/react";
import ActionsButtons from "../TableUI/Actions";

const columns = [
  {
    uid: "_id",
    name: "ID",
    sortable: true,
  },
  {
    uid: "urlImagen",
    name: "Imagen",
    sortable: true,
  },
  {
    uid: "placa",
    name: "PLACA",
    sortable: true,
  },
  {
    uid: "color",
    name: "COLOR",
    sortable: true,
  },
  {
    uid: "actions",
    name: "ACCIONES",
  },
];

const INITIAL_VISIBLE_COLUMNS = ["placa", "urlImagen", "actions"];

const url = "/dashboard/ocurrencias/";

const searchFields = ["descripcion", "clasificacion"];

const columnConfig = {
  urlImagen: {
    render: (item) => (
      <User
        avatarProps={{ radius: "lg", src: item.urlImagen }}
        description={item.marca + " - " + item.color}
        name={item.placa}
        title={item.color}
      >
        {item.color}
      </User>
    ),
  },
  placa: {
    render: (item) => (
      <div className="flex flex-col">
        <p className="text-bold text-small uppercase">{item.placa}</p>
        <p className="text-bold text-tiny uppercase text-default-400">
        {item.marca} - {item.color}
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
      <ActionsButtons item={item} handleDelete={handleDelete} url={url} />
    ),
  },
};

const statusColorMap = {
  active: "success",
  inactive: "warning",
  blocked: "danger",
  pending: "secondary",
};

export { columns, INITIAL_VISIBLE_COLUMNS, url, searchFields, columnConfig };
