import React, { useEffect, useState, useContext } from "react"
import { getAuthData } from "../services/auth"
const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false })
  const [checkingStatus, setCheckingStatus] = useState(true)
  useEffect(() => {
    const authData = getAuthData()
    if (authData && authData.token) {
      setAuth({
        ...authData,
        isAuthenticated: true,
      })
    }
    setCheckingStatus(false)
  }, [])
  
  return (
    <AuthContext.Provider value={{ auth, setAuth, checkingStatus }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider  }
