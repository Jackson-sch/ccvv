import { cn } from "@/utils/utils";
import React from "react";

export default function Drawer({children, isOpen, setIsOpen, title, className, onClose}) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setIsOpen(false);
    }
  };

  return (
    <main className={cn("fixed overflow-hidden pt-16 z-10 bg-black bg-opacity-40 inset-0 transform ease-in-out duration-300", isOpen ? "translate-x-0 transition-opacity opacity-100 duration-500" : "-translate-x-full transition-all delay-500 opacity-0", className)}>
      <section
        className={
          " w-screen max-w-lg right-0 absolute bg-default-50 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-lg pb-10 px-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <header className="pt-8 font-bold text-xl">{title}</header>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={handleClose}
      ></section>
    </main>
  )
}