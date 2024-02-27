"use client";
import Image from "next/image";
import { room } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Messenger } from "@/interfaces";
import Pusher from "pusher-js";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { fetchJSON } from "@/lib/fetchUrl";
interface IRoom {
  name: room;
}
const RoomItem = ({ name }: IRoom) => {
  const { data } = useSession();
  const pathName = usePathname();
  const userID = String(data?.user.id);
  const [newMess, setNewMess] = useState<Messenger>();
  const fetchNewMess = async () => {
    try {
      const res = await fetchJSON(`/api/newMess/${name.id}`, {
        method: "GET",
      });
      setNewMess(res);
    } catch (error) {}
  };

  useEffect(() => {
    const pusher = new Pusher("d137436b48d8b17e6ea1", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("chat-room");
    channel.bind("send-message", (data: any) => {
      if (data.body.idRoom === name.id) {
        setNewMess(data.body);
      }
    });
    return () => {
      pusher.disconnect();
    };
  }, [name.id]);

  useEffect(() => {
    fetchNewMess();
  }, [pathName]);

  return (
    <div className=" p-2 hover:bg-[Gainsboro]">
      <Link href={`/room/${name.id}`} className="flex items-center w-full ">
        <Image
          className=" rounded-full mr-1"
          src="/img/avatar.jpg"
          width={40}
          height={50}
          alt="Avartar default"
        />
        <div>
          <p className="truncate">{name.name}</p>

          <p
            className={
              newMess?.viewedBy?.includes(userID)
                ? "text-[13px] opacity-[0.65] truncate"
                : "text-[13px] truncate font-bold "
            }
          >
            {newMess?.messenger}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default RoomItem;
