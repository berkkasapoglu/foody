import { Outlet } from "react-router-dom"
import { useUser } from "../../hooks/useUser"

function AdminRoute() {
  const { data: user } = useUser({})
  if (user && user.role==="admin") {
    return <Outlet />
  }
}
export default AdminRoute
