'use client'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { PlusIcon } from 'lucide-react';
import React from 'react'

export default function Formulario() {
  return (

<div>
  <div className="flex flex-col space-y-1.5 p-6">
    <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Registro de Ocurrencias</h3>
    <p className="text-sm text-muted-foreground">Ingresa los detalles de la ocurrencia.</p>
  </div>
  <div className="p-6 grid gap-6">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Input
            label="Jefe"
          placeholder="Ingresa el nombre del jefe"
        />
      </div>
      <div>
        <Select label="Supervisor">
            {supervisor.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                    {option.label}
                </SelectItem>
            ))}
        </Select>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Input
          label="Operador de Base"
          placeholder="Ingresa el operador de base"
        />
      </div>
      <div>
        <Select label="Movil" placeholder="Selecciona el movil">
            {movil.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                    {option.label}
                </SelectItem>
            ))}
        </Select>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Input
          label="KM Inicial"
          placeholder="Ingresa el KM inicial"
          type="number"
        />
      </div>
      <div>
        <Input
          label="Conductor"
          placeholder="Ingresa el nombre del conductor"
        />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Input
          label="operador"
          placeholder="Ingresa el nombre del operador"
        />
      </div>
      <div>
        <div className="flex justify-between items-center gap-2">
          <Input
            label="apoyo"
            placeholder="Ingresa el nombre del apoyo"
            endContent={
                <Button isIconOnly color="secondary" variant="faded"><PlusIcon /></Button>
            }
          />
        </div>
      </div>
    </div>
    <div>
      <Input
        label="jurisdiccion"
        placeholder="Ingresa la jurisdicción"
      />
    </div>
  </div>
  <div className="items-center p-6 flex justify-end gap-2">
    <Button variant='flat' color='secondary'>
      Cancelar
    </Button>
    <Button variant='shadow' color='primary'>
      Guardar
    </Button>
  </div>
</div>
  )
}

const movil = [
    {key: "tornado", label: "Tornado"},
    {key: "atlantico", label: "Atlantico"},
    {key: "elephant", label: "Elephant"},
    {key: "lion", label: "Lion"},
  ];

 const supervisor = [
    {key: "alfa 3", label: "Asmat Alfaro Joer Harrison"},
    {key: "jaguar", label: "Carrasco Dominguez Segundo"},
    {key: "tauro", label: "Gamarra Saldaña Luis Rafael"},
    {key: "starki", label: "Velazco Sandon Saul Hernan"},
  ];