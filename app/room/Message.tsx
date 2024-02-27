import React from 'react'
import Image from 'next/image'
import { Messenger, groupMess } from '@/interfaces'
import { useSession } from 'next-auth/react'
interface IMess{
    mess:groupMess
}
const Message = ({mess}:IMess) => {
    const {data} = useSession()
  return (
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
  )
}

export default Message