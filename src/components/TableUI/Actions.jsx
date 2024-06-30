import Link from "next/link";
import {
  Tooltip,
} from "@nextui-org/react";
import { EditIcon, Trash2 } from "lucide-react";

export default function ActionsButtons({ item, url, handleDelete }) {
  return (
    <div className="relative flex items-center gap-2">
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
