"use client"
import React, { useState } from "react"
import SidebarPage from "./Sidebar"
export interface IRoom{
    id:string
    name:string
}
export interface User{
    id:string
    name:string
    email:string
    password:string
}
export interface Description{
    id:string
    idUser:string
    idRoom:string
    description:string
}
const RoomPage = () =>{
    const [room,setRoom] = useState<IRoom[]>(
        [
            {
                id:"1",
                name:"Nhóm lớp 12A1"
            },
            {
                id:"1",
                name:"Nhóm công ty"
            },
            {
                id:"1",
                name:"Nhóm game liên quân"
            },
            {
                id:"1",
                name:"Nhóm Gym đường phố"
            },
            {
                id:"1",
                name:"Nhóm hóng biến"
            },
            {
                id:"1",
                name:"Nhóm học bài"
            },
            {
                id:"1",
                name:"Nhóm tán chuyện"
            },
        ]
    )   

    return(
        <>
        <SidebarPage 
         room={room}
        />
        </>
    )
}


export default RoomPage