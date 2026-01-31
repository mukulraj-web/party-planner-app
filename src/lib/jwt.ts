import jwt from "jsonwebtoken"
import {  errorResponse } from "./response"
// token
const jwtSecret= process.env.JWT_SECRET

export  function generateToken(payload: {id: any ,email:string }){
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