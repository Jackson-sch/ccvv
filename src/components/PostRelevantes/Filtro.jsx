import { fetchGravedades } from "@/utils/fetchingData";
import { Button, Select, SelectItem, SelectSection } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Filtro({ setFilter, countTotal }) {
  const [gravedad, setGravedad] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const gravedadData = await fetchGravedades();
      setGravedad(gravedadData);
    };

    fetchData();
  }, []);

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    setFilter(value);
  };

  const handleRemoveFilter = () => {
    setSelectedValue("");
    setFilter("");
  };

  return (
    <div className="flex justify-between w-full">
      <div className="flex justify-start items-center flex-row w-full">
        {countTotal && (
          <p className="text-sm text-neutral-500">
            Total {countTotal} incidencias
          </p>
        )}
      </div>
      <div className="flex flex-row w-full gap-2 justify-end items-center">
        <Select
          size="sm"
          label="Filtrar por Relevantes"
          className="max-w-xs"
          value={selectedValue}
          onChange={(e) => handleSelectChange(e.target.value)}
        >
          <SelectSection title="Relevantes">
            {gravedad.map((gravedad) => (
              <SelectItem key={gravedad.name} value={gravedad.name}>
                {gravedad.name}
              </SelectItem>
            ))}
          </SelectSection>
        </Select>
        <Button
          size=""
          color="default"
          onPress={handleRemoveFilter}
          endContent={<Trash2 size={18} strokeWidth={1} />}
        >
          Remover Filtro
        </Button>
      </div>
    </div>
  );
}
