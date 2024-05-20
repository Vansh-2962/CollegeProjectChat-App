import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from '..';


const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  }
  return (
    <>
      <form onSubmit={onSubmitHandler}>
     <div className=" bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
        <div className=" p-4 flex flex-col gap-4 justify-center items-center">
          <h1 className="text-2xl text-white">Signup</h1>
          <input
            type="text"
            placeholder="Fullname"
            className="px-2 py-1 rounded-md outline-none"
            value={user.fullName}
            onChange={(e)=>setUser({...user,fullName:e.target.value})}
          />
          <input
            type="text"
            placeholder="Username"
            className="px-2 py-1 rounded-md outline-none"
            value={user.username}
            onChange={(e)=>setUser({...user,username:e.target.value})}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-2 py-1 rounded-md outline-none"
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="px-2 py-1 rounded-md outline-none"
            value={user.confirmPassword}
            onChange={(e)=>setUser({...user,confirmPassword:e.target.value})}
          />
          <div className="flex gap-4">
            <div className="form-control">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  className="checkbox checkbox-accent"
                  checked={user.gender === 'male'}
                  onChange={()=>handleCheckbox('male')}
                />
                <span className="label-text ml-2 text-[1.1rem] text-white">Male</span>
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"   
                  className="checkbox checkbox-accent"
                  checked={user.gender === 'female'}
                  onChange={()=>handleCheckbox('female')}
                />
                <span className="label-text ml-2 text-[1.1rem] text-white">Female</span>
              </label>
            </div>
          </div>
          <button type="submit" className='bg-[#00D7C0] text-white w-full py-1 rounded-md font-semibold hover:bg-[#13bead]'>Signup</button>
          <span className='text-white'>Already have an account? <Link className='text-[#00D7C0]' to={'/login'}>Login</Link> </span>
        </div>
      </div>
     </form>
    
    </>
  )
}

export default Signup