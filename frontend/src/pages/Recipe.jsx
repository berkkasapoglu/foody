import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import headerRecipe from "../assets/headerRecipe.svg"
import { useAuth } from "../context/authContext"
import { useFetch } from "../hooks/useFetch"
import { useUser } from "../hooks/useUser"

function Recipe() {
  const [isFavorite, setIsFavorite] = useState(false)
  const { auth } = useAuth()
  const { recipeId } = useParams()
  const { data: user } = useUser("/api/users/me")
  const { data: recipe, loading} = useFetch(`/api/recipes/${recipeId}`)
  useEffect(() => {
    setIsFavorite(user.favorites?.some(favorite => favorite._id === recipeId))
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
    }
  }

  return (loading) ? (
    <h3>Loading...</h3>
  ) : (
    <>
      <main>
        <div className="lg:flex lg:items-center">
          <img src={headerRecipe} alt="recipe" className="h-[250px]" />
          <div className="pb-3 border-b-2 border-b-primary">
            <p className="text-primary text-sm font-bold">
              Chef: {recipe.source}
            </p>
            <h3 className="text-4xl pb-3">{recipe.title}</h3>
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
            <p className="bg-body px-3 font-bold">
              {parseInt(recipe.calories)} kcal
            </p>
          </div>
          {recipe.nutritions.map((item, idx) => (
            <div
              key={idx}
              className=" textpF-center mr-5 p-1 bg-stone-300 inline-block mt-2 rounded-lg"
            >
              <p className="px-3">{item.label}</p>
              <p className="bg-body px-3 font-bold">{parseInt(item.total)} g</p>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-bold mt-5">Ingredients</h3>
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
      </main>
    </>
  )
}
export default Recipe
