import { capitalize } from "@/utils/utils";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { ChevronDown, Plus, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function TopContent({
  data,
  title,
  filterValue,
  onClear,
  onSearchChange,
  statusFilter,
  setStatusFilter,
  visibleColumns,
  setVisibleColumns,
  onRowsPerPageChange,
  columns,
  statusOptions,
  url,
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search "
          startContent={
            <Search className="text-small text-default-500" size={18} />
          }
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={
                  <ChevronDown className="text-default-500" size={18} />
                }
                variant="flat"
              >
                Estado
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid}>
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={
                  <ChevronDown className="text-default-500" size={18} />
                }
                variant="flat"
              >
                Columnas
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid}>
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {url && (
            <Link href={`${url}add`}>
              <Button color="primary" endContent={<Plus size={18} />}>
                Agregar nuevo
              </Button>
            </Link>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {data.length} {title}
        </span>
        <label className="flex items-center text-default-400 text-small">
          Filas por página:
          <select
            className="bg-transparent outline-none text-default-400 text-small border-none ml-2"
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
        </label>
      </div>
    </div>
  );
}
