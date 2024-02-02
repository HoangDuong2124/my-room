import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
export async function GET(req: Request, { params }: {
    params: { id: string }
}) {
    try {
        const getByID = await prisma.messenger.findMany({
            where: {
                idRoom: params.id
            },
            orderBy: {
                sentAt: "asc"
            },
            include: {
                user: {
                    select: {
                        id: true, name: true

                    }
                }
            }
        })
        return NextResponse.json(getByID)
    } catch (error) {
        return NextResponse.json({ message: "Failed" }, { status: 400 })
    }

} 