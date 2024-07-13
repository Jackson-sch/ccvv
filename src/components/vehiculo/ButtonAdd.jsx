import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ButtonAdd({ url }) {
  return (
    <Link href={`${url}add`}>
      <Button variant="flat" color="primary" endContent={<Plus size={18} />}>
        Agregar nuevo
      </Button>
    </Link>
  );
}
