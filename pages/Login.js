import React, { useState } from 'react'
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../redux/features/userSlice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../firebase"
// import { useHistory } from 'react-router-dom';
import { useRouter } from 'next/router'

  
  const Login = () => {
    const [lEmail, setlEmail]=useState("");
    const [lPassword, setlPassword]=useState("");
    const history = useRouter();
    const [registrationError, setRegistrationError] = useState(null);
    const log=async()=>{
      try{
        const user=await signInWithEmailAndPassword(auth, lEmail, lPassword)
        history.push('/homepage');
      } catch (error){
        alert(error.message);
        setRegistrationError(error.message);
      }
    };


  return (
    <div  className='p-6 w-full h-screen flex flex-col items-center justify-center'>
      <div className=' rounded-2xl flex flex-col bg-slate-300'>
        <form className='p-6 pb-2 sm:w-[300px] md:w-[600px] rounded-2xl flex flex-col space-y-2 bg-slate-300'>
        <label className='text-black'>Email</label>
        <input onChange={(e)=>setlEmail(e.target.value)} className='p-2 rounded-lg' type='email' placeholder='example@mail.com'/>
        <label className='text-black'>Password</label>
        <input onChange={(e)=>setlPassword(e.target.value)} className='p-2 rounded-lg' type='password' placeholder='Password'/>
        </form>
        {registrationError && <p className="text-red-500 text-center">{registrationError}</p>}
        <div className=' text-center m-2'>
        <a className='p-2  text-slate-400 hover:text-red-500 hover:font-semibold transition duration-700 text-center' href="/register">Sign Up</a>
        </div>
        <button onClick={log} className=' bg-green-500 p-2 rounded-b-2xl'>login</button>
      </div>
    </div>
  )
}

export default Login