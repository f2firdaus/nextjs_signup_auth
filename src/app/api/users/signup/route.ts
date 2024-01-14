import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModels'
import bcryptjs from 'bcryptjs'
connect();
export async function POST(request:NextRequest) {
    
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);
        const emailid = await User.findOne({ email });
        // const userid = await User.findOne({ username });
        if (emailid ) {
            return NextResponse.json({ error: "User already Registered"});
            
        };
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashPassword
        });
        const savedUser = await newUser.save();
        return NextResponse.json({
            message: "user created Successfully",
            success: true,
            savedUser
        })

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
    

}