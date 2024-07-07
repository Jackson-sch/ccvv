import React from "react";

export default function Hero() {
  return (
    <div className="bg-gradient-to-t to-indigo-400 from-indigo-300/50 p-8 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h1 className="text-3xl text-default-50 font-bold mb-2">Good Morning, Victor!</h1>
        <p className="text-default-300 mb-4">
          Here's what happening with your store today
        </p>

        <div className="flex space-x-8">
          <div>
            <p className="text-default-300 text-sm">TODAY'S VISIT</p>
            <p className="text-2xl font-bold">15,209</p>
          </div>
          <div>
            <p className="text-default-300 text-sm">TODAY'S TOTAL SALES</p>
            <p className="text-2xl font-bold">$29,115.50</p>
          </div>
        </div>
      </div>
    </div>
  );
}
