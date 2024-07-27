import { Button, Divider, ScrollShadow } from "@nextui-org/react";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";
import { Trash } from "lucide-react";
import React from "react";

export default function LeyendaZonas({ zonas }) {
  const sortedZonas = zonas.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <MapControl position={ControlPosition.LEFT_BOTTOM}>
      <ScrollShadow
        hideScrollBar
        className="bg-background w-72 h-[300px] relative p-4 rounded-lg shadow-xl "
      >
        {sortedZonas.map((zona, index) => (
          <div key={index}>
            <div className="flex flex-col-2 justify-between items-center mb-1 gap-2">
              <div className="w-full flex col-span-1 justify-between items-center">
                <p className="text-default-500">{zona.name}</p>
                <input
                  className="border-none"
                  disabled
                  type="color"
                  value={zona.color}
                />
              </div>
            </div>
            <Divider className="mt-1" />
          </div>
        ))}
      </ScrollShadow>
    </MapControl>
  );
}
