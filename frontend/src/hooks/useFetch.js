import { useState, useEffect } from "react"

export const useFetch = (url, initialValue=null) => {
  const [data, setData] = useState(initialValue)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(url)
        if(!res.ok) throw Error(res.statusText)
        const result = await res.json()
        if (result.success) {
          setData(result.data)
        }
      } catch(e) {
        console.log(e)
      }
      setLoading(false)
    }
    fetchData()
  }, [url])
  return { data, loading }
}
