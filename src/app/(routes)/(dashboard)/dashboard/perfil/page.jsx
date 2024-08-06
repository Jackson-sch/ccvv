"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/profile/Hero";
import Profile from "@/components/profile/Profile";
import Posts from "@/components/incidencia/posts/Posts";
import { fetchIncidencias } from "@/utils/fetchingData";

import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { user: userData } = useUser();
  const [monthlyCount, setMonthlyCount] = useState(0);
  const [countTotal, setCountTotal] = useState(0);

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="w-full">
          <Hero
            data={userData}
            countTotal={countTotal}
            monthlyCount={monthlyCount}
          />
        </div>
        <div className="flex space-x-4">
          <div className="w-96">
            <Profile data={userData} />
          </div>
          <div className="flex-grow h-screen">
            <Posts
              dataUser={userData}
              setCountTotal={setCountTotal}
              setMonthlyCount={setMonthlyCount}
            />
          </div>
        </div>
      </div>
    </>
  );
}
