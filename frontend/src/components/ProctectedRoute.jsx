import React from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProctectedRoute = ({children}) => {
  const {user} = useSelector(store=>store.auth)
  const navigate = useNavigate()
  return (
    <div>
      {
        user? children : navigate('/login')
      }
    </div>
  )
}

export default ProctectedRoute