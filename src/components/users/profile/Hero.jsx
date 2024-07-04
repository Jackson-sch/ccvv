import React from "react";

export default function Hero() {
  return (
    <div className="bg-blue-100 p-8 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h1 className="text-3xl text-default-50 font-bold mb-2">Good Morning, Victor!</h1>
        <p className="text-gray-600 mb-4">
          Here's what happening with your store today
        </p>

        <div className="flex space-x-8">
          <div>
            <p className="text-gray-500 text-sm">TODAY'S VISIT</p>
            <p className="text-2xl text-default-50  font-bold">15,209</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">TODAY'S TOTAL SALES</p>
            <p className="text-2xl text-default-50  font-bold">$29,115.50</p>
          </div>
        </div>
      </div>

      <div className="relative w-32 h-32">
        <div className="absolute inset-0 bg-blue-200 rounded-full"></div>
        <div className="absolute inset-4 bg-white rounded-full shadow-md flex flex-col items-center justify-center">
          <div className="text-blue-500 font-bold">SHOP</div>
          <div className="w-8 h-1 bg-blue-500 mt-1"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
}
