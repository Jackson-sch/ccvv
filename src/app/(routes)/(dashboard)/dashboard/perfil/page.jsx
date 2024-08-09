"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/profile/Hero";
import Profile from "@/components/profile/Profile";
import Posts from "@/components/incidencia/posts/Posts";
import { fetchIncidencias } from "@/utils/fetchingData";

import { useUser } from "@clerk/nextjs";
import ProfileHeader from "@/components/profile/PerfilHeader";

export default function Page() {
  const { user: userData } = useUser();
  const [monthlyCount, setMonthlyCount] = useState(0);
  const [countTotal, setCountTotal] = useState(0);

  return (
    <div className="container w-3/4 flex flex-col m-auto">
      <div className="flex flex-col gap-8 mb-4 -mt-12">
        <ProfileHeader
          data={userData}
          countTotal={countTotal}
          monthlyCount={monthlyCount}
        />
        {/* <div className="w-full">
          <Hero
            data={userData}
            countTotal={countTotal}
            monthlyCount={monthlyCount}
          />
        </div> */}
        <div className="flex space-x-4 gap-10 space-y-4">
          {/* <div className="w-96">
            <Profile data={userData} />
          </div> */}
          <div className="flex-grow h-full">
            <Posts
              dataUser={userData}
              setCountTotal={setCountTotal}
              setMonthlyCount={setMonthlyCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
