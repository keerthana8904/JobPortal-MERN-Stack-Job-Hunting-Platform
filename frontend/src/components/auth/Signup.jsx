import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });
  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form 
          onSubmit={submitHandler} 
          className="w-full md:w-1/2 bg-slate-800/50 border border-slate-700 rounded-xl p-6 my-12 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:border-indigo-500"
        >
          <h1 className="font-extrabold text-3xl mb-6 text-center bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent animate-fade-in">
            Create an Account
          </h1>

          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Full Name</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="John Doe"
                className="mt-1 bg-slate-900/50 border-slate-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label className="text-gray-300">Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="johndoe@gmail.com"
                className="mt-1 bg-slate-900/50 border-slate-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label className="text-gray-300">Phone Number</Label>
              <Input
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="8080808080"
                className="mt-1 bg-slate-900/50 border-slate-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <Label className="text-gray-300">Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="********"
                className="mt-1 bg-slate-900/50 border-slate-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 my-4">
              <RadioGroup className="flex items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                    className="cursor-pointer accent-indigo-500"
                  />
                  <Label className="text-gray-300">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                    className="cursor-pointer accent-purple-500"
                  />
                  <Label className="text-gray-300">Recruiter</Label>
                </div>
              </RadioGroup>

              <div className="flex items-center gap-3">
                <Label className="text-gray-300">Profile</Label>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-6 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-6 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300">
              Signup
            </Button>
          )}

          <p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 transition">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
