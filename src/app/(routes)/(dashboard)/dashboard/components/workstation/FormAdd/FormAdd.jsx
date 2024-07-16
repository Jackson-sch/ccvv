import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React from "react";

export default function FormAdd({onClose}) {
  return (
    <form action="">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Input type="text" label="Descripción" placeholder="Omega 01" />
        </div>
        <div>
          <Input type="text" label="Hostname" />
        </div>
        <div>
          <Input type="text" label="Ip" placeholder="234.6.78.65" />
        </div>
        <div>
          <Select name="status" label="status">
            <SelectItem value="active">Activo</SelectItem>
            <SelectItem value="inactive">Inactivo</SelectItem>
          </Select>
        </div>
        <div className="flex flex-col-1 items-center justify-end gap-4">
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onClose}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
