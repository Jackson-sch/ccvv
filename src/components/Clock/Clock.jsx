import { format } from "@formkit/tempo";
import React, { useEffect, useState } from "react";

export default function Clock() {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(format(now, { time: "medium" }));
      setCurrentDate(format(now, { date: "full" }));
    };
    updateClock();
    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="text-default-500 text-lg capitalize">
      <p className=" text-sm">{currentDate}</p>
      <p className=" text-sm">{currentTime}</p>
    </div>
  );
}
