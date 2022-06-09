import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { AiOutlineArrowDown } from "react-icons/ai"
import DropdownMenu from "../layout/DropdownMenu"
import DropdownItem from "../layout/DropdownItem"
const options = [
  {
    name: "Suggested",
    sortParam: "",
  },
  { name: "Calories: Low to High", sortParam: "calories_by_asc" },
  { name: "Calories: High to Low", sortParam: "calories_by_desc" },
]

function SortBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const currentSortOption = options.find((item) => {
    const currentParam = searchParams.toString()
      ? searchParams.toString().split("=")[1]
      : ""
    return item.sortParam === currentParam
  })

  const [selectedOption, setSelectedOption] = useState(
    currentSortOption ? currentSortOption.name : "Suggested"
  )

  const handleOptionSelect = (value) => {
    setSelectedOption(value)
    setIsDropdownOpen(false)
    const { sortParam = "" } = options.find((item) => item.name === value)
    if (sortParam) {
      searchParams.set("sort", sortParam)
    } else {
      searchParams.delete("sort")
    }
    setSearchParams(searchParams)
  }

  return (
    <div className="flex justify-between pb-1 border-b-2 border-primary mb-5 relative">
      <p className="font-bold">Sort</p>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <p className="text-gray-400 mr-1">
          Sort by:
          <span className="text-black font-bold">
            {selectedOption || "Suggested"}
          </span>
        </p>
        <AiOutlineArrowDown />
        <div>
          {isDropdownOpen && (
            <DropdownMenu setIsDropdownOpen={setIsDropdownOpen}>
              {options.map((item, idx) => (
                <DropdownItem
                  selected={selectedOption === item.name}
                  handleOptionSelect={() => handleOptionSelect(item.name)}
                  key={Math.random()}
                >
                  {item.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  )
}
export default SortBar
