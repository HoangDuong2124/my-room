"use client";

import { groupMess, sendMess } from "@/interfaces";
import { fetchJSON } from "@/lib/fetchUrl";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Pusher from "pusher-js";
import React, { useEffect, useRef, useState } from "react";
import Message from "../Message";
import { HeaderRoom } from "@/components/Header";
import { ButtonRoom } from "@/components/Button";
import { LoadingMess } from "@/components/Loading";
const MessPage = ({ params }: { params: { id: string } }) => {
  const { data } = useSession();
  const pathName = usePathname();
  const pathNameParts = pathName.split("/");
  const lastPathName = pathNameParts[pathNameParts.length - 1];
  const fetchRoomID = async () => {
    try {
      const res = await fetch(`/api/room/${params.id}`, {
        method: "GET",
      });
      const data = await res.json();
      setRoomID(data);
    } catch (error) {}
  };

  const fetchAllMess = async () => {
    try {
      const res = await fetchJSON(`/api/mess/${params.id}`, {
        method: "GET",
      });
      setMessenger(res);
      setLoading(false);
    } catch (error) {}
  };

  const fetchUpdateViewMess = async () => {
    try {
      const res = await fetchJSON(`/api/mess/${lastPathName}`, {
        method: "PUT",
        body: String(data?.user.id),
      });
    } catch (error) {}
  };

  const [messenger, setMessenger] = useState<groupMess[]>([]);
  const [roomID, setRoomID] = useState({
    id: "",
    name: "",
  });
  const [loading, setLoading] = useState(true);

  const container = useRef<HTMLDivElement>(null);
  const Scroll = () => {
    if (!container.current) return;
    const { offsetHeight, scrollHeight, scrollTop } =
      container.current as HTMLDivElement;
    if (scrollHeight <= scrollTop + offsetHeight + 100) {
      container.current?.scrollTo(0, scrollHeight);
    }
  };
  useEffect(() => {
    const pusher = new Pusher("d137436b48d8b17e6ea1", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("chat-room");
    channel.bind("send-message", (data: any) => {
      if (data.body.idRoom === params.id) {
        setMessenger((prev) => {
          return [...prev, data.body];
        });
      }
    });
    return () => {
      pusher.disconnect();
    };
  }, [params.id]);

  useEffect(() => {
    fetchAllMess();
    fetchRoomID();
  }, []);

  useEffect(() => {
    Scroll();
  }, [messenger]);

  useEffect(() => {
    fetchUpdateViewMess();
  }, [params.id]);

  return loading ? (
    <LoadingMess/>
  ) : (
    <div className="w-[75%]  pt-0 relative ">
      <HeaderRoom roomID={roomID.name} />

      <div
        ref={container}
        className="chat-scroll h-[calc(100vh-125px)] overflow-y-auto "
      >
        {messenger.map((mess) => (
          <Message key={mess.id} mess={mess} />
        ))}
      </div>
      <ButtonRoom setMessenger={setMessenger} idRoom={params.id} />
    </div>
  );
};

export default MessPage;
