import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Spinner size="large" />
      Cargando...
    </div>
  );
}
