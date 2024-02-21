"use client"
import Image from 'next/image'
import { room } from '@prisma/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Messenger } from '@/interfaces'
import Pusher from 'pusher-js'
interface IRoom {
    name: room
}
const RoomItem = ({ name }: IRoom) => {
    const fetchMess = async () => {
        const res = await fetch(`/api/newMess/${name.id}`, {
            method: "GET"
        })
        const data = await res.json()
        setNewMess(data)
    }
    const [newMess, setNewMess] = useState<Messenger>()
    useEffect( () => {
        fetchMess()
        const pusher = new Pusher("d137436b48d8b17e6ea1", {
            cluster: "ap1",
        });
        const channel = pusher.subscribe("chat-room");
        channel.bind("send-message", (data: any) => {
            if(data.body.idRoom===name.id){
                setNewMess(data.body)
            }
        });
        return () => {
            pusher.disconnect()
        }
    }, [])
    return (
        <div className=' p-2 hover:bg-[Gainsboro]'>
            <Link
                href={`/room/${name.id}`}
                className='flex items-center w-full '
            >
                <Image
                    className=' rounded-full mr-1'
                    src="/img/avatar.jpg"
                    width={40}
                    height={50}
                    alt="Avartar default"
                />
                <div>
                    <p className='truncate'>{name.name}</p>
                    <p className='text-[13px] opacity-[0.65] truncate'>{newMess?.messenger}</p>
                </div>

            </Link>

        </div>

    )
}

export default RoomItem