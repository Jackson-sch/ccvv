import { Tooltip } from "@nextui-org/react";
import { Trash, Trash2 } from "lucide-react";
import React from "react";

const ButtonDelete = ({ id, handleDelete }) => {
  return (
    <Tooltip color="danger" content="Delete user">
      <span className="text-lg text-danger cursor-pointer active:opacity-50">
        <Trash2 size={20} strokeWidth={1} onClick={() => handleDelete(id)} />
      </span>
    </Tooltip>
  );
};

export default ButtonDelete;
