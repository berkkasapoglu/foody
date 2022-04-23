import headerRecipe from "../assets/headerRecipe.svg"
import { AiOutlineMinus, AiOutlinePlus, AiFillFire } from "react-icons/ai"
import { GiWaterDrop, GiCurledLeaf, GiCrossedChains } from "react-icons/gi"

function FavoriteItem() {
  return (
    <div className="lg:flex justify-between items-center bg-white p-7 rounded-lg shadow-md mt-6">
      <div className="flex mb-4">
        <img src={headerRecipe} width={75} alt="recipe" />
        <div className="ml-3">
          <h4 className="font-bold">Dessert-Wine-Poached Pears</h4>
          <div className="text-sm text-gray-500">
            <span className="pr-3 border-r-2 border-gray-300">
              <AiFillFire className="inline mr-1" />
              399 kcal
            </span>
            <span className="px-3 border-r-2 border-gray-300">
              <GiWaterDrop className="inline mr-1" />0 g Fat
            </span>
            <span className="px-3 border-r-2 border-gray-300">
              <GiCurledLeaf className="inline mr-1" />
              503 g Carbs
            </span>
            <span className="pl-3">
              <GiCrossedChains className="inline mr-1" />3 g Protein
            </span>
          </div>
        </div>
      </div>
      <div>
        <button className="rounded-md border-2 py-2 px-4 font-bold border-gray-300 transition hover:border-red-400">
          Info
        </button>
        <div className="ml-4 bg-[#f6f9fc] inline-block p-1 rounded-lg">
          <button className="p-2 rounded-lg transition bg-gray-200 hover:bg-gray-300">
            <AiOutlineMinus className="inline text-gray-600 text-lg" />
          </button>
          <span className="font-bold mx-3">0</span>
          <button className="p-2 rounded-lg transition bg-red-400 hover:bg-red-500">
            <AiOutlinePlus
              stroke-width={3}
              className="inline text-white text-xl"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
export default FavoriteItem
