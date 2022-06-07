import { useState, useEffect } from "react"
import { useAuth } from "../context/authContext"

export const useUser = (initialValue = null, params="") => {
  const [data, setData] = useState(initialValue)
  const [loading, setLoading] = useState(false)
  const { auth } = useAuth()
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await fetch(`/api/users/me?${params}`, {
        headers: {
          authorization: "Bearer " + auth.token,
        },
      })
      const result = await res.json()
      if (result.success) {
        setData(result.data)
      }
      setLoading(false)
    }
    if (auth.isAuthenticated) {
      fetchData()
    }
  }, [auth, params])
  return { data, loading, setData }
}
