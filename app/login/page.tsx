"use client"
import React, { use, useState } from "react"
const LoginPage = () => {
    const initUser = {
        email: "",
        password: ""
    }
    const [user, setUser] = useState<
        {
            email: string
            password: string
        }
    >(initUser)
    // const submit = ()=>{
    //     console.lo
    // }
    return (

        <div className="w-full h-[560px] bg-bg-image bg-cover flex justify-center items-center">
            <div className="w-[400px] h-80 p-10 block bg-rgba rounded-lg ">
                <h1 className="text-center text-[#8b5c7e] text-[29px]
                            text-bold tracking-[1px] uppercase  mb-5 ">
                    Login Room
                </h1>
                <form action="/room" method="GET">
                    <div className=" ">
                        <input
                            className="w-full text-white bg-transparent p-3 mb-3
                         border border-white outline-0 placeholder:text-white"
                            type="email"
                            placeholder="Nhập email" required
                            onChange={e => setUser((prev) => {
                                return {
                                    ...prev,
                                    email: e.target.value
                                }
                            })

                            }
                        />
                    </div>
                    <div className=" ">
                        <input
                            className="w-full text-white bg-transparent p-3 mb-3
                         border border-white outline-0 placeholder:text-white"
                            type="password"
                            placeholder="Nhập password" required
                            onChange={e => setUser((prev) => {
                                return {
                                    ...prev,
                                    password: e.target.value
                                }
                            })}
                        />
                    </div>
                    <button className="p-2 bg-[#f0bcb4] text-white hover:bg-[#8b5c7e] transition-all duration-500"
                    type="submit"
                    >
                        Đăng nhập
                    </button>
                </form>

            </div>
        </div>
    )
}


export default LoginPage