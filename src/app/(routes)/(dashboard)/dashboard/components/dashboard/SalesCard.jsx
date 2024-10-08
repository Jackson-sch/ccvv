
import { Image } from '@nextui-org/react'
import React from 'react'

export default function SalesCard({d}) {
  return (
    <div className="flex flex-wrap justify-between gap-3">
      <section className=" inline-flex justify-between gap-3">
        <div className="h-12 w-12 rounded-full bg-gray-100 p-1">
          <Image
            width={200}
            height={200}
            src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${d.name}`}
            alt="avatar"
          />
        </div>
        <div className="text-sm">
          <p>{d.name}</p>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-400">
            {d.email}
          </div>
        </div>
      </section>
      <p>{d.saleAmount}</p>
    </div>
  )
}
