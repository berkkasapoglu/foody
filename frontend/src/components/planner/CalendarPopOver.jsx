import { useEffect, useRef, useState } from "react"
import headerRecipe from "../../assets/headerRecipe.svg"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/authContext"
import { toast } from "react-toastify"

function CalendarPopOver({ event, setUser, user }) {
  const [isOpened, setIsOpened] = useState(false)
  const { auth } = useAuth()
  const { meal } = event

  useEffect(() => {
    const closePopOverHandler = (e) => {
      if (popUpRef.current && !popUpRef.current.contains(e.target)) {
        setIsOpened(false)
      }
    }

    document.addEventListener("mousedown", closePopOverHandler)
    return () => {
      document.removeEventListener("mousedown", closePopOverHandler)
    }
  })

  const removeFromPlanner = async (meal) => {
    const res = await fetch("/api/users/planner", {
      method: "DELETE",
      headers: {
        authorization: "Bearer " + auth.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mealId: meal._id,
        mealTime: event.mealTime,
        date: event.start,
        _id: event._id
      }),
    })
    const result = await res.json()
    if (result.success) {
      setUser({ ...user, planner: result.data.planner })
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  const popUpRef = useRef()
  const [calories, fat, carbs, protein] =
  meal.nutritions.filter((nutrition) =>
    ["Calories", "Fat", "Carbohydrate", "Protein"].includes(nutrition.label)
  )

  return (
    <>
      <div onClick={() => setIsOpened(!isOpened)}>
        {event.title}
        {isOpened && (
          <div
            className="absolute bg-white rounded-md translate-y-[8%] text-black p-3 z-50"
            ref={popUpRef}
          >
            <Link to={`/recipes/${meal.slug}`}>
              <div>
                <h3 className="font-bold">{meal.title}</h3>
                <div>
                  <img
                    src={meal.image ? meal.image.lowQuality : headerRecipe}
                    alt="meal"
                    width={50}
                    height={50}
                    className="mb-3 rounded-md"
                  />
                  <p className="font-bold">Calories: {calories.total}</p>
                  <p className="font-bold">Protein: {protein.total}</p>
                  <p className="font-bold">
                    Carbs: {carbs.total}
                  </p>
                  <p className="font-bold">Fat: {fat.total}</p>
                </div>
              </div>
            </Link>
            <button
              className="block btn py-1 px-3 ml-auto"
              onClick={() => removeFromPlanner(meal)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  )
}
export default CalendarPopOver
