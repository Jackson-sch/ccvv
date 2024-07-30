import React, { useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import ButtonDelete from "../ButtonDelete/ButtonDelete";

export default function ListTable({ data, handleDelete }) {
  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "name":
        return <p className="capitalize">{cellValue}</p>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2 justify-end">
            <ButtonDelete id={item._id} handleDelete={handleDelete} />
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
      <TableBody emptyContent={"No data found"} items={data}>
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
  { name: "DESCRIPCION", uid: "name", sortable: true },
  { name: "ACCIONES", uid: "actions", sortable: false },
];

export { columns };
