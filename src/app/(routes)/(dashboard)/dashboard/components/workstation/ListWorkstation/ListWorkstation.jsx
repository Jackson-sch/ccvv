import { CardContent } from "@/components/Card";
import { Button, Chip } from "@nextui-org/react";
import { Delete, Edit, Trash } from "lucide-react";
import ButtonEdit from "./ButtonEdit/ButtonEdit";

export default function ListWorkstation({operadores}) {
  return (
    <div className="grid w-full grid-cols-1 -order-last gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-3 pb-6">
      {operadores.map((card, index) => (
        <CardContent
          key={index}
          className="hover:scale-105 mt-4 p-8 bg-gradient-to-tr from-transparent via-default-100 to-transparent hover:shadow-xl hover:bg-gradient-to-br transition-colors duration-500"
        >
          <div className="flex flex-col-1 justify-between items-center">
            <p className="font-bold capitalize text-lg">{card.name}</p>
            <Chip variant="flat">{card.status}</Chip>
          </div>
          <div className="flex flex-col-1 gap-4">
            <p className="text-sm">{card.hostname}</p>
            <p className="text-sm">{card.ip}</p>
          </div>
          <div className="flex justify-between mt-3">
            <ButtonEdit />
            <Button size="sm" endContent={<Trash size={14} strokeWidth={1} />}>Eliminar</Button>
          </div>
        </CardContent>
      ))}
    </div>
  );
}
