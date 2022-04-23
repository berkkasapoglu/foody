import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import Search from "./components/Search"
import Favorites from "./pages/Favorites"
import MealTracker from "./pages/MealTracker"
import Recipe from "./pages/Recipe"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateRecipe from "./pages/CreateRecipe"

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <div className="bg-body ml-[250px] min-h-screen p-10">
          <div className="max-w-[1100px] mx-auto">
            <Search />
            <div className="mt-12">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/tracker" element={<MealTracker />} />
                <Route path="/recipes/:recipeId" element={<Recipe />} />
                <Route path="/recipes/new" element={<CreateRecipe />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<Register />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
