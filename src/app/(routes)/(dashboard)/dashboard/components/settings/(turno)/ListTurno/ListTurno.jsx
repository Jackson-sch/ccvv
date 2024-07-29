import React, { useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import ButtonDelete from "../../ButtonDelete/ButtonDelete";


export default function ListTurno({ turnos = [], handleDelete }) {

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "name":
        return cellValue;
      case "actions":
        return (
          <div className="relative flex items-center gap-2 justify-end">
            <ButtonDelete
              id={item._id}
              url="/api/turno"
              handleDelete={handleDelete}
            />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table isStriped aria-label="Turno">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No turnos found"} items={turnos}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

const columns = [
  /*   { name: "ID", uid: "id", sortable: true }, */
  { name: "NAME", uid: "name", sortable: true },
  { name: "Actions", uid: "actions", sortable: false },
];

export { columns };
