import FavoriteItem from "../components/FavoriteItem"
import { useUser } from "../hooks/useUser"
import DropContainer from "../components/DropContainer"
import { useState, useEffect } from "react"
import moment from "moment"
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import Spinner from "../components/layout/Spinner"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useAuth } from "../context/authContext"
import { toast } from "react-toastify"

function Favorites() {
  const { data: user, loading } = useUser()
  const { auth } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [mealPlan, setMealPlan] = useLocalStorage("recipes", {})
  const [totalCalories, setTotalCalories] = useLocalStorage("totalCalories", 0)

  useEffect(() => {
    if (user) {
      const favoritesCopy = user.favorites.map((item) => ({
        ...item,
        count: 1,
      }))
      setFavorites(favoritesCopy)
    }
  }, [user, loading])

  const addToPlan = async () => {
    const organizedPlan = {
      day: moment().format("YYYY MM DD"),
      meals: [],
    }
    for (let key of Object.keys(mealPlan)) {
      const meals = mealPlan[key]
      for (let meal of meals) {
        organizedPlan.meals.push({
          mealTime: key,
          meal: meal._id,
        })
      }
    }

    const res = await fetch("api/users/planner", {
      method: "POST",
      headers: {
        authorization: "Bearer " + auth.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([organizedPlan]),
    })
    const result = await res.json()
    result.success ? toast.success(result.message) : toast.error(result.message)
  }

  return loading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col justify-between gap-12 xl:flex-row">
      <div className="flex-1">
        <div className="flex justify-between pb-1 border-b-2 border-primary mb-5">
          <p className="font-bold">Filter</p>
          <div>
            <p className="text-gray-400">
              Sort by: <span className="text-black font-bold">Calorie</span>
            </p>
          </div>
        </div>
        {favorites.map((favorite) => (
          <FavoriteItem
            favorite={favorite}
            key={favorite._id}
            setFavorites={setFavorites}
            favorites={favorites}
          />
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
          name="breakfast"
          mealPlan={mealPlan}
          setMealPlan={setMealPlan}
          loading={loading}
        />
        <h3 className="font-bold my-2">Lunch</h3>
        <DropContainer
          favorites={favorites}
          setTotalCalories={setTotalCalories}
          totalCalories={totalCalories}
          name="lunch"
          mealPlan={mealPlan}
          setMealPlan={setMealPlan}
          loading={loading}
        />
        <h3 className="font-bold my-2">Dinner</h3>
        <DropContainer
          favorites={favorites}
          setTotalCalories={setTotalCalories}
          totalCalories={totalCalories}
          name="dinner"
          mealPlan={mealPlan}
          setMealPlan={setMealPlan}
          loading={loading}
        />
        <button onClick={addToPlan} className="btn mt-5 block ml-auto">
          Add Recipes to Plan
        </button>
        <h3 className="text-xl font-bold mt-12 mb-4">Calorie Tracker</h3>
        <div className="w-[200px] relative">
          <CircularProgressbarWithChildren
            value={totalCalories}
            maxValue={2500}
            styles={buildStyles({
              textColor: "#ef4444",
              pathColor: `rgba(219,53,41)`,
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
