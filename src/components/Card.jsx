import { cn } from "@/utils/utils";
import { Button } from "@nextui-org/react";
import { Trash2 } from "lucide-react";

export default function Card({ ...props}) {
  
  return (
    <CardContent>
      <section className="flex justify-between gap-2">
      <p className="text-sm">{props.label}</p>
      <props.icon className="h-4 w-4 text-gray-400" />
    </section>
    <section className="flex flex-col gap-1">
      <h2 className="text-2xl font-semibold">{props.amount}</h2>
      <p className="text-sm text-gray-500">{props.discription}</p>
    </section>
    </CardContent>
  )
}

export function CardContent(props) {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col w-full gap-3 rounded-xl border-1 border-default-50 p-5 shadow",
        props.className
      )}
    />
  );
}
