import { CardContent } from "@/components/Card";
import { User } from "@nextui-org/react";
import React from "react";

export default function Profile({ data }) {
  const email = data?.emailAddresses[0].emailAddress;
  const image = data?.imageUrl;
  
  return (
    <CardContent className="w-96 ">
      <div className="flex items-center mb-6">
        <User
          name={data?.fullName}
          description={
            <>
              <p className="text-gray-500">{email}</p>
            </>
          }
          avatarProps={{
            className: "w-16 h-16",
            src: image,
          }}
        />
      </div>
    </CardContent>
  );
}
