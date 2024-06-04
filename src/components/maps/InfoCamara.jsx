import { Chip } from "@nextui-org/react";

export default function InfoCamara({ marker }) {
  return (
    <div className=" flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">
          {marker.nombreCamara}
        </h2>
        <Chip
          className="uppercase"
          color={statusColorMap[marker.status]}
          size="sm"
          variant="flat"
        >
          {marker.status}
        </Chip>
      </div>
      <p className="text-sm text-default-500">{marker.direccion}</p>
      <div className="text-xs text-default-500 flex gap-4">
        <p>Lat: {marker.latitud}</p>
        <p>Lng: {marker.longitud}</p>
      </div>
    </div>
  );
}

const statusColorMap = {
  Active: "success",
  Inactive: "danger",
};
