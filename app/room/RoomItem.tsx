import Image from 'next/image'
import React from 'react'

const RoomItem = ({name}:{name:string}) => {
    return (
        <div className='p-2 hover:bg-[Gainsboro]'>
            <button className='flex items-center w-full '>
                    <Image
                        className=' rounded-full mr-1'
                        src="/img/avatar.jpg"
                        width={40}
                        height={50}
                        alt="Avartar default"
                    />

                <p className='truncate'>{name}</p>
            </button>

        </div>
    )
}

export default RoomItem