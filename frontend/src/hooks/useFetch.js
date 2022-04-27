import { useState, useEffect } from "react"

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url)
      const result = await res.json()
      if (result.success) {
        setData(result.data)
      }
      setLoading(false)
    }
    fetchData()
  }, [url])
  return { data, loading }
}
