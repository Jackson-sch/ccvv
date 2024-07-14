import React from "react";
import Card from "@/components/Card";
import PageTitle from "@/components/PageTitle";

export default function page() {
  return (
    <div>
      <PageTitle title="Workstation" />

      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((card, index) => (
          <div key={index}>
            <p>{card.name}</p>
            <span>{card.status}</span>
            <p>{card.hostname}</p>
            <p>{card.ip}</p>
          </div>
          
        ))}
      </section>
    </div>
  );
}


const cardData = [
  {
    name: "Omega 01",
    status: "active",
    hostname: "237.84.2.178",
    ip: "237.84.2.178",
  }
]