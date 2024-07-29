"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import FormAdd from "../FormAdd/FormAdd";

export default function ButtonAdd({ onSubmit }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        onPress={onOpen}
        endContent={<Plus size={16} strokeWidth={1} />}
        className="bg-foreground text-background"
      >
        Agregar
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar Nueva Gravedad
              </ModalHeader>
              <ModalBody className="mb-4">
                <FormAdd onClose={onClose} onSubmit={onSubmit} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
