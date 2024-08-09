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

  console.log("🚀 ~ Page ~ users:", users);
  return (
    <>
      <FriendsList friends={friends} users={users} />
    </>
  );
}

const friends = [
  {
    id: 1,
    name: "John Doe",
    imageUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=Lilly",
  },
  {
    id: 2,
    name: "Jane Smith",
    imageUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=lucky",
  },
  {
    id: 3,
    name: "Bob Johnson",
    imageUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=garfield",
  },
  {
    id: 4,
    name: "Alice Brown",
    imageUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=annie",
  },
  {
    id: 5,
    name: "Charlie Davis",
    imageUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=charlie",
  },
  {
    id: 6,
    name: "David Wilson",
    imageUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=david",
  },
  {
    id: 7,
    name: "Emily Taylor",
    imageUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=emily",
  },
  {
    id: 8,
    name: "Frank Anderson",
    imageUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=frank",
  },
  {
    id: 9,
    name: "Grace Martinez",
    imageUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=grace",
  },
  {
    id: 10,
    name: "Henry Thompson",
    imageUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=henry",
  },
  {
    id: 11,
    name: "Isaac Walker",
    imageUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=isaac",
  },
  {
    id: 12,
    name: "Jack Harris",
    imageUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=jack",
  },
  {
    id: 13,
    name: "Kate Miller",
    imageUrl: "https://api.dicebear.com/9.x/adventurer/svg?seed=kate",
  },
];
