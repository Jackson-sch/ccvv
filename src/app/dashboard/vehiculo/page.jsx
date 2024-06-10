'use client'
import React, { useEffect, useState } from "react";
import { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import TableUI from "@/components/TableUI/TableUI";
import { columns, INITIAL_VISIBLE_COLUMNS, searchFields, columnConfig, url } from "@/components/vehiculo/data";

export default function page() {
  const [vehiculosReportados, setVehiculosReportados] = useState([]);

  useEffect(() => {
    fetch("/api/vehiculo")
      .then((res) => res.json())
      .then((data) => setVehiculosReportados(data));
  }, []);

  const handleDelete = async (id) => {}

  return (
    <>
      <CardContent>
        <PageTitle title="Vehiculos Reportados" />
        <TableUI
        title="Vehiculos Reportados"
        data={vehiculosReportados}
        columns={columns}
        searchFields={searchFields}
        handleDelete={handleDelete}
        INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
        columnConfig={columnConfig}
        url={url}
      />
      </CardContent>
    </>
  );
}
