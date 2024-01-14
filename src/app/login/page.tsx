'use client'

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {

  const [user, setUser] = useState({
    email: '',
    password:''
  });
  const [loading, setLoading] = useState(false);
  const router =useRouter()
  const onLogin = async () => {
    try {
      setLoading(true)
      const res = await axios.post('/api/users/login',user);
      console.log("Login Successfull",res.data);
      router.push('/profile')
    } catch (error:any) {
      console.log("Login Failed",error.message)
    } finally {
      setLoading(false)
    }
    
    
    
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{ loading?"processing":'Login'}</h1> <hr />
    
     <label htmlFor="">email</label>
    <input className="p-2 rounded-lg" type="email" name="email" id="email" value={user.email}
    onChange={(e)=>setUser({...user,email:e.target.value})}
    placeholder="email" />
     <label htmlFor="">password</label>
    <input className="p-2 rounded-lg" type="password" name="password" id="password" value={user.password}
    onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="password"
    />
    <button onClick={onLogin} className="p-2 mt-2 border border-gray-300 rounded-lg mb-4 focus:outline-none">Login</button>
    <Link href='/signup'>Vist Signup page</Link>
</div>
  );
}
