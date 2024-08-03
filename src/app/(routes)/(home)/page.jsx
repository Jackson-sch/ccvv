import { NavbarHome } from "@/components/NavbarHome/NavbarHome";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import React from "react";

export default function page() {
  return (
    <div>
      <NavbarHome />
      <div className="h-screen w-full rounded-md bg-transparent relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-3xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Bienvenidos a Webby
          </h1>
          <p></p>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            En Webby, nos dedicamos a transformar tus ideas en realidad digital.
            Somos una compañía apasionada por el diseño y desarrollo web,
            ofreciendo soluciones innovadoras y personalizadas para cada
            cliente. Nuestro equipo de expertos trabaja incansablemente para
            crear sitios web que no solo sean visualmente atractivos, sino
            también funcionales y fáciles de usar.
          </p>
        </div>
        <BackgroundBeams />
      </div>
    </div>
  );
}
