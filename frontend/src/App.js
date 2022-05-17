import Sidebar from "./components/layout/Sidebar"
import Home from "./pages/Home"
import Search from "./components/layout/Header"
import Favorites from "./pages/Favorites"
import MealPlanner from "./pages/MealPlanner"
import Recipe from "./pages/Recipe"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateRecipe from "./pages/CreateRecipe"
import { AuthProvider } from "./context/authContext"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Sidebar />
          <div className="bg-body ml-[250px] min-h-screen p-10">
            <div className="max-w-[1100px] mx-auto">
              <Search />
              <div className="mt-12">
                <DndProvider backend={HTML5Backend}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="category/:categoryName" element={<Home />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/tracker" element={<MealPlanner />} />
                    <Route path="/recipes/:recipeId" element={<Recipe />} />
                    <Route path="/recipes/new" element={<CreateRecipe />} />
                    <Route path="/sign-in" element={<Login />} />
                    <Route path="/sign-up" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </DndProvider>
              </div>
            </div>
          </div>
        </BrowserRouter>
        <ToastContainer />
      </AuthProvider>
    </>
  )
}

export default App
