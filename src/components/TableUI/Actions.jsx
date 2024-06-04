import Link from "next/link";
import {
  Tooltip,
  Modal,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Divider,
} from "@nextui-org/react";
import { EditIcon, EyeIcon, Trash2 } from "lucide-react";

export default function ActionsButtons({ item, url, handleDelete }) {
  return (
    <div className="relative flex items-center gap-2">
      <ModalView item={item} />
      {url && (
        <Tooltip color="primary" content="Edit user">
          <Link href={`${url}${item._id}`}>
            <span className=" text-primary cursor-pointer active:opacity-50">
              <EditIcon className="w-4 h-4" />
            </span>
          </Link>
        </Tooltip>
      )}
      <Tooltip color="danger" content="Delete user">
        <button
          onClick={() => handleDelete(item._id)}
          className="rounded-full p-0 text-danger cursor-pointer active:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </Tooltip>
    </div>
  );
}

export function ModalView({ item }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip content="Details">
        <Button onPress={onOpen} isIconOnly className="bg-transparent">
          <EyeIcon className="w-4 h-4 text-orange-400" />
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b border-default-300">
                Detalles del Usuario
              </ModalHeader>
              <ModalBody className="pt-8">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold">Nombre: {item.name}</h3>
                  <Divider />
                  <p>Email: {item.email}</p>
                  <Divider />
                  <p>Username: {item.username}</p>
                  <Divider />
                  <p>Rol: {item.rol}</p>
                  <Divider />
                  <p>Estado: {item.status}</p>
                  <Divider />
                  <p>Teléfono: {item.phone}</p>
                  <Divider />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
