"use client";
import FriendsList from "@/components/Amigos/FriendList";
import { fetchUsers } from "@/utils/fetchingData";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <FriendsList users={users} />
    </>
  );
}
