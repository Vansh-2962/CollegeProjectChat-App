import React, {useState } from 'react'
import { BsSendFill } from "react-icons/bs";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
function SendInput() {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch();
  const {selectedUser} = useSelector(store=>store.user)
  const {messages} = useSelector(store=>store.message)
  
  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/message/send/${selectedUser?._id}`,{message},{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      })
      console.log(res);
      dispatch(setMessages([...messages, res?.data?.newMessage]))
      setMessage('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
   <form onSubmit={onSubmitHandler}>
    <div className='flex items-center gap-1 m-3'>
        <input type="text" placeholder='Send a message' className='border text-sm rounded-full text-black btn-zinc-700 bg-slate-100 w-full p-3 outline-none' value={message} onChange={(e)=>setMessage(e.target.value)}/>
        <button type='submit' className=' flex items-center bg-slate-200 p-3 rounded-full'><BsSendFill/></button>
    </div>
   </form>
  )
}

export default SendInput