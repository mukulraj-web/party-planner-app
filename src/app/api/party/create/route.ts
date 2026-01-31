import { Prisma } from "@prisma/client";
import { sucessRespose, errorResponse } from "@/lib/response";
import { prisma } from "@/lib/prisma";

function generatePartyCode(): number {
    return Math.floor(10000 + Math.random() * 9000)

}

export async function POST(req:Request) {
    try {
        // get logged in user from middleware
        const userHeader = req.headers.get("x-user")
        if(!userHeader){
            return errorResponse("unauthorized access", 401)
        }
        const user = JSON.parse(userHeader)
        const adminId = user.id

        const body = await req.json()
        const {name} = body
        if(!name) {
            return errorResponse("Party name is required ", 400

            )
        }
        // generate unique 5-digit party code
        let partyCode: number;
        let isUnique = false;
        while(!isUnique) {
            partyCode = generatePartyCode();
            const existingparty = await prisma.party.findUnique({
                where: {id: partyCode},
            })
            if(!existingparty){
                isUnique = true
            }
        }
        // create party
        const party = await prisma.party.create({
            data: {
                id: partyCode!,
                name,
                adminId,
                members:{
                    connect: {id:adminId}
                }
            }
        })
        return sucessRespose("party created",party, 201)

    } catch(e){
        return errorResponse("the party is not creating", 400)

    }
    
}