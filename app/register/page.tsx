"use client"
import React, { use, useEffect, useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
interface IRegister {

}
const RegisterPage = () => {
    const {data} = useSession()
    const router = useRouter()
    useEffect(() => {
      if (data) {
        router.push("/room");
      }
  
    }, [data]);
    const randomID = () => { return Math.random().toString(36).slice(2) }
    const initUser = {
        id: randomID(),
        email: "",
        name: "",
        password: ""
    }
    const [registerUser, setRegisterUser] = useState<
        {
            email: string
            name: string
            password: string
        }
    >(initUser)
    const [alert, setAlert] = useState({
        status: '',
        message: ''
    })
    const fetchRegister = async (data: {
        name: string,
        email: string,
        password: string
    }) => {
        const res = await fetch('/api/auth/register', {
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
    const register = () => {
        try {
            fetchRegister(registerUser)
            setAlert({ status: 'success', message: 'Signup successfully' })
            setRegisterUser({ ...initUser })
        } catch (error) {
            setAlert({ status: 'error', message: 'Something went wrong' })
        }
       
    }

    return (

        <div className="w-full h-[100vh] bg-bg-image bg-cover flex justify-center items-center">
            <div className="w-[400px] h-[380px] p-10 block bg-rgba rounded-lg ">
                <h1 className="text-center text-[#8b5c7e] text-[29px]
                            text-bold tracking-[1px] uppercase  mb-5 ">
                    REGISTER
                </h1>
                {alert.message &&
                    <div style={{
                        color: alert.status === 'success' ? 'green' : 'red',
                        fontWeight: 'bold'
                    }}>
                        {alert.status === 'success' ? '✅' : '❌'} {alert.message}
                    </div>
                }
                <form onSubmit={register}>
                    <div className=" ">
                        <input
                            className="w-full text-white bg-transparent p-3 mb-3
                         border border-white outline-0 placeholder:text-white"
                            type="email"
                            placeholder="Nhập Email" required
                            onChange={e => setRegisterUser((prev) => {
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
                            type="text"
                            placeholder="Nhập Name" required
                            onChange={e => setRegisterUser((prev) => {
                                return {
                                    ...prev,
                                    name: e.target.value
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
                            placeholder="Nhập Password" required
                            onChange={e => setRegisterUser((prev) => {
                                return {
                                    ...prev,
                                    password: e.target.value
                                }
                            })}
                        />
                    </div>
                    <button className=" p-2 bg-[#f0bcb4] text-white hover:bg-[#8b5c7e] transition-all duration-500"
                     type="submit"
                    >
                        Đăng kí
                    </button>
                </form>
                <div className="text-white text-center" >
                    Already have an account?
                    <Link className="text-blue-700 underline" href="/login">Login here</Link>
                </div>
            </div>
        </div>
    )
}


export default RegisterPage