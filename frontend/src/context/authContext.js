import React, { useEffect, useState, useContext } from "react"
import { getAuthData } from "../services/auth"
const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false })
  useEffect(() => {
    const authData = getAuthData()
    if (authData && authData.token) {
      setAuth({
        ...authData,
        isAuthenticated: true,
      })
    }
  }, [])
  
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider  }
