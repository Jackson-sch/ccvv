import React from "react";
import { Pagination as Pag } from "@nextui-org/react";

export default function Pagination({
  initialPage,
  totalItems,
  currentPage,
  onChange,
}) {
  return (
    <div className="my-6 flex items-center justify-center">
      <Pag
        showControls
        total={totalItems}
        initialPage={initialPage}
        currentPage={currentPage}
        onChange={onChange}
      />
    </div>
  );
}
