import { ReactComponent as HeaderRecipe } from "../assets/headerRecipe.svg"

function CardItem() {
  return (
    <div className="bg-white text-center rounded-2xl shadow-md relative">
      <div className="px-10 pt-10">
        <HeaderRecipe
          width={100}
          height={100}
          className="absolute -top-2 left-4 translate-x-1/2 -translate-y-1/2"
        />
        <h3 className="font-bold mb-2">Noodle Chicken Soup</h3>
        <div className="mb-5">
          <span className="text-sm bg-red-500 rounded-lg px-4 text-white font-bold">Intermediate</span>
        </div>
        <div className="flex justify-between items-center mb-8">
          <div className="border-r-gray-200 border-r-2 px-3">
            <h3 className="font-bold text-lg">25</h3>
            <p className="text-sm">Min</p>
          </div>
          <div className="border-r-gray-200 border-r-2 px-3">
            <h3 className="font-bold text-lg">95</h3>
            <p className="text-sm">Kcal</p>
          </div>
          <div>
            <h3>Meat</h3>
          </div>
        </div>
      </div>
      <button className="py-3 text-white font-bold bg-primary w-full rounded-b-lg">Start Cooking</button>
    </div>
  )
}
export default CardItem
