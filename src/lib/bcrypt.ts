import bcrypt from "bcryptjs";
import { errorResponse, sucessRespose } from "./response";



export async  function hashPassword(plainPassword : string)
{
    try {
      return await bcrypt.hash(plainPassword, 10)
    //    return sucessRespose("sucessfull hashed the password", hashedpassword ,200)
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
