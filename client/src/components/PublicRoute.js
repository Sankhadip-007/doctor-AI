import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
    if (localStorage.getItem("token")){
        return <Navigate to="/"></Navigate>
    }else{
        return children
    }
}

export default PublicRoute