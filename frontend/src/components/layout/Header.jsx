import { FiSearch } from "react-icons/fi"
import { Link } from "react-router-dom"
import { logout } from "../../services/auth"
import { useAuth } from "../../context/authContext"

function Header() {
  const { auth, setauth } = useAuth()

  const handleLogout = () => {
    logout()
    setauth({isAuthenticated: false})
  }
  return (
    
    <nav className="flex justify-between items-center">
      <div className="relative">
        <FiSearch size={17} className="absolute top-0 left-0 translate-y-2/3" />
        <input
          type="text"
          placeholder="Enter Recipe..."
          className="py-2 px-7 border-b-red-200 border-b-2 focus:outline-none focus:border-b-red-700 bg-inherit"
        />
      </div>
      <div className="flex items-center relative">
        {auth.isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="absolute -left-20 text-sm bg-primary px-2 py-1 font-bold text-white rounded-md"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/sign-up"
            className="absolute -left-20 text-sm bg-primary px-2 py-1 font-bold text-white rounded-md"
          >
            Sign up
          </Link>
        )}
      </div>
    </nav>
  )
}
export default Header
