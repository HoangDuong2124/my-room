import { groupMess, sendMess } from "@/interfaces";
import { useSession } from "next-auth/react";
import { useState } from "react";
 interface IButtonRoom{
    setMessenger:React.Dispatch<React.SetStateAction<groupMess[]>>
    idRoom:string
 }
export const ButtonRoom = ({setMessenger,idRoom}:IButtonRoom) =>{
    const {data} = useSession()
    const randomID = Math.floor(Math.random() * 10000);
    const initSend = {
        id: randomID,
        idRoom: "",
        idUser: randomID,
        messenger: "",
        sentAt: new Date("2024-11-21"),
        viewedBy: String(data?.user.id),
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
      const [sendMess, setSendMess] = useState<sendMess>(initSend);
    return(
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
                idRoom: idRoom,
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
    )
}


