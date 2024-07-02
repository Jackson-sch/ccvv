"use client";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart as BarGraph,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function BarChartTurno() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/incidencia")
      .then((res) => res.json())
      .then((data) => {
        // Procesa los datos para contar las ocurrencias por turno
        const occurrencesByTurn = data.reduce((acc, curr) => {
          const turno = curr.turno;
          if (!acc[turno]) {
            acc[turno] = { turno, cantidad: 0 };
          }
          acc[turno].cantidad += 1;
          return acc;
        }, {});

        // Convierte el objeto en un array
        const processedData = Object.values(occurrencesByTurn);
        setData(processedData);
      });
  }, []);

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <LineChart data={data}>
        <XAxis dataKey="turno" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#eee"strokeDasharray="5 5" />
        <Line type="monotone" dataKey="cantidad" stroke="#8884d8"  fill="#48e" />
        <Line type="monotone" dataKey="camara" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
