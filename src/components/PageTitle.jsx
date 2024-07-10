import React from "react";
import { cn } from "@/utils/utils";

export default function PageTitle({ title, descripcion, className }) {
  return (
    <>
      <h1 className={cn("text-2xl font-semibold", className)}>{title}</h1>
      <span className={cn("text-xs text-default-400 text-pretty font-semibold", className)}>{descripcion}</span>
    </>
  );
}
