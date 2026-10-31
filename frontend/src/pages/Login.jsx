import { EyeOff, Eye, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import api from "@/lib/axios";
import { setLoading, setUser } from "../redux/authslice";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";

export default function Login() {
  const [showpassword, setshowpassword] = useState();
  const [user, setuser] = useState({
    email: "",
    password: ""
  });
  const { loading } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    setuser((prev) => ({
      ...prev, [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(setLoading(true))
      const res = await api.post('/user/login', user)


      if (res.data.success) {

        dispatch(setUser(res.data.user))
        localStorage.setItem("user", JSON.stringify(res.data.user)) 
        navigate('/')
        toast.success(res.data.message)
      }

    
      setuser({
        email: "",
        password: ""
      })
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      dispatch(setLoading(false))
    }



  }

  return (
    <div className="auth-page auth-login min-h-screen flex items-center justify-center p-6">
      <div className="auth-panel w-full max-w-5xl bg-white overflow-hidden flex flex-col md:flex-row">

        {/* Left: form */}
        <div className="auth-form-panel w-full md:w-1/2 bg-white p-10 md:p-14 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Login into your account
          </h1>
          <p className="text-sm text-gray-500 mt-3 mb-8">
            Enter your details below to login your account
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-semibold text-gray-800">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="h-11 text-sm bg-white border-0 rounded-xl shadow-sm placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-400"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-semibold text-gray-800">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showpassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your Password"
                  className="h-11 text-sm bg-white border-0 rounded-xl shadow-sm placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-400 pr-10"
                  value={user.password}
                  onChange={handleChange}
                />
                <button onClick={() => setshowpassword(!showpassword)} type="button" className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" >
                  {showpassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <Link to="/forgot-password" className="text-xs text-gray-500 hover:text-gray-700 self-end mt-1">
                Recovery Password
              </Link>
            </div>

            {/* Sign In Button */}
            <Button className="w-full h-11 bg-[#ccf0ff] text-[#33c2ff]  hover:bg-[#33c2ff] hover:text-white text-sm font-semibold rounded-xl mt-1">
              {
                loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  </>
                ) : ("Sign In")
              }
            </Button>

          

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-500 mt-2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-gray-800 font-medium underline underline-offset-2 hover:text-gray-600 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}