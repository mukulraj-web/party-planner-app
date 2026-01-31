// export function GET(){
//     return Response.json({
//         message:"signup"
//     })
// }

import {prisma} from "@/lib/prisma"
import { hashPassword } from "@/lib/bcrypt"
import { generateToken } from "@/lib/jwt"
import { sucessRespose, errorResponse } from "@/lib/response"

export async function POST(req: Request){
    try {
        alert("console")
    const body = await req.json();
    const {name, email, username, password} = body
    // basic validation
    if(!name || !email || !username || !password)
        return errorResponse("All fields are required", 400)
    // Check for user already exists
    const existingUser =await prisma.user.findFirst({
        where:{
            OR: [{email}, {username}]
        }
    })
    if(existingUser){
        return errorResponse("User already exists", 409)
    }
    // hash the password
    const hashedPassword = await hashPassword(password)
    if(!hashedPassword) {
        return errorResponse("not got the hashed password in route", 400)
    }
    // create the user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            username,
            password : hashedPassword
        }
    })
    // generate JWT
    const token = generateToken({
        id : user.id,
        email:user.email
    })
    // return response
   return sucessRespose(
    "user created successfully",
      {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
        },
      },
      201
    );
    } catch (e) {
        return errorResponse("Internal server error", 500)

    }
}