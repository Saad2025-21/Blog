import { EyeOff, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/authslice";

export default function SignUp() {
  const [showpassword, setshowpassword] = useState();
  const [user, setuser] = useState({
    email: "",
    password: ""
  });
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
      const res = await axios.post('http://localhost:3000/api/v1/user/login', user, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })

      if (res.data.success) {
        navigate('/')
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)
      }

      console.log(res)
      setuser({
        email: "",
        password: ""
      })
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }



  }

  return (
    <div className="min-h-screen bg-[#e8eaed] flex items-center justify-center px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-md px-4">

        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-gray-900 tracking-tight">
            Login into your account
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 mt-1">
            Enter your details below to login your account
          </CardDescription>
        </CardHeader>

        <CardContent >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-semibold text-gray-800">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="h-10 text-sm border-gray-300 rounded-md placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-400"
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
                  className="h-10 text-sm border-gray-300 rounded-md placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-400 pr-10"
                  value={user.password}
                  onChange={handleChange}
                />
                <button onClick={() => setshowpassword(!showpassword)} type="button" className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" >
                  {showpassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <Button className="w-full h-10 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-md mt-1">
              Login
            </Button>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-gray-800 font-medium underline underline-offset-2 hover:text-gray-600 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}