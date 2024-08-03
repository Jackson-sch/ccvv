
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
export default function PieChartIncidenciasRelevantes() {
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


const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


