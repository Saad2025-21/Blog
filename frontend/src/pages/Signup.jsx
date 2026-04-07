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
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../redux/authslice";
import { Loader2 } from "lucide-react";

export default function SignUp() {
  const [showpassword, setshowpassword] = useState();
  const [user, setuser] = useState({
    firstname: "",
    lastname: "",
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
      const res = await axios.post('http://localhost:3000/api/v1/user/register', user, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })

      if (res.data.success) {
        navigate('/login')

        toast.success(res.data.message)
      }

      console.log(res)
      setuser({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      })
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }



  }
  return (
    <div className="min-h-screen bg-[#e8eaed] flex items-center justify-center px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-md px-4">

        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-gray-900 tracking-tight">
            Create an account
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 mt-1">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent >
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* First Name & Last Name */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5 w-1/2">
                <Label className="text-sm font-semibold text-gray-800">
                  First Name
                </Label>
                <Input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  className="h-10 text-sm border-gray-300 rounded-md placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-400"
                  value={user.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1.5 w-1/2">
                <Label className="text-sm font-semibold text-gray-800">
                  Last Name
                </Label>
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  className="h-10 text-sm border-gray-300 rounded-md placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-400"
                  value={user.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-semibold text-gray-800">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="john.doe@example.com"
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
                  placeholder="Create a Password"
                  className="h-10 text-sm border-gray-300 rounded-md placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-400 pr-10"
                  value={user.password}
                  onChange={handleChange}
                />
                <button onClick={() => setshowpassword(!showpassword)} type="button" className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer">
                  {showpassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <Button className="w-full h-10 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-md mt-1"
              type="submit">
              {
                loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  </>
                ) : ("Sign Up")
              }

            </Button>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-gray-800 font-medium underline underline-offset-2 hover:text-gray-600 transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}