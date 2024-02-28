export interface IRoom {
    id: string
    name: string
}
export interface Room {
    id: string
    name: string
    messengers: [
        {
            id:number
            messenger:string
            sentAt:Date
        }
    ]
}
export interface User {
    id: number
    name: string
    email: string
    password: string
}
export interface Messenger {
    id: number
    idUser: number
    idRoom: string
    messenger: string
    sentAt: Date
    viewedBy:string[]
}
export interface sendMess {
    id: number
    idUser: number
    idRoom: string
    messenger: string
    sentAt: Date
    viewedBy:string
}
export interface clickRoom {
    id: string
    name: string
}
export interface groupMess {
    id: number
    idUser: number
    idRoom: string
    messenger: string
    sentAt: Date
    user: {
        id: number
        name: string
    }
}