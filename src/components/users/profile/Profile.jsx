import { CardContent } from "@/components/Card";
import { User } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function Profile({data}) {
  return (
    <CardContent className="w-96">
      <div className="flex items-center mb-6">
        <User
          name={data?.name}
          description={(
            <>
            <p className="text-gray-500">{data?.rol}</p>
            <Link href="https://twitter.com/jrgarciadev" size="sm" isExternal>
              {data?.email}
            </Link>
            </>
          )}
          avatarProps={{
            className: "w-16 h-16",
            src: "/images/user-36-02.jpg",
          }}
        />
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">Personal Information</h3>
          <button className="text-blue-500 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Edit
          </button>
        </div>

          <div className="flex items-center mb-3">
            <div className="flex flex-col mr-3">
              <span>Correo</span>
            <p className="text-sm text-red-500">{data.email}</p>
            </div>
            <div className="flex flex-col mr-3">
              <span>Nombres</span>
            <p className="text-sm text-red-500">{data.name}</p>
            </div>
          </div>
      </div>
    </CardContent>
  );
}
