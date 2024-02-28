"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
 const LoginPage = () => {
    const {data} = useSession()
    const router = useRouter()
    useEffect(() => {
      if (data) {
        router.push("/room");
      }
  
    }, [data]);

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(false)
    const handleLogin = async (e:any) => {
      e.preventDefault();
  
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
  
      if (result?.error) {
        setError(true)
      } else {
        router.push("/room");
      }
    };
  
    
    return (

        <div className="w-full h-[100vh] bg-bg-image bg-cover flex justify-center items-center">
            <div className="w-[400px] h-80 p-10 block bg-rgba rounded-lg ">
                <h1 className="text-center text-[#8b5c7e] text-[29px]
                            text-bold tracking-[1px] uppercase  mb-5 ">
                    Login Room
                </h1>
                {
                  error?<p className="text-red-700 text-center font-bold">Tài khoản hoặc mật khẩu sai!</p>:<></>
                }
                <form onSubmit={handleLogin}>
                <div className=" ">
                    <input
                        className="w-full text-white bg-transparent p-3 mb-3
                         border border-white outline-0 placeholder:text-white"
                        type="email"
                        placeholder="Nhập email" required
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className=" ">
                    <input
                        className="w-full text-white bg-transparent p-3 mb-3
                         border border-white outline-0 placeholder:text-white"
                        type="password"
                        placeholder="Nhập password" required
                        onChange={e =>setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button className="p-2 bg-[#f0bcb4] text-white hover:bg-[#8b5c7e] transition-all duration-500"
                    type="submit"
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