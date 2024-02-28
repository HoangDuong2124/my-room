"use client";
import React, { Suspense, useEffect, useState } from "react";
import SidebarPage from "./Sidebar";
import { IRoom, Messenger, Room, User, clickRoom } from "@/interfaces";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
  return (
    <>
      <div className="flex w-full">
        <SidebarPage/>
        {children}
      </div>
    </>
  );
}
