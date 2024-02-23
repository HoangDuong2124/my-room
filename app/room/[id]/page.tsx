"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { IRoom, Messenger, User, groupMess, sendMess } from "@/interfaces";
import Pusher from "pusher-js";
import { usePathname } from "next/navigation";
const MessPage = ({ params }: { params: { id: string } }) => {
  const { data } = useSession();
  const pathName = usePathname();
  const pathNameParts = pathName.split("/");
  const lastPathName = pathNameParts[pathNameParts.length - 1];
  const randomID = Math.floor(Math.random() * 10000);
  const initSend = {
    id: randomID,
    idRoom: "",
    idUser: randomID,
    messenger: "",
    sentAt: new Date("2024-11-21"),
    viewedBy: String(data?.user.id),
  };
  const fetchRoomID = async () => {
    const res = await fetch(`/api/room/${params.id}`, {
      method: "GET",
    });
    const data = await res.json();
    setRoomID(data);
  };

  const fetchAllMess = async () => {
    const res = await fetch(`/api/mess/${params.id}`, {
      method: "GET",
    });
    const data = await res.json();
    setMessenger(data);
  };

  const fetchSendMess = async (data: sendMess) => {
    try {
      const send = await fetch("/api/mess", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await send.json();
      return result;
    } catch (error) {}
  };

  const fetchUpdateViewMess = async () => {
    const res = await fetch(`/api/mess/${lastPathName}`, {
      method: "PUT",
      body: data?.user.id,
    });
  };

  const [messenger, setMessenger] = useState<groupMess[]>([]);
  const [roomID, setRoomID] = useState({
    id: "",
    name: "",
  });
  const [sendMess, setSendMess] = useState<sendMess>(initSend);

  const sendMessenger = async () => {
    try {
      if (sendMess.messenger && sendMess.messenger !== "") {
        const data = await fetchSendMess(sendMess);
        setMessenger((prev) => {
          const updateMess = prev.map((mess) =>
            mess.id === sendMess.id
              ? { ...mess, id: data.id, sentAt: data.sentAt }
              : mess
          );
          return updateMess;
        });
        setSendMess({ ...initSend });
      }
    } catch (error) {}
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessenger();
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
  }, []);


  useEffect(() => {
    fetchAllMess();
    fetchRoomID();
  }, []);

  useEffect(() => {
    fetchUpdateViewMess();
  }, [pathName]);

  return (
    <div className="w-[75%]  pt-0 relative ">
      <div className="h-[77px] flex sticky top-0  bg-white items-center justify-between p-2 border-b shadow z-40 ">
        <div className="flex items-center">
          <Image
            src="/img/avatar.jpg"
            width={60}
            height={50}
            alt="Avartar default"
          />
          <div>
            <p className="font-bold text-[15px]">{roomID.name}</p>
            <div className="text-[13px] opacity-70">Đang hoạt động</div>
          </div>
        </div>

        <div className="flex items-center mr-3">
          <button className="w-8 h-8 flex items-center justify-center mr-3 rounded-[50%] hover:bg-slate-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              viewBox="0 0 512 512"
            >
              <path
                className="fill-blue-700"
                d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
              />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center mr-3 rounded-[50%] hover:bg-slate-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              viewBox="0 0 576 512"
            >
              <path
                className="fill-blue-700"
                d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"
              />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-[50%] hover:bg-slate-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              viewBox="0 0 512 512"
            >
              <path
                className="fill-blue-700"
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="h-[calc(100vh-125px)] overflow-y-auto ">
        {messenger.map((mess) => (
          <div key={mess.id}>
            {mess.idUser !== Number(data?.user.id) ? (
              <div>
                <div className="pl-12 text-[12px] opacity-70 ">
                  {mess.user.name}
                </div>
                <div className="flex items-center mb-2">
                  <Image
                    className="rounded-[50%] "
                    src="/img/avatar.jpg"
                    width={45}
                    height={50}
                    alt="Avartar default"
                  />
                  <div>
                    <div className="h-auto w-auto  bg-slate-300 text-black p-[3px] px-[10px]  rounded-full">
                      {mess.messenger}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-between mr-3 ">
                <div></div>
                <div className="h-auto w-auto max-w-[65%] mb-[2px]  bg-blue-700 text-white p-[3px] px-[10px] rounded-full">
                  {mess.messenger}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-[75%] h-[48px] fixed bottom-0  bg-white py-2 flex justify-center  ">
        <input
          className="w-[220px] h-8 border rounded-full outline-blue-500 pl-3 focus:w-[320px] transition-all duration-300"
          placeholder="Nhập tin nhắn"
          value={sendMess.messenger}
          onKeyDown={handleKeyDown}
          onChange={(e) =>
            setSendMess((prev) => {
              return {
                ...prev,
                idRoom: params.id,
                idUser: Number(data?.user.id),
                messenger: e.target.value,
                viewedBy: String(data?.user.id),
              };
            })
          }
        />
        <button
          className="w-20 h-8 border rounded-lg bg-red-500 text-white hover:bg-red-700 transition-all duration-300"
          onClick={sendMessenger}
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default MessPage;
