import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../context/authContext"
import { useFetch } from "../hooks/useFetch"
import { useUser } from "../hooks/useUser"
import { toast } from "react-toastify"
import { BiTimer } from "react-icons/bi"
import { GiKnifeFork } from "react-icons/gi"
import Spinner from "../components/layout/Spinner"
import MetaDecorator from "../components/MetaDecorator"
import metadata from "../metadata.json"

function Recipe() {
  const [isFavorite, setIsFavorite] = useState(false)
  const { auth } = useAuth()
  const { slug } = useParams()
  const { data: user } = useUser()
  const { data: recipe, loading } = useFetch(`/api/recipes/${slug}`)
  const [isRecipeRemoving, setIsRecipeRemoving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setIsFavorite(
        user.favorites.some((favorite) => favorite.slug === slug)
      )
    }
  }, [user, slug])

  const addToFavorites = async () => {
    const res = await fetch(`/api/users/favorites/${slug}`, {
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
    const res = await fetch(`/api/users/favorites/${slug}`, {
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
    setIsRecipeRemoving(true)
    const res = await fetch(`/api/recipes/${slug}`, {
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
    setIsRecipeRemoving(false)
  }

  return loading ? (
    <Spinner />
  ) : (
    recipe && (
      <>
        <MetaDecorator
          title={`${recipe.title} | Foodie`}
          metaTitle={recipe.title}
          description={recipe.description}
          image={recipe.image.lowQuality}
          url={metadata.sitename + `/recipes/${recipe.slug}`}
        />
        <main className="text-lg">
          <div className="lg:flex lg:items-center">
            <img
              src={recipe.image && recipe.image.lowQuality}
              alt={recipe.title}
              className="w-[350px] mr-10 mb-6 lg:mb-0 rounded-xl"
            />
            <div className="pb-3 border-b-2 border-b-primary">
              <h1 className="text-4xl pb-3">{recipe.title}</h1>
            </div>
          </div>
          <p className="mt-6 font-bold">{recipe.description}</p>
          <div className="mt-5 mb-8">
            <h3 className="font-bold text-lg">Nutritions per serving</h3>
            {recipe.nutritions.map((item, idx) => (
              <div
                key={idx}
                className=" textpF-center mr-5 p-1 bg-primary-300/50 inline-block mt-2 rounded-lg"
              >
                <p className="px-3">{item.label}</p>
                <p className="bg-body px-3 font-bold rounded-md">
                  {item.total} {item.unit}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap mt-5 mb-2 gap-7">
            <div>
              <h2 className="text-lg font-bold">Ingredients</h2>
              <ul>
                {recipe.ingredients.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 border border-black/50 self-start order-first  lg:order-last">
              <div className="font-bold flex items-center">
                <GiKnifeFork className="text-[25px]" />
                <p className="ml-1">
                  Yield: <span className="font-normal">{recipe.yields}</span>
                </p>
              </div>
              <div className="font-bold flex items-center">
                <BiTimer className="text-[25px]" />
                <p className="ml-1">
                  Time: <span className="font-normal">{recipe.time} min</span>
                </p>
              </div>
            </div>
          </div>
          <ul className="mb-5">
            <h2 className="text-lg font-bold mt-5">Directions</h2>
            {recipe.instructions.split("\n").map((instruction, idx) => (
              <li key={idx} className="mt-4">
                <div className="flex items-center gap-6">
                  <h3 className="font-mono inline-block font-bold font-direction text-3xl bg-primary-300/60 rounded-[100%] p-3">
                    {idx + 1}
                  </h3>
                  <p className="">{instruction}</p>
                </div>
              </li>
            ))}
          </ul>
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
          {isRecipeRemoving ? (
            <Spinner place="absolute inline-block ml-14" />
          ) : (
            recipe.owner &&
            user &&
            recipe.owner._id === user._id && (
              <button
                onClick={deleteMyRecipe}
                className="ml-4 mt-5 bg-yellow-500 py-2 px-5 rounded-lg font-bold transition-all hover:bg-yellow-600"
              >
                Delete Recipe
              </button>
            )
          )}
        </main>
      </>
    )
  )
}
export default Recipe
