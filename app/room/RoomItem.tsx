import Image from 'next/image'
import { room } from '@prisma/client'
import Link from 'next/link'
interface IRoom {
    name: room
}
const RoomItem = ({ name }: IRoom) => {

    return (
        <div className='p-2 hover:bg-[Gainsboro]'>
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

                <p className='truncate'>{name.name}</p>
            </Link>

        </div>


    )
}

export default RoomItem