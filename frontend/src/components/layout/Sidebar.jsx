import SidebarItem from "./SidebarItem"
import defaultProfile from "../../assets/defaultProfile.png"
import { GiCook, GiOpenBook, GiHearts } from "react-icons/gi"
import { MdTrackChanges } from "react-icons/md"
import { MdAccountCircle } from "react-icons/md"
import { AiOutlineClose } from "react-icons/ai"
import { NavLink, Link } from "react-router-dom"
import { useAuth } from "../../context/authContext"
import { useEffect, useRef } from "react"

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const { auth } = useAuth()
  useEffect(() => {
    const closeSidebar = (e) => {
      if (!sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false)
      }
    }
    document.addEventListener("mousedown", closeSidebar)
    return () => {
      document.removeEventListener("mousedown", closeSidebar)
    }
  })
  const sidebarRef = useRef()
  return (
    <nav
      className={`fixed ${
        isSidebarOpen ? "-left-0" : "-left-[250px]"
      } transition-all duration-300 transition- md:left-0 top-0 py-8 bg-white w-[250px] h-full z-10`}
      ref={sidebarRef}
    >
      <AiOutlineClose
        onClick={() => setIsSidebarOpen(false)}
        className="absolute top-4 right-4 cursor-pointer text-lg transition md:hidden hover:text-primary"
      />
      <h3>
        <Link to="/" className="block font-bold text-2xl text-center cursor-pointer">
          Foody
        </Link>
      </h3>
      <div className="flex flex-col items-center mt-10 mb-20">
        <img src={defaultProfile} alt="" className="w-[75px] mb-3" />
        <h3 className="font-bold">
          {auth && auth.isAuthenticated ? auth.username : "Default"}
        </h3>
        <p className="text-sm text-slate-500 mb-3">Chef</p>
        <span className="rounded-lg shadow-lg py-1 px-4 align-middle">
          <GiCook className="inline-block text-primary align-[-2px]" />
          <span className="leading-5 ml-1 font-bold text-md">37</span>
        </span>
      </div>
      <div>
        <NavLink
          to="/"
          children={({ isActive }) =>
            isActive ? (
              <SidebarItem active={true} icon={GiOpenBook} name={"Recipes"} />
            ) : (
              <SidebarItem icon={GiOpenBook} name={"Recipes"} />
            )
          }
        />
        <NavLink
          to="/favorites"
          children={({ isActive }) =>
            isActive ? (
              <SidebarItem active={true} icon={GiHearts} name={"Favorites"} />
            ) : (
              <SidebarItem icon={GiHearts} name={"Favorites"} />
            )
          }
        />

        <NavLink
          to="/tracker"
          children={({ isActive }) =>
            isActive ? (
              <SidebarItem
                active={true}
                icon={MdTrackChanges}
                name={"Meal Planner"}
              />
            ) : (
              <SidebarItem icon={MdTrackChanges} name={"Meal Planner"} />
            )
          }
        />
        <NavLink
          to="/profile"
          children={({ isActive }) =>
            isActive ? (
              <SidebarItem
                active={true}
                icon={MdAccountCircle}
                name={"Profile"}
              />
            ) : (
              <SidebarItem icon={MdAccountCircle} name={"Profile"} />
            )
          }
        />
      </div>
      <div className="px-3 mb-5 text-center absolute bottom-0 w-full">
        <Link
          to="/recipes/new"
          className="block mb-2 w-full py-2 px-5 bg-primary rounded-md text-body font-bold transition hover:bg-red-700"
        >
          Create Recipe
        </Link>
      </div>
    </nav>
  )
}
export default Sidebar
