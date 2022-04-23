import FavoriteItem from "../components/FavoriteItem"

function Favorites() {
  return (
    <div className="flex justify-between gap-6">
      <div>
        <div className="flex justify-between pb-1 border-b-2 border-primary">
          <p className="font-bold">Filter</p>
          <div>
            <p className="text-gray-400">
              Sort by: <span className="text-black font-bold">Calorie</span>
            </p>
          </div>
        </div>
        <FavoriteItem />
      </div>

      <div>
        <h3 className="text-xl font-bold">Make your day</h3>
        <p className="text-gray-400">21 June, 2020</p>
        <h3 className="font-bold my-2">Breakfast</h3>
        <div className="bg-red-300 border-2 border-red-700 border-dashed text-red-700 font-bold px-8 py-3">
          Drop Here to Add
        </div>
        <h3 className="font-bold my-2">Lunch</h3>
        <div className="bg-red-300 border-2 border-red-700 border-dashed text-red-700 font-bold px-8 py-3">
          Drop Here to Add
        </div>
        <h3 className="font-bold my-2">Dinner</h3>
        <div className="bg-red-300 border-2 border-red-700 border-dashed text-red-700 font-bold px-8 py-3">
          Drop Here to Add
        </div>
        <h3 className="text-xl font-bold my-12">Calorie Tracker</h3>
      </div>
    </div>
  )
}
export default Favorites
