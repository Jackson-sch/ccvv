import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
  Input,
} from "@nextui-org/react";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import { SearchIcon } from "lucide-react";

export default function ListTable({ data, handleDelete }) {
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const pages = Math.ceil(data.length / rowsPerPage);

  const filteredData = useMemo(() => {
    let filtered = [...data];
    if (filterValue) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filtered;
  }, [data, filterValue]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  }, [page, filteredData, rowsPerPage]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    setFilterValue(value);
    setPage(1);
  }, []);

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
  }, [handleDelete]);

  const topContent = useMemo(() => (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[44%]",
            inputWrapper: "border-1",
          }}
          placeholder="Search by description..."
          size="sm"
          startContent={
            <SearchIcon
              size={18}
              strokeWidth={1}
              className="text-default-300"
            />
          }
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {data.length} registros
        </span>
        <label className="flex items-center text-default-400 text-small">
          Filas por página:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  ), [data.length, filterValue, onRowsPerPageChange, onSearchChange]);

  return (
    <Table
      isStriped
      aria-label="Turno"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      topContent={topContent}
    >
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
      <TableBody emptyContent={"No data found"} items={items}>
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
  { name: "DESCRIPCION", uid: "name", sortable: true },
  { name: "ACCIONES", uid: "actions", sortable: false },
];

export { columns };
