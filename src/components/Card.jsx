import { cn } from "@/utils/utils";

export default function Card({ ...props }) {
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
  );
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

export function Container(props) {
  return (
    <div
      {...props}
      className={cn(
        `h-auto w-auto rounded-md bg-[rgba(248,248,248,0.01)]
  shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
  `,
        props.className
      )}
    />
  );
}

export function CardButtomTransparent(props) {
  return (
    <div
      {...props}
      className={cn(
        "to-default-50 z-50  transform rounded-md bg-gradient-to-t from-transparent shadow-md transition-all duration-300 ",
        props.className
      )}
    />
  );
}
