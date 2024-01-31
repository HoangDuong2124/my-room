export interface IRoom{
    id:string
    name:string
}
export interface User{
    id:number
    name:string
    email:string
    password:string
}
export interface Messenger{
    id:number
    idUser:number
    idRoom:string
    messenger:string
    sentAt:Date
}
export interface sendMess {
    id:number
    idUser:number
    idRoom:string
    messenger:string
    sentAt:Date
}
export interface clickRoom{
    id:string
    name:string
}