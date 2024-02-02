"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import RoomItem from './RoomItem'
import { IRoom } from '@/interfaces'
interface ISidebar {
    room: IRoom[]
    setRoom: React.Dispatch<React.SetStateAction<IRoom[]>>
}
const SidebarPage = ({ room, setRoom }: ISidebar) => {
    const { data } = useSession();
    const randomID = () => Math.random().toString(36).slice(2)
    const initAdRoom = {
        id: randomID(),
        name: ""
    }
    const initRoomSearch = {
        id: "",
        name: ""
    }
    const fetchAddRoom = async (data: IRoom) => {
        try {
            const res = await fetch("/api/room", {
                method: "POST",
                body: JSON.stringify(data)
            })
            const result = await res.json()
            return result
        } catch (error) {

        }
    }
    const fetchRoomID = async () => {
        const res = await fetch(`/api/room/${searchRoom}`, {
            method: "GET"
        })
        const data = await res.json()
        if (!data) {
            alert("ID Room: "+searchRoom+ " không tồn tại")
        }
        else {
            setShowSearch(true)
            setRoomSearch(data)
            setSearchRoom("")
        }

    }

    const [showAdd, setShowAdd] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [adRoom, setAddRoom] = useState<IRoom>(initAdRoom)
    const [searchRoom, setSearchRoom] = useState("")
    const [roomSearch, setRoomSearch] = useState(initRoomSearch)
    const showAddRoom = () => {
        setShowAdd(!showAdd)
    }
    const addRoom = () => {
        setRoom(prev => {
            return [...prev, adRoom]
        })
        fetchAddRoom(adRoom)
        setAddRoom({ ...initAdRoom, id: randomID() })
        setShowAdd(false)
    }
    const search = async () => {
        if (searchRoom && searchRoom !== "") {
            await fetchRoomID()
        }
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          search();
        }
      }
      const checkSignout =()=>{
        if(confirm("Bạn chắc chắn muốn đăng xuất")===true){
            signOut()
        }
        return false
      }
    return (
        <>
            <div className='w-[350px] h-[100vh]    border-r sticky top-0'>
                <div className='flex items-center justify-between border-b py-1 px-2'>
                    <div>
                        <Image
                            src="/img/avatar.jpg"
                            width={50}
                            height={50}
                            alt="Avartar default"
                        />
                    </div>

                    <p className='text-[14px] font-[500]'>{data?.user?.name}</p>

                    <div>
                        <button 
                        onClick={checkSignout}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                                <path className=' fill-stone-600' d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='w-full flex items-center justify-between border-b p-1' >
                    <button
                        onClick={search}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                            />
                        </svg>
                    </button>
                    <input
                        className='w-full outline-0 placeholder:text-xs pl-2'
                        type="text"
                        placeholder='Tìm ID room'
                        value={searchRoom}
                        onChange={e => setSearchRoom(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className='h-[30px] border-b'>
                    <button className='w-full h-full text-[12px] font-bold text-blue-700
                     hover:text-white hover:bg-blue-700 transition-all duration-300 '
                        onClick={showAddRoom}
                    >
                        START A NEW ROOM CHAT
                    </button>
                </div>
                {showAdd && <div className='w-full h-auto flex items-center justify-center'>
                    <input type="text"
                        className='pl-2 border outline-1 outline-red-400'
                        placeholder='Nhập tên room'
                        onChange={e => setAddRoom(prev => {
                            return {
                                ...prev,
                                name: e.target.value
                            }
                        })}
                    />
                    <button
                        className='h-full rounded  bg-blue-500 px-1 font-bold text-[14px]  text-white hover:bg-blue-700 transition-all duration-300'
                        onClick={addRoom}
                    >
                        Add Room
                    </button>
                </div>
                }
                <div className='w-full'>

                    {showSearch ? <div className='p-2 hover:bg-[Gainsboro]'>
                        <Link
                            href={`/room/${roomSearch.id}`}
                            className='flex items-center w-full '
                        >
                            <Image
                                className=' rounded-full mr-1'
                                src="/img/avatar.jpg"
                                width={40}
                                height={50}
                                alt="Avartar default"
                            />

                            <p className='truncate'>{roomSearch.name}</p>
                        </Link>
                    </div>
                        : <>
                            {room.map((item) => (
                                <RoomItem key={item.id}
                                    name={item} />
                            ))
                            }
                        </>

                    }
                </div>
            </div>

        </>
    )
}

export default SidebarPage

