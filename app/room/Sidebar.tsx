import Image from 'next/image'
import React from 'react'
import RoomItem from './RoomItem'
import { IRoom } from './page'
   interface ISidebar{
      room:IRoom[]   
  }
const SidebarPage = ({room}:ISidebar) => {
    return (
        <>
            <div className='w-[250px] h-[100vh]    border-r'>
                <div className='flex items-center justify-between border-b py-1 px-2'>
                    <div>
                        <Image
                            src="/img/avatar.jpg"
                            width={50}
                            height={50}
                            alt="Avartar default"
                        />
                    </div>
                    
                        <p className='text-[14px] font-[500]'>Hoang Minh Duong</p>
                 
                    <div>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                                <path className=' fill-stone-600' d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='w-full flex items-center justify-between border-b p-1' >
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                            />
                        </svg>
                    </button>
                    <input 
                    className='w-full outline-0 placeholder:text-xs pl-2'
                    type="text"
                     placeholder='Tìm ID room'  
                    />
                </div>
                <div className='h-[30px] border-b'>
                    <button className='w-full h-full text-[12px] font-bold text-blue-700
                     hover:text-white hover:bg-blue-700 transition-all duration-300 '>
                      START A NEW ROOM CHAT
                    </button>
                </div>
                <div className='w-full'>
                    {room.map((item)=>(
                        <RoomItem key={item.id}
                         name={item.name}/>
                    ))

                    }
                    
             
                </div>
            </div>

        </>
    )
}

export default SidebarPage

