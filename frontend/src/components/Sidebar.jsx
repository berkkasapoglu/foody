import SidebarItem from "./SidebarItem"
import defaultProfile from "../assets/defaultProfile.png"
import { GiCook, GiOpenBook, GiHearts  } from "react-icons/gi"
import { MdTrackChanges } from "react-icons/md"

function Sidebar() {
  return (
    <nav className="fixed left-0 top-0 py-8 bg-white w-[250px] h-full">
      <h3 className="font-bold text-2xl text-center">Foody</h3>
      <div className="flex flex-col items-center mt-10 mb-20">
        <img src={defaultProfile} alt="" className="w-[75px] mb-3" />
        <h3 className="font-bold">Berk Kasapoglu</h3>
        <p className="text-sm text-slate-500 mb-3">Chef</p>
        <span className="rounded-lg shadow-lg py-1 px-4 align-middle">
          <GiCook className="inline-block text-primary align-[-2px]" />
          <span className="leading-5 ml-1 font-bold text-md">37</span>
        </span>
      </div>
      <div>
        <SidebarItem icon={GiOpenBook} name={"Recipes"} />
        <SidebarItem icon={GiHearts} name={"Favorites"} />
        <SidebarItem icon={MdTrackChanges} name={"Meal Tracker"} />
      </div>
    </nav>
  )
}
export default Sidebar