import { CardContent } from "@/components/Card";
import React from "react";
import RandomTextDisplay from "../ui/RandomTextDisplay/RandomTextDisplay";

export default function Hero({ data }) {
  const name = data?.firstName + " " + data?.lastName;
  const email = data?.emailAddresses[0].emailAddress;
  const image = data?.imageUrl;
  return (
    <CardContent className="flex items-center">
        <div className="flex flex-col">
          <h1 className="text-5xl  font-bold mb-2">
            Bienvenido, {data?.firstName}!
          </h1>
          <RandomTextDisplay texts={texts} />
        </div>

        <div className="flex space-x-8">
          <div className="flex flex-col justify-center items-center">
            <p className="text-default-300 text-sm uppercase">
              Incidencias de este mes
            </p>
            <p className="text-2xl font-bold">145</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-default-300 text-sm uppercase">
              Total de incidencias
            </p>
            <p className="text-2xl font-bold">1234</p>
          </div>
        </div>
    </CardContent>
  );
}

const texts = [
  "La seguridad es nuestra prioridad número uno.",
  "Siempre alerta y vigilante.",
  "La prevención es la mejor manera de evitar incidentes.",
  "La seguridad es un trabajo en equipo.",
  "Tu familia te espera en casa, trabaja seguro.",
  "La seguridad es responsabilidad de todos, no solo de unos pocos.",
  "No corras riesgos innecesarios, tu vida vale más.",
  "La seguridad es la clave para un ambiente laboral productivo.",
  "Cada acción segura te lleva a casa sin incidentes.",
  "La precaución es el mejor equipo de protección personal.",
];
