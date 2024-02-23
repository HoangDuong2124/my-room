"use client";
import React, { useEffect, useState } from "react";
import SidebarPage from "./Sidebar";
import { IRoom, Messenger, User, clickRoom } from "@/interfaces";
import Pusher from "pusher-js";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [room, setRoom] = useState<IRoom[]>([]);
  const [user, setUser] = useState<User[]>([
    {
      id: 1,
      name: "Hoang Minh Duong",
      email: "duonghm@gmail.com",
      password: "21242003",
    },
    {
      id: 2,
      name: "Tran Quang Duy",
      email: "duytq@gmail.com",
      password: "123456",
    },
  ]);
  const fetchRoom = async () => {
    try {
      const res = await fetch("/api/room", {
        method: "GET",
      });
      const data = await res.json();

      if (data) setRoom(data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchRoom();
  }, []);
  return (
    <>
      <div className="flex w-full">
        <SidebarPage room={room} setRoom={setRoom} />
        {children}
      </div>
    </>
  );
}
