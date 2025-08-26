import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-800">
            <div className="flex items-center justify-between mx-auto max-w-7xl px-6 h-16">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-1 group">
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Job
                        <span className="text-indigo-400 group-hover:text-indigo-300 transition">
                            Portal
                        </span>
                    </h1>
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-10">
                    <ul className="flex font-medium items-center gap-6 text-slate-200">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link className="hover:text-indigo-400 transition" to="/admin/companies">
                                        Companies
                                    </Link>
                                </li>
                                <li>
                                    <Link className="hover:text-indigo-400 transition" to="/admin/jobs">
                                        Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link className="hover:text-indigo-400 transition" to="/">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link className="hover:text-indigo-400 transition" to="/jobs">
                                        Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link className="hover:text-indigo-400 transition" to="/browse">
                                        Browse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Auth Buttons */}
                    {!user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button
                                    variant="outline"
                                    className="rounded-lg px-5 py-2 border-slate-600 text-gray-800 hover:bg-blue-300"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 shadow-md">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer ring-2 ring-indigo-500/40 hover:ring-indigo-400 transition">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 shadow-lg rounded-xl p-4 bg-slate-800 border border-slate-700 text-slate-200">
                                <div className="space-y-3">
                                    <div className="flex gap-3 items-center">
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-semibold text-white">{user?.fullname}</h4>
                                            <p className="text-sm text-slate-400">{user?.profile?.bio}</p>
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-700 pt-3 space-y-2">
                                        {user && user.role === "student" && (
                                            <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-400 transition">
                                                <User2 size={18} />
                                                <Button variant="link" className="text-indigo-400 hover:text-indigo-300">
                                                    <Link to="/profile">View Profile</Link>
                                                </Button>
                                            </div>
                                        )}

                                        <div
                                            className="flex items-center gap-2 cursor-pointer hover:text-rose-500 transition"
                                            onClick={logoutHandler}
                                        >
                                            <LogOut size={18} />
                                            <Button variant="link" className="text-rose-400 hover:text-rose-500">
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
