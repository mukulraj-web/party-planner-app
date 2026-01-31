import bcrypt from "bcryptjs";
import { errorResponse, sucessRespose } from "./response";
import jwt from "jsonwebtoken"


export async  function hashPassword(plainPassword : string)
{
    try {
       const hashedpassword = await bcrypt.hash(plainPassword, 10)
       return sucessRespose("sucessfull hashed the password", hashedpassword ,200)
    } catch (e) {
       errorResponse("failede to hash the password" , 400)
    }
}
export async function comparePassword(password : string, hashedpassword: string)
{
    try {
        const res = await bcrypt.compare(hashedpassword, password);
        return sucessRespose("succefully compared the passsword")

    } catch (e) {
        return errorResponse("failed to compare the password", 400)
    }
}

// token
const jwtSecret= process.env.JWT_SECRET

export  function generateToken(payload: {id: string ,email:string }){
    if(!jwtSecret){
    return errorResponse("the secret is not fetched")
}
    return jwt.sign(payload, jwtSecret, {
        expiresIn:"1h"
    })
}

export function verifyToken(token:string){
    if(!jwtSecret)
        return errorResponse("the secret is not fetched")
    return jwt.verify(token, jwtSecret)
}