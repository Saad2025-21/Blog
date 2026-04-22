import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { setUser } from '../redux/authslice'
import TotalProperty from '@/components/TotalProperty'

const Profile = () => {
  const dispatch = useDispatch()
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);
  const { user } = useSelector(store => store.auth)
  const [input, setinput] = useState({
    firstName: user?.firstname,
    lastName: user?.lastname,
    bio: user?.bio,
    occupation: user?.occupation,
    file: user?.photoUrl
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target
    setinput((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const changeFileHandler = (e) => {
    setinput({ ...input, file: e.target.files?.[0] })
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append("firstname", input.firstName)
    formdata.append("lastname", input.lastName)
    formdata.append("bio", input.bio)
    formdata.append("occupation", input.occupation)
    if (input?.file) {
      formdata.append("file", input.file)
    }
    try {
      setloading(true)
      const res = await axios.put('https://blog-spiy.onrender.com/api/v1/user/profile/update', formdata, {
        headers: {
          "Content-Type": "applicaton/json"
        },
        withCredentials: true,
      })
  
      if (res.data.success) {
        setopen(false)
        toast.success(res.data.message)
        dispatch(setUser(res.data.user))
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      setloading(false)
    }
  }
  return (
    <div className='pt-20 md:ml-80 md:h-screen'>
      <div className='max-w-6xl mx-auto mt-8 '>
        <Card className=" flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
          {/* image section */}
          <div className='flex flex-col items-center justify-center md:w-100'>
            <Avatar className="w-40 h-40 border-2">
              <AvatarImage src={user?.photoUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className='text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3'>
              {user?.occupation || "Mern Stack Developer"}</h1>

          </div>
          {/* info section */}
          <div>
            <h1 className='font-bold text-center md:text-start text-4xl mb-7'>Welcome {user?.firstName}!</h1>
            <p className=''><span className='font-semibold'>Email : </span>{user?.email}</p>
            <div className='flex flex-col gap-2 items-start justify-start my-5'>
              <Label className="">About Me</Label>
              <p className='border dark:border-gray-600 p-6  rounded-lg'>{user?.bio || "I'm a passionate web developer and nature lover curious to explor the gems earth holds. When I'm not coding, you can find me writing about nature, hiking, or experimenting with new recipes."}</p>

            </div>

            <Dialog open={open} onOpenChange={setopen} >
              <Button onClick={() => setopen(true)} >Edit Profile</Button>
              <DialogContent className="md:w-106.25 ">
                <DialogHeader>
                  <DialogTitle className="text-center">Edit Profile</DialogTitle>
                  <DialogDescription className="text-center">
                    Make changes to your profile here.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='flex gap-2'>
                    <div>
                      <Label htmlFor="name" className="text-right">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={input.firstName}
                        onChange={changeEventHandler}
                        placeholder="First Name"
                        type="text"
                        className="col-span-3 text-gray-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="name" className="text-right">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={input.lastName}
                        onChange={changeEventHandler}
                        placeholder="Last Name"
                        className="col-span-3 text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="name" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="bio"
                      value={input.bio}
                      onChange={changeEventHandler}
                      name="bio"
                      placeholder="Enter a description"
                      className="col-span-3 text-gray-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="name" className="text-right">
                      Occupation
                    </Label>
                    <Textarea
                      id="occupation"
                      value={input.occupation}
                      onChange={changeEventHandler}
                      name="occupation"
                      placeholder="Enter a description"
                      className="col-span-3 text-gray-500"
                    />
                  </div>
                  <div >
                    <Label htmlFor="name" className="text-right">
                      Picture
                    </Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={changeFileHandler}
                      className="w-69.25"
                    />
                  </div>
                </div>
                <DialogFooter>
                  {
                    loading ? <Button ><Loader2 className='mr-2 w-4 h-4 animate-spin' /> Please wait</Button> : <Button
                      onClick={submitHandler} >Save Changes</Button>
                  }

                </DialogFooter>
              </DialogContent>
            </Dialog>


          </div>
        </Card >
      </div >
      <TotalProperty />
    </div >
  )
}

export default Profile