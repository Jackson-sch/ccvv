import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from "@nextui-org/react";
import { EyeIcon } from "lucide-react";

export default function ModalImage({ item }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        className="text-tiny text-white bg-black/20"
        onPress={onOpen}
      >
        <EyeIcon className="w-4 h-4" />
      </Button>
      <Modal
        size="5xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.9,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.5,
                ease: "easeIn",
              },
            },
          }
        }}
      >
        <ModalContent className="shadow-lg ">
          {(onClose) => (
            <>
              <ModalBody className="m-0 p-0">
                <Image
                  src={item.imageUrl}
                  alt={item.placa}
                  className="object-contain object-center max-w-5xl h-auto"
                  autoResize
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
