"use client";
import React, { useEffect, useState } from "react";
import RoomItem from "./RoomItem";
import { IRoom, Messenger, Room } from "@/interfaces";
import { LoadingRoom } from "@/components/Loading";
import { fetchJSON } from "@/lib/fetchUrl";
import { HeaderSidebar } from "@/components/Header";
import Pusher from "pusher-js";

const SidebarPage = () => {
  const randomID = () => Math.random().toString(36).slice(2);
  const initAdRoom = {
    id: randomID(),
    name: "",
  };
  const fetchRoom = async () => {
    try {
      const res = await fetchJSON("/api/room", {
        method: "GET",
      });
      res.sort((a: Room, b: Room) => {
        const timeA: any =
          a.messengers.length > 0
            ? new Date(a.messengers[0].sentAt)
            : new Date(0);
        const timeB: any =
          b.messengers.length > 0
            ? new Date(b.messengers[0].sentAt)
            : new Date(0);

        return timeB - timeA;
      });
      setRoom(res);
      setLoading(false);
    } catch (error) {}
  };
  const fetchAddRoom = async (data: IRoom) => {
    try {
      const res = await fetch("/api/room", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return result;
    } catch (error) {}
  };
  const fetchRoomName = async (string: string) => {
    try {
      const res = await fetch(`/api/roomSearch/${string}`, {
        method: "GET",
      });
      const data = await res.json();

      setRoom(data);
    } catch (error) {}
  };
  const [room, setRoom] = useState<IRoom[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [adRoom, setAddRoom] = useState<IRoom>(initAdRoom);
  const [loading, setLoading] = useState(true);
  const showAddRoom = () => {
    setShowAdd(!showAdd);
  };
  const addRoom = () => {
    if (adRoom.name && adRoom.name.trim() !== "") {
      setRoom((prev) => {
        return [...prev, adRoom];
      });
      fetchAddRoom(adRoom);
      setAddRoom({ ...initAdRoom, id: randomID() });
      setShowAdd(false);
    }
  };
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchNew = event.target.value;
    if (searchNew === "") {
      await fetchRoom();
    } else {
      await fetchRoomName(searchNew);
    }
  };
  useEffect(() => {
    fetchRoom();
  }, []);
  useEffect(()=>{
    const pusher = new Pusher("d137436b48d8b17e6ea1", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("chat-room");
    channel.bind("send-message", (data: any) => {
      fetchRoom()
    });
    return () => {
      pusher.disconnect();
    };
  },[])
  return (
    <>
      <div className="w-[25%] h-[100vh]    border-r sticky top-0">
       <HeaderSidebar/>
        <div className="w-full flex items-center justify-between border-b p-1">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </button>
          <input
            className="w-full outline-0 placeholder:text-xs pl-2"
            type="text"
            placeholder="Tìm tên room"
            onChange={handleSearch}
          />
        </div>
        <div className="h-[30px] border-b">
          <button
            className="w-full h-full text-[12px] font-bold text-blue-700
                     hover:text-white hover:bg-blue-700 transition-all duration-300 "
            onClick={showAddRoom}
          >
            START A NEW ROOM CHAT
          </button>
        </div>
        {showAdd && (
          <div className="w-full h-[25px] grid grid-cols-4">
            <input
              type="text"
              className="col-span-3 pl-2 border outline-1 outline-red-400"
              placeholder="Nhập tên room"
              onChange={(e) =>
                setAddRoom((prev) => {
                  return {
                    ...prev,
                    name: e.target.value,
                  };
                })
              }
            />
            <button
              className="h-full rounded  bg-blue-500 px-1 font-bold text-[14px]  text-white hover:bg-blue-700 transition-all duration-300"
              onClick={addRoom}
            >
              Add Room
            </button>
          </div>
        )}
        <div className="w-full h-[calc(100vh-125px)] overflow-y-auto">
          {loading ? (
            <LoadingRoom />
          ) : (
            <>
              {room.map((item) => (
                <RoomItem key={item.id} name={item} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarPage;
