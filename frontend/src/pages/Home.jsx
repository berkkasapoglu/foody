import { ReactComponent as HeaderRecipe } from "../assets/headerRecipe.svg"
import { useEffect, useRef, useState } from "react"
import CardItem from "../components/CardItem"
import CategoryFilter from "../components/filters/CategoryFilter"
import Spinner from "../components/layout/Spinner"
import { useParams, useSearchParams } from "react-router-dom"
import MetaDecorator from "../components/MetaDecorator"
import metadata from "../metadata.json"

function Home() {
  const { categoryName } = useParams()
  const [selectedCategory, setSelectedCategory] = useState(categoryName || "")
  const [searchParams, setSearchParams] = useSearchParams({})
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [nextPage, setNextPage] = useState(false)
  
  let resetPage = useRef(true)
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true)
      const res = await fetch(
        `/api/recipes/${
          selectedCategory && "category/" + selectedCategory
        }?${searchParams.toString()}`
      )
      const result = await res.json()
      setRecipes((currentRecipes) => {
        const isPageReseting = resetPage.current
        resetPage.current = true
        return isPageReseting
          ? [...result.data]
          : [...currentRecipes, ...result.data]
      })

      setLoading(false)
      setNextPage(result.next)
    }
    fetchRecipes()
  }, [searchParams, selectedCategory])

  const loadMore = () => {
    const currentPage = parseInt(searchParams.get("page")) || 0
    nextPage && searchParams.set("page", currentPage + 1)
    setSearchParams(searchParams)
    resetPage.current = false
  }
  return (
    <>
      <MetaDecorator
        title={
          selectedCategory
            ? `Foodie | ${
                selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)
              } Recipes`
            : `Foodie | Recipes - Meal Planner`
        }
        description={
          selectedCategory
            ? `Here are the best ${selectedCategory} recipes. Get these and more great ${selectedCategory} recipes at Foodie`
            : "Discover and organize recipes, add your favorite recipes to our free meal planner and get your weekly nutrition report."
        }
        url={selectedCategory ? metadata.sitename + `/category/${selectedCategory}` : metadata.sitename}
      />
      <header>
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-1 flex-col md:flex-row">
            <HeaderRecipe className="w-[250px] h-[150px]" />
            <div className="ml-3">
              <h1 className="font-bold text-3xl md:text-5xl">
                Only the best recipes
              </h1>
              <p className="text-slate-400">Today's new recipes for you</p>
            </div>
          </div>
        </div>
        <CategoryFilter
          setSelectedCategory={setSelectedCategory}
          setRecipes={setRecipes}
          selectedCategory={selectedCategory}
        />
      </header>
      <main className="mt-20">
        {!loading && searchParams.get("search") && (
          <h3 className="mb-12 font-bold text-2xl text-right">
            Results for "{searchParams.get("search")}"
          </h3>
        )}
        <div className="flex flex-wrap gap-10 justify-center md:justify-between gap-y-16">
          {recipes.map((recipe) => (
            <CardItem key={recipe.slug} recipe={recipe} />
          ))}
        </div>
        <div className="w-[90%] mx-auto text-center my-12">
          {loading ? (
            <Spinner />
          ) : (
            nextPage && (
              <button className="btn px-12 mx-auto" onClick={loadMore}>
                Load More...
              </button>
            )
          )}
        </div>
      </main>
    </>
  )
}
export default Home
