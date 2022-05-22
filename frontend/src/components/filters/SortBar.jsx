import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { AiOutlineArrowDown } from "react-icons/ai"
import DropdownMenu from "../layout/DropdownMenu"
import DropdownItem from "../layout/DropdownItem"
const options = ["Suggested", "Calories: Low to High", "Calories: High to Low"]

function SortBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("Suggested")
  const [searchParams, setSearchParams] = useSearchParams()

  const handleOptionSelect = (value) => {
    setSelectedOption(value)
    setIsDropdownOpen(false)
    if (value === options[1]) {
      searchParams.set("sort", "calories_by_asc")
      setSearchParams(searchParams)
    } else if (value === options[2]) {
      searchParams.set("sort", "calories_by_desc")
      setSearchParams(searchParams)
    } else {
      searchParams.delete("sort")
      setSearchParams(searchParams)
    }
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
            <DropdownMenu>
              <DropdownItem
                selected={selectedOption === options[0]}
                handleOptionSelect={() => handleOptionSelect(options[0])}
              >
                {options[0]}
              </DropdownItem>
              <DropdownItem
                selected={selectedOption === options[1]}
                handleOptionSelect={() => handleOptionSelect(options[1])}
              >
                {options[1]}
              </DropdownItem>
              <DropdownItem
                selected={selectedOption === options[2]}
                handleOptionSelect={() => handleOptionSelect(options[2])}
              >
                {options[2]}
              </DropdownItem>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  )
}
export default SortBar
