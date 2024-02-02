"use client"
import Link from "next/link"
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
    const fetchLogin = async (data: {
        email: string
        password: string
    }) => {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'API-Key': process.env.DATA_API_KEY!,
            },
            body: JSON.stringify(data)
        })
        const result = await res.json()
        return result
    }
    const submit = () => {
      fetchLogin(user)
    }
    return (

        <div className="w-full h-[100vh] bg-bg-image bg-cover flex justify-center items-center">
            <div className="w-[400px] h-80 p-10 block bg-rgba rounded-lg ">
                <h1 className="text-center text-[#8b5c7e] text-[29px]
                            text-bold tracking-[1px] uppercase  mb-5 ">
                    Login Room
                </h1>
                <form method="POST">
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
                <div className="flex items-center justify-between">
                    <button className="p-2 bg-[#f0bcb4] text-white hover:bg-[#8b5c7e] transition-all duration-500"

                        onClick={submit}
                    >
                        Đăng nhập
                    </button>
                    <Link
                        className="underline text-blue-800"
                        href="/register"
                    >
                        Bạn chưa có tài khoản?
                    </Link>
                </div>

                </form>

            </div>
        </div>
    )
}


export default LoginPage