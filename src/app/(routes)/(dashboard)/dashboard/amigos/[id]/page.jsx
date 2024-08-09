"use client";
import FriendPost from "@/components/Amigos/FriendPost";
import FriendProfile from "@/components/Amigos/FriendProfile";
import { fetchUsers } from "@/utils/fetchingData";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [friendUser, setFriendUser] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUsers();
        const user = userData.find((u) => u._id === params.id);
        setFriendUser(user);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchData();
  }, [params.id]);

  if (!friendUser) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <FriendProfile user={friendUser} />
      <FriendPost user={friendUser} />
    </div>
  );
}
