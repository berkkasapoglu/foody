import { useState, useEffect } from "react"

export const useLocalStorage = (key, initialValue=null) => {
  const [data, setData] = useState(() => {
    if(typeof window !== 'undefined') {
      const saved = localStorage.getItem(key)
      return JSON.parse(saved) || initialValue
    } else {
      return initialValue
    }
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data))
  }, [data, key])
  return [data, setData]
}