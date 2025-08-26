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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
                <form 
                    onSubmit={submitHandler} 
                    className="w-full md:w-1/2 bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-2xl p-8 my-12 shadow-2xl transition transform hover:scale-[1.01] duration-300"
                >
                    <h1 className="font-bold text-3xl text-center mb-6 text-indigo-400 tracking-wide animate-fadeIn">
                        Welcome Back 👋
                    </h1>

                    <div className="my-4">
                        <Label className="text-slate-300">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="you@example.com"
                            className="mt-2 bg-slate-900/60 border-slate-700 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 transition rounded-lg"
                        />
                    </div>

                    <div className="my-4">
                        <Label className="text-slate-300">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="••••••••"
                            className="mt-2 bg-slate-900/60 border-slate-700 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 transition rounded-lg"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-6">
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
                                <Label className="text-slate-300">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer accent-indigo-500"
                                />
                                <Label className="text-slate-300">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {
                        loading ? (
                            <Button className="w-full my-6 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button 
                                type="submit" 
                                className="w-full my-6 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-transform transform hover:scale-105"
                            >
                                Login
                            </Button>
                        )
                    }

                    <p className="text-sm text-center text-slate-400">
                        Don&apos;t have an account? 
                        <Link to="/signup" className="ml-1 text-indigo-400 hover:underline">
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
