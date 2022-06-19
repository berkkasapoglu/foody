import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../context/authContext"
import { useFetch } from "../hooks/useFetch"
import { useUser } from "../hooks/useUser"
import { toast } from "react-toastify"
import Spinner from "../components/layout/Spinner"

function Recipe() {
  const [isFavorite, setIsFavorite] = useState(false)
  const { auth } = useAuth()
  const { recipeId } = useParams()
  const { data: user } = useUser()
  const { data: recipe, loading } = useFetch(`/api/recipes/${recipeId}`)

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setIsFavorite(
        user.favorites.some((favorite) => favorite._id === recipeId)
      )
    }
  }, [user, recipeId])

  const addToFavorites = async () => {
    const res = await fetch(`/api/users/favorites/${recipeId}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
    const result = await res.json()
    if (result.success) {
      setIsFavorite(true)
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  const removeFromFavorites = async () => {
    const res = await fetch(`/api/users/favorites/${recipeId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
    const result = await res.json()
    if (result.success) {
      setIsFavorite(false)
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  const deleteMyRecipe = async () => {
    const res = await fetch(`/api/recipes/${recipeId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
    const result = await res.json()
    if (result.success) {
      toast.success(result.message)
      navigate("/")
    } else {
      toast.error(result.message)
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    recipe && (
      <>
        <main>
          <div className="lg:flex lg:items-center">
            <img
              src={recipe.image}
              alt="recipe"
              className="w-[350px] mr-10 rounded-xl"
            />
            <div className="pb-3 border-b-2 border-b-primary">
              <p className="text-primary text-sm font-bold">
                Chef: {recipe.source}
              </p>
              <h1 className="text-4xl pb-3">{recipe.title}</h1>
            </div>
          </div>
          <div>
            {recipe.labels.dietLabels.map((item, idx) => (
              <span
                key={idx}
                className="inline-block mr-3 mt-3 bg-green-200 rounded-md px-3 text-green-800 font-bold text-sm"
              >
                {item}
              </span>
            ))}
          </div>
          <div>
            {recipe.labels.healthLabels.map((item, idx) => (
              <span
                key={idx}
                className="inline-block mr-3 mt-3 bg-blue-200 rounded-md px-3 text-blue-800 font-bold text-sm"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-5">
            <h3 className="font-bold">Nutrition per serving</h3>
            <div className=" text-center mr-5 p-1 bg-stone-300 inline-block mt-2 rounded-lg">
              <p className="px-3">Calories</p>
              <p className="bg-body px-3 font-bold">{recipe.calories} kcal</p>
            </div>
            {recipe.nutritions.map((item, idx) => (
              <div
                key={idx}
                className=" textpF-center mr-5 p-1 bg-stone-300 inline-block mt-2 rounded-lg"
              >
                <p className="px-3">{item.label}</p>
                <p className="bg-body px-3 font-bold">{item.total} g</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-lg font-bold mt-5">Ingredients</h2>
            <ul>
              {recipe.ingredients.map((item, idx) => (
                <li key={idx}>
                  <input
                    type="checkbox"
                    id={`ingredient-${idx}`}
                    className="accent-green-500 mr-2"
                  />
                  <label htmlFor={`ingredient-${idx}`}>{item}</label>
                </li>
              ))}
            </ul>
          </div>
          {isFavorite ? (
            <button
              onClick={removeFromFavorites}
              className="mt-5 bg-green-500 py-2 px-5 rounded-lg font-bold text-body transition-all hover:bg-green-600"
            >
              Added
            </button>
          ) : (
            <button
              onClick={addToFavorites}
              className="mt-5 bg-primary py-2 px-5 rounded-lg font-bold text-body transition-all hover:bg-red-700"
            >
              Add Favorites
            </button>
          )}
          {user && recipe.owner === user._id && (
            <button
              onClick={deleteMyRecipe}
              className="ml-4 mt-5 bg-yellow-500 py-2 px-5 rounded-lg font-bold transition-all hover:bg-yellow-600"
            >
              Delete Recipe
            </button>
          )}
        </main>
      </>
    )
  )
}
export default Recipe
