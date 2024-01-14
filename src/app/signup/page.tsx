'use client'

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignupPage = () => {
    const router =useRouter()
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading,setLoading] =useState(false)

    const onSignup =async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            if (response) {
                router.push('/login')
            }
        } catch (error: any) {
            console.log("Sign up failed")
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        }
        
    },[user])
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>{ loading ?"Processing":"SignUp"}</h1> <hr />
                <label htmlFor="">username</label>
                <input className="p-2 rounded-lg" type="text" name="username" id="username" value={user.username}
                onChange={(e)=>setUser({...user,username:e.target.value})}
                placeholder="username" />
                 <label htmlFor="">email</label>
                <input className="p-2 rounded-lg" type="email" name="email" id="email" value={user.email}
                onChange={(e)=>setUser({...user,email:e.target.value})}
                placeholder="email" />
                 <label htmlFor="">password</label>
                <input className="p-2 rounded-lg" type="password" name="password" id="password" value={user.password}
                onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="password"
                />
                <button onClick={onSignup} className="p-2 mt-2 border border-gray-300 rounded-lg mb-4 focus:outline-none">{ buttonDisabled?"No Signup":'Signup'}</button>
                <Link href='/login'>Vist login page</Link>
        </div>
        </>
    )
}
export default SignupPage;