import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import User from "@/models/userModels";
import jwt from 'jsonwebtoken'
connect()
export async function POST(request: NextRequest) {
    
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({error:"User doesn't Exist"},{status:400})
        }
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({error:"Invalid Password"},{status:400})
        };;
        const tokenData = {
            id: user._id,
            username: user.username,
            email:user.email
        }
        const token = await jwt.sign(tokenData, process.
            env.TOKEN_SECRET!, { expiresIn: "1d" })
        const response = NextResponse.json({
            message: "Login",
            success:true
        })
        response.cookies.set("token", token, {
            httpOnly:true,
        })
        return response;

    } catch (error:any) {
        return NextResponse.json({message:error})
    }
}