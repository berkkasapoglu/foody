import { useEffect, useRef, useState } from "react"
import headerRecipe from "../../assets/headerRecipe.svg"
import { Link } from "react-router-dom"

function CalendarPopOver({ event }) {
  const [isOpened, setIsOpened] = useState(false)
  const { meal } = event
  useEffect(() => {
    const closePopOverHandler = (event) => {
      if(popUpRef.current && !popUpRef.current.contains(event.target)) {
        setIsOpened(false)
      }
    }
    document.addEventListener("mousedown", closePopOverHandler)
    return () => {
      document.removeEventListener("mousedown", closePopOverHandler)
    }
  })

  const popUpRef = useRef()

  return (
    <div>
      <div onClick={() => setIsOpened(!isOpened)}>
        {event.title}
        {isOpened && (
          <Link to={`/recipes/${meal._id}`} ref={popUpRef}>
            <div className="absolute bg-white rounded-md translate-y-[8%] text-black p-3 z-50">
              <h3 className="font-bold">{meal.title}</h3>
              <div>
                <img
                  src={headerRecipe}
                  alt=""
                  width={50}
                  height={50}
                  className="mb-3"
                />
                <p className="font-bold">Calories: {meal.calories}</p>
                <p className="font-bold">
                  Carbs: {meal.nutritions[0].total}
                </p>
                <p className="font-bold">
                  Protein: {meal.nutritions[1].total}
                </p>
                <p className="font-bold">
                  Fat: {meal.nutritions[2].total}
                </p>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
export default CalendarPopOver
