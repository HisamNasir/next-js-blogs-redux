'use client'
import React, { useState } from 'react'
import { addUser } from './UserReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation';

const Create = () => {
  const router = useRouter();
  const [name, setName]=useState('')
  const [paragraph, setparagraph]=useState('')
  const users=useSelector((state)=>state.users);
  const dispatch=useDispatch();
  const handleSubmit=(event)=>{
    event.preventDefault();
    dispatch(addUser({id:users[users.length-1].id+1, name, paragraph}))
    router.push('/');
  }

  return (
    <div className=''>
      <form onSubmit={handleSubmit}>
        <div className='p-4 space-y-2 flex flex-col'>
          <label htmlFor='name'>Title</label>
          <input onChange={(e)=>setName(e.target.value)} type='text' name='name' className='form-control rounded-2xl p-4'/>
        </div>
        <div className='p-4 space-y-2'>
          <label className='' htmlFor='paragraph'>Paragraph</label>
<textarea onChange={(e)=>setparagraph(e.target.value)} name='paragraph'  id="message" rows="22" class="block p-2.5 w-full text-sm  rounded-lg border border-gray-300 focus:none " placeholder="Write your thoughts here..."></textarea>
        </div>
        <button className='p-8 w-full fixed bottom-0  bg-green-400'>Submit</button>
      </form>
    </div>
  )
}

export default Create