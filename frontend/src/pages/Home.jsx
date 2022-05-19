import { ReactComponent as HeaderRecipe } from "../assets/headerRecipe.svg"
import { useEffect, useState } from "react"
import CardItem from "../components/CardItem"
import CategoryFilter from "../components/filters/CategoryFilter"
import Spinner from "../components/layout/Spinner"
import { useSearchParams } from "react-router-dom"

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("")
  // const [page, setPage] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams({})
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [nextPage, setNextPage] = useState(false)
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
        return [...currentRecipes, ...result.data]})
      setLoading(false)
      setNextPage(result.next)
    }
    fetchRecipes()
  }, [searchParams, selectedCategory])

  useEffect(() => {
    setSearchParams({})
    setRecipes([])    
  }, [selectedCategory])

  const loadMore = () => {
    console.log(nextPage)
    const currentPage = parseInt(searchParams.get("page")) || 0
    nextPage && setSearchParams({
      ...searchParams,
      page: currentPage + 1
    })
  }
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

      <main className="mt-24">
        <div className="flex flex-wrap gap-10 justify-between gap-y-16">
          {recipes.map((recipe) => (
            <CardItem key={recipe._id} recipe={recipe} />
          ))}
        </div>
        <div className="w-[90%] mx-auto text-center my-12">
          {loading ? (
            <Spinner />
          ) : (
            <button className="btn px-12 mx-auto" onClick={loadMore}>
              Load More...
            </button>
          )}
        </div>
      </main>
    </>
  )
}
export default Home
