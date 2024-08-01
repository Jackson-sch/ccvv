import { Button, Chip, Image, ScrollShadow } from "@nextui-org/react";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ModalImage from "./ModalImage/ModalImage";

function CardVehiculoItem({ item, url, handleDelete, statusColorMap }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="bg-gradient-to-t from-transparent to-default-50 shadow-md rounded-md hover:scale-105 transform transition-all duration-300 z-50 hover:shadow-xl">
      <div className="flex flex-col items-center justify-center m-auto p-4 gap-4">
        <div
          className="relative aspect-square bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden cursor-pointer h-full w-full"
          style={{ backgroundImage: `url(${item.imageUrl})` }}
        >
          {/* <Image
            isBlurred
            src={item.imageUrl}
            alt={item.placa}
            className="object-cover object-center w-full h-64"
            onClick={handleOpen}
          />
          {open && <ModalImagen item={item} onClose={handleClose} />}
 */}
          <div className=" py-1 absolute  bottom-1 w-[calc(100%_-_8px)]  ml-2 z-10">
            <ModalImage item={item} />
          </div>
        </div>
        <span className="font-semibold text-xl uppercase">{item.placa}</span>
        <div className="flex items-center justify-between gap-4 w-full">
          <p className="text-default-400 uppercase text-sm">{item.marca}</p>
          <p className="text-default-400 uppercase text-sm">{item.color}</p>
          <Chip
            variant="flat"
            color={statusColorMap[item.prioridad]}
            className="uppercase text-sm"
          >
            {item.prioridad}
          </Chip>
        </div>
        <ScrollShadow hideScrollBar className="h-[80px] mb-12">
          <p className="uppercase text-pretty text-default-700 text-tiny">
            {item.detalles}
          </p>
        </ScrollShadow>
        <div className="flex justify-between mt-3 mb-3 gap-x-4 bottom-0 fixed">
          <Button variant="flat" onClick={() => handleDelete(item._id)}>
            Eliminar
            <Trash className="w-4 h-4 ml-2" />
          </Button>
          <Link href={`${url}${item._id}`}>
            <span className="text-primary cursor-pointer active:opacity-50">
              <Button variant="flat">
                Editar
                <EditIcon className="w-4 h-4 ml-2" />
              </Button>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CardVehiculo({
  data,
  url,
  handleDelete,
  statusColorMap,
}) {
  return (
    <div className="grid md:grid-col-2 lg:grid-cols-4 gap-6">
      {data.map((item) => (
        <CardVehiculoItem
          key={item._id}
          item={item}
          url={url}
          handleDelete={handleDelete}
          statusColorMap={statusColorMap}
        />
      ))}
    </div>
  );
}

function ModalImagen({ item, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg p-4 w-1/2 h-1/2 overflow-y-auto">
        <img
          src={item.imageUrl}
          alt="Imagen"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
