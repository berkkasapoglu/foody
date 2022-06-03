import { useRef, useEffect } from "react"

function DropdownMenu({ children, setIsDropdownOpen }) {
  const dropdownMenuRef = useRef()
  useEffect(() => {
    const closeDropdownMenuHandler = (e) => {
      if(dropdownMenuRef.current && !dropdownMenuRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", closeDropdownMenuHandler)
    return () => {
      document.removeEventListener("mousedown", closeDropdownMenuHandler)
    }
  })
  return (
    <div className="bg-white py-3 rounded-md absolute top-5 right-0 z-10" ref={dropdownMenuRef}>
      {children}
    </div>
  )
}
export default DropdownMenu
