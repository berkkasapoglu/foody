import { useAuth } from "../../context/authContext"
import { Navigate } from "react-router-dom"
import Spinner from "../layout/Spinner"
import { toast } from "react-toastify"
import { Outlet } from "react-router-dom"
function ProtectedRoute() {
  const { auth, checkingStatus } = useAuth()
  if (checkingStatus) return <Spinner />
  if (auth.isAuthenticated) {
    return <Outlet />
  } else {
    toast.error("You should logged in first.")
    return <Navigate to="/sign-in" />
  }
}
export default ProtectedRoute
