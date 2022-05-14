import { useState, useEffect } from "react"

export const useLocalStorage = (key, initialValue=null) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(key)
    return JSON.parse(saved) || initialValue
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data))
  }, [data, key])
  return [data, setData]
}