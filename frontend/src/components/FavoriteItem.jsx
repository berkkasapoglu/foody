import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillFire,
  AiOutlineClose,
} from "react-icons/ai"
import { GiWaterDrop, GiCurledLeaf, GiCrossedChains } from "react-icons/gi"
import { Link } from "react-router-dom"
import { useDrag } from "react-dnd"
import { useAuth } from "../context/authContext"
import { toast } from "react-toastify"
import { useDragLayer } from "react-dnd"
import { useEffect } from "react"

const moveBottom = (currentPosition) => {
  if (currentPosition && currentPosition.y + 50 > window.innerHeight) {
    window.scrollTo(window.scrollX, window.scrollY + 5)
  }
}

const moveTop = (currentPosition) => {
  if (currentPosition && currentPosition.y - 70 < 0) {
    window.scrollTo(window.scrollX, window.scrollY - 5)
  }
}

function FavoriteItem({
  favorite,
  dragged,
  removeFromDropContainer,
  size = "sm",
  increaseCount,
  decreaseCount,
  setFavorites,
  favorites,
  style,
}) {
  const { auth } = useAuth()
  const currentPosition = useDragLayer((monitor) => monitor.getClientOffset())
  // eslint-disable-next-line
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "recipe",
    item: favorite,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  useEffect(() => {
    moveBottom(currentPosition)
    moveTop(currentPosition)
  }, [currentPosition])

  const { title, nutritions } = favorite
  const [calories, fat, carbs, protein] = nutritions.filter((nutrition) =>
    ["Calories", "Fat", "Carbohydrate", "Protein"].includes(nutrition.label)
  )

  const removeFromFavorites = async () => {
    const res = await fetch(`/api/users/favorites/${favorite.slug}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
    const result = await res.json()
    if (result.success) {
      setFavorites(favorites.filter((item) => item._id !== favorite._id))
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div
      ref={drag}
      className={`lg:flex justify-between items-center p-7 rounded-lg shadow-md mb-4 relative ${
        isDragging ? "bg-body" : "bg-white"
      }`}
      style={style}
    >
      <div className="flex mb-4">
        <img
          src={favorite.image && favorite.image.lowQuality}
          className={`rounded-lg ${
            dragged ? "w-[50px] h-[50px]" : "w-[75px] h-[75px]"
          }`}
          alt={favorite.title}
        />
        <div className="ml-3">
          <h4 className={`font-bold text-${size}`}>{title}</h4>
          <div className={`text-${size} text-gray-500`}>
            <span className="pr-3 border-r-2 border-gray-300">
              <AiFillFire className="inline mr-1" />
              {parseInt(calories.total) * favorite.count} kcal
            </span>
            <span className="px-3 border-r-2 border-gray-300">
              <GiWaterDrop className="inline mr-1" />
              {parseInt(fat.total) * favorite.count} g Fat
            </span>
            <span className="px-3 border-r-2 border-gray-300">
              <GiCurledLeaf className="inline mr-1" />
              {parseInt(carbs.total) * favorite.count} g Carbs
            </span>
            <span className="pl-3">
              <GiCrossedChains className="inline mr-1" />
              {parseInt(protein.total) * favorite.count} g Protein
            </span>
          </div>
          {dragged && (
            <div className="text-xs absolute right-2  bg-[#f6f9fc] inline-block p-1 rounded-lg">
              <button
                onClick={() => decreaseCount(favorite._id)}
                className="p-2 rounded-lg transition bg-gray-200 hover:bg-gray-300"
              >
                <AiOutlineMinus className="inline text-gray-600" />
              </button>
              <span className="font-bold mx-3">{favorite.count}</span>
              <button
                onClick={() => increaseCount(favorite._id)}
                className="p-2 rounded-lg transition bg-red-400 hover:bg-red-500"
              >
                <AiOutlinePlus className="inline text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        {dragged ? (
          <>
            <AiOutlineClose
              onClick={() => removeFromDropContainer(favorite._id)}
              className="cursor-pointer absolute top-0 right-0 translate-y-3 -translate-x-3 hover:text-primary"
            />
          </>
        ) : (
          <>
            <AiOutlineClose
              onClick={() => removeFromFavorites()}
              className="cursor-pointer absolute top-0 right-0 translate-y-3 -translate-x-3 hover:text-primary"
            />
            <Link
              to={`/recipes/${favorite.slug}`}
              className="rounded-md border-2 ml-4 py-2 px-4 font-bold border-gray-300 transition hover:border-red-400"
            >
              Info
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
export default FavoriteItem
