import React from 'react'
import Image from 'next/image'

export const HeaderRoom = ({roomID}:{roomID:string}) =>{

    return (
        <div className="h-[77px] flex sticky top-0  bg-white items-center justify-between p-2 border-b shadow z-40 ">
    <div className="flex items-center">
      <Image
        src="/img/avatar.jpg"
        width={60}
        height={50}
        alt="Avartar default"
      />
      <div>
        <p className="font-bold text-[15px]">{roomID}</p>
        <div className="text-[13px] opacity-70">Đang hoạt động</div>
      </div>
    </div>

    <div className="flex items-center mr-3">
      <button className="w-8 h-8 flex items-center justify-center mr-3 rounded-[50%] hover:bg-slate-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="0 0 512 512"
        >
          <path
            className="fill-blue-700"
            d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
          />
        </svg>
      </button>
      <button className="w-8 h-8 flex items-center justify-center mr-3 rounded-[50%] hover:bg-slate-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="0 0 576 512"
        >
          <path
            className="fill-blue-700"
            d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"
          />
        </svg>
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded-[50%] hover:bg-slate-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="0 0 512 512"
        >
          <path
            className="fill-blue-700"
            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
          />
        </svg>
      </button>
    </div>
  </div>
    )
}