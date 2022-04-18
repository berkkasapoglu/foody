import { ReactComponent as HeaderRecipe } from "../assets/headerRecipe.svg"
import CardList from "../components/CardList"
function Home() {
  return (
    <>
      <header className="mt-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <HeaderRecipe width={250} height={150} />
            <div className="ml-3">
              <h2 className="font-bold text-5xl">Only the best recipes</h2>
              <p className="text-slate-400">Today's new recipes for you</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-2xl">304</h3>
            <p className="text-slate-500">Recipes</p>
          </div>
        </div>
      </header>
      <main className="mt-12">
        <CardList />
      </main>
    </>
  )
}
export default Home
