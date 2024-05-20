import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';
 
const Sidebar = () => {
    const [search, setSearch] = useState("");
    const {otherUsers} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    }
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]));
        }else{
            toast.error("User not found!");
        }
    }
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
      <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-3'>
        <input type="text" className='input input-bordered bg-slate-200 text-black rounded-full' placeholder='search' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <button type='submit' className='btn btn-zinc-700 bg-slate-100 text-black rounded-full'>
          <IoSearchSharp />
        </button>
      </form>
      <div className='divider px-3 '></div>
       <div className='overflow-auto flex-1'>
        <OtherUsers/>
       </div>
       <div>
        <button className='btn btn-sm text-white bg-[#00D7C0] text-semibold my-3' onClick={logoutHandler}>Logout</button>
       </div>
    </div>
    )
}

export default Sidebar