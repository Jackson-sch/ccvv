import ActionsButtons from "../TableUI/Actions";

const columns = [
  {
    uid: "_id",
    name: "ID",
    sortable: true,
  },
  {
    uid: "descripcion",
    name: "DESCRIPCION",
    sortable: true,
  },
  {
    uid: "clasificacion",
    name: "CLASIFICACIÓN",
    sortable: true,
  },
  {
    uid: "actions",
    name: "ACCIONES",
  },
];

const INITIAL_VISIBLE_COLUMNS = ["descripcion", , "actions"];

const url = "/dashboard/ocurrencias/";

const searchFields = ["descripcion", "clasificacion"];

const columnConfig = {
  name: {
    render: (item) => (
      <User
        avatarProps={{ radius: "lg", src: item.avatar }}
        description={item.email}
        name={item.name}
      >
        {item.email}
      </User>
    ),
  },
  descripcion: {
    render: (item) => (
      <div className="flex flex-col">
        <p className="text-bold text-small capitalize">{item.descripcion}</p>
        <p className="text-bold text-tiny capitalize text-default-400">
          {item.clasificacion}
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
    render: (item, handleDelete) => <ActionsButtons item={item} handleDelete={handleDelete} url={url} />,
  },
};

const statusColorMap = {
  active: "success",
  inactive: "warning",
  blocked: "danger",
  pending: "secondary",
};


export { columns, INITIAL_VISIBLE_COLUMNS, url, searchFields, columnConfig };
