import { ReactComponent as HeaderRecipe } from "../assets/headerRecipe.svg"
import { useEffect, useState } from "react"
import CardItem from "../components/CardItem"
import CategoryFilter from "../components/filters/CategoryFilter"
import Spinner from "../components/layout/Spinner"

function Home() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true)
      const res = await fetch(
        `/api/recipes/${selectedCategory && "/category/" + selectedCategory}`
      )
      const recipeData = await res.json()
      if (recipeData.success) setRecipes(recipeData.data)
      setLoading(false)
    }
    fetchRecipes()
  }, [selectedCategory])
  return (
    <>
      <header>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <HeaderRecipe width={250} height={150} />
            <div className="ml-3">
              <h2 className="font-bold text-5xl">Only the best recipes</h2>
              <p className="text-slate-400">Today's new recipes for you</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-2xl">{recipes.length}</h3>
            <p className="text-slate-500">Recipes</p>
          </div>
        </div>
        <CategoryFilter setSelectedCategory={setSelectedCategory} />
      </header>
      {loading ? (
        <Spinner />
      ) : (
        <main className="mt-12">
          <div className="flex flex-wrap gap-10 justify-between gap-y-16">
            {recipes.map((recipe) => (
              <CardItem key={recipe._id} recipe={recipe} />
            ))}
          </div>
        </main>
      )}
    </>
  )
}
export default Home
