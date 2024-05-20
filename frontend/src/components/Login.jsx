import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '..';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: ""
    })
  }
  return (
    <>
      <form action="" onSubmit={onSubmitHandler}>
        <div className=" bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
          <div className=" p-4 flex flex-col gap-4 justify-center items-center">
            <h1 className="text-2xl text-white">Login</h1>

            <input
              type="text"
              placeholder="Username"
              className="px-2 py-1 rounded-md outline-none"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="px-2 py-1 rounded-md outline-none"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <button
              type="submit"
              className="bg-[#00D7C0] text-white w-full py-1 rounded-md font-semibold hover:bg-[#13bead]"
            >
              Login
            </button>
            <span className="text-white">
              Don't have an account?{' '}
              <Link className="text-[#00D7C0]" to={'/signup'}>
                Signup
              </Link>{' '}
            </span>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login