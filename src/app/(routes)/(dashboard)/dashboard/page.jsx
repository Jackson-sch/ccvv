"use client";
import { useEffect, useState } from "react";
import Card, { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import BarChartTurno from "@/components/incidencia/BarChartTurno";
import BarChart from "@/app/(routes)/(dashboard)/dashboard/components/dashboard/BarChart";
import SalesCard from "@/app/(routes)/(dashboard)/dashboard/components/dashboard/SalesCard";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Posts from "@/components/users/profile/Posts";
import PostsVehiculos from "@/components/vehiculo/Posts";

export default function page() {
  const [incidenciasRelevantes, setIncidenciasRelevantes] = useState([]);
  const [vehiculoReportado, setVehiculoReportado] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/incidencia");
      const data = await response.json();
      // Ordena los datos por fecha y hora. Asegúrate de ajustar 'fecha' y 'hora' a tus campos reales.
      const datosOrdenados = data.sort((a, b) => {
        const fechaHoraA = new Date(`${a.fecha}T${a.hora}`);
        const fechaHoraB = new Date(`${b.fecha}T${b.hora}`);
        return fechaHoraB - fechaHoraA; // Ordena de más reciente a más antiguo
      });
      // Toma los últimos 5 elementos después de ordenar
      const ultimosCincoRegistros = datosOrdenados.slice(0, 5);
      setIncidenciasRelevantes(ultimosCincoRegistros);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/vehiculo");
      const data = await response.json();
      const ultimosCinco = data.slice(0, 5);
      setVehiculoReportado(ultimosCinco);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full pb-4">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="text-sm">Total Revenue</p>
          <BarChart />
        </CardContent>
        <CardContent>
          <p className="text-sm">Incidencias por Turno</p>
          <BarChartTurno />
        </CardContent>
        <CardContent>
          <section>
            <p className="text-sm">Recent Sales</p>
            <p>You made 265 sales this month</p>
          </section>
          {userSalesData.map((d, index) => (
            <SalesCard key={index} d={d} />
          ))}
        </CardContent>
      </section>
      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <Posts data={incidenciasRelevantes} />

        <PostsVehiculos data={vehiculoReportado} />
      </section>
    </div>
  );
}

const cardData = [
  {
    label: "Total Revenue",
    amount: "$45,231.89",
    discription: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    label: "Subscriptions",
    amount: "+2350",
    discription: "+180.1% from last month",
    icon: Users,
  },
  {
    label: "Sales",
    amount: "+12,234",
    discription: "+19% from last month",
    icon: CreditCard,
  },
  {
    label: "Active Now",
    amount: "+573",
    discription: "+201 since last hour",
    icon: Activity,
  },
];

const userSalesData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    saleAmount: "+$1,999.00",
  },
  {
    name: "Jackson Lee",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$1,999.00",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$39.00",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    saleAmount: "+$299.00",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    saleAmount: "+$39.00",
  },
];
