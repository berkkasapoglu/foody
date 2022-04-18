import { FiSearch } from "react-icons/fi"

function Search() {
  return (
    <div className="relative">
      <FiSearch size={17} className="absolute top-0 left-0 translate-y-2/3"  />
      <input type="text" placeholder="Enter Recipe..." className="py-2 px-7 border-b-red-200 border-b-2 focus:outline-none focus:border-b-red-700 bg-inherit" />
    </div>
  )
}
export default Search