import FavoriteItem from "../components/FavoriteItem"
import { useUser } from "../hooks/useUser"
import DropContainer from "../components/DropContainer"
import { useState, useEffect } from "react"
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

function Favorites() {
  const { data: user, loading } = useUser()
  const [favorites, setFavorites] = useState([])
  const [totalCalories, setTotalCalories] = useState(0)

  useEffect(() => {
    if (!loading) {
      const favoritesCopy = user.favorites.map((item) => ({
        ...item,
        count: 1,
      }))
      setFavorites(favoritesCopy)
    }
  }, [user, loading])

  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div className="flex flex-col justify-between xl:flex-row">
      <div>
        <div className="flex justify-between pb-1 border-b-2 border-primary mb-5">
          <p className="font-bold">Filter</p>
          <div>
            <p className="text-gray-400">
              Sort by: <span className="text-black font-bold">Calorie</span>
            </p>
          </div>
        </div>
        {favorites.map((favorite) => (
          <FavoriteItem favorite={favorite} key={favorite._id} />
        ))}
      </div>
      <div className="basis-[28%]">
        <h3 className="text-xl font-bold">Make your day</h3>
        <p className="text-gray-400">21 June, 2020</p>

        <h3 className="font-bold my-2">Breakfast</h3>
        <DropContainer
          favorites={favorites}
          setTotalCalories={setTotalCalories}
          totalCalories={totalCalories}
        />
        <h3 className="font-bold my-2">Lunch</h3>
        <DropContainer
          favorites={favorites}
          setTotalCalories={setTotalCalories}
          totalCalories={totalCalories}
        />
        <h3 className="font-bold my-2">Dinner</h3>
        <DropContainer
          favorites={favorites}
          setTotalCalories={setTotalCalories}
          totalCalories={totalCalories}
        />
        <h3 className="text-xl font-bold mt-12 mb-4">Calorie Tracker</h3>
        <div className="w-[200px] relative">
          <CircularProgressbarWithChildren
            value={totalCalories}
            maxValue={2500}
            styles={buildStyles({
              textColor: "#ef4444",
              pathColor: "#ef4444",
            })}
          >
            <div className="font-bold text-primary text-center">
              <p className="text-3xl">Kcal</p>
              <h3 className="text-2xl text-black">{totalCalories}</h3>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>
    </div>
  )
}
export default Favorites
